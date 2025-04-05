const DatabaseConnection = require("../../database/database");
const { getUserObject } = require("../../models/user");

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

  const user = getUserObject(req.body);
  await db.collection("users").insertOne(user);
  res.redirect("/admin/users");
};

// UPDATE user
exports.updateUser = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  await db
    .collection("users")
    .updateOne(
      { _id: new require("mongodb").ObjectId(req.params.id) },
      { $set: req.body }
    );
  res.redirect("/admin/users");
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
