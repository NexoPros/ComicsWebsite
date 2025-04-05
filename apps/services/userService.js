const { MongoClient } = require("mongodb");
const DatabaseConnection = require("../database/database");

const updateUser = async (userId, updateData, isAdminUpdate = false) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  // If it's an admin update, validate role change
  if (isAdminUpdate) {
    const { role } = updateData;
    const validRoles = ["user", "uploader", "admin"];
    if (role && !validRoles.includes(role)) {
      throw new Error("Invalid role");
    }
  }

  // Update the user data in the database
  const result = await db
    .collection("users")
    .updateOne(
      { _id: new require("mongodb").ObjectId(userId) },
      { $set: updateData }
    );

  return result;
};

module.exports = { updateUser };
