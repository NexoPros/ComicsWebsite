const DatabaseConnection = require("../../database/database");
const { getUserObject } = require("../../models/user");
const { updateUser } = require("../../services/userService");

// GET all users
exports.getAllUsers = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const users = await db.collection("users").find().toArray();
  res.render("admin/users/index", { users });
};

// GET single user by ID
exports.getUser = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const user = await db
    .collection("users")
    .findOne({ _id: new require("mongodb").ObjectId(req.params.id) });
  res.render("admin/users/edit", { user });
};

// CREATE new user
exports.createUser = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  // Add the role as part of the user object (admin can set roles)
  const { username, email, password, role } = req.body;

  // Ensure that the role is valid (you can also make this a constant or enum for better validation)
  const validRoles = ["user", "uploader", "admin"];
  if (!validRoles.includes(role)) {
    return res.status(400).send("Invalid role");
  }

  const user = {
    username,
    email,
    password, // Make sure to hash the password before saving it
    role: role || "user", // Default to 'user' if no role is specified
  };

  await db.collection("users").insertOne(user);
  res.redirect("/admin/users"); // Redirect to the admin user management page
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const { role, ...updateData } = req.body;
    const userId = req.params.id;

    // Call the shared updateUser function, passing false for normal user update
    await updateUser(userId, updateData, false); // 'false' indicates it's not an admin update

    res.redirect("/admin/users");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  await db
    .collection("users")
    .deleteOne({ _id: new require("mongodb").ObjectId(req.params.id) });
  res.redirect("/admin/users");
};
