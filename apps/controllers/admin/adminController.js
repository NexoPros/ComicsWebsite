const { MongoClient } = require("mongodb");
const { updateUser } = require("../../services/userService");
const User = require("../../models/user");

// Admin Dashboard - View All Users
const getAdminDashboard = async (req, res) => {
  const db = await MongoClient.connect("mongodb://localhost:27017");
  const users = await db.collection("users").find({}).toArray();
  res.render("admin/dashboard", { users });
};

// Update User Role (Admin only)
exports.updateUser = async (req, res) => {
  try {
    const { role, ...updateData } = req.body;
    const userId = req.params.id;

    // Call the shared updateUser function, passing true for admin update
    await updateUser(userId, updateData, true); // 'true' indicates it's an admin updating

    res.redirect("/admin/users");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};
