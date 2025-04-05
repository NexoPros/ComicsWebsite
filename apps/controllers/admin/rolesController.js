const DatabaseConnection = require("../../database/database");
const { getRoleObject } = require("../../models/role");

exports.getAllRoles = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const roles = await db.collection("roles").find().toArray();
  res.render("admin/roles/index", { roles });
};

exports.createRole = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const role = getRoleObject(req.body.name);
  await db.collection("roles").insertOne(role);
  res.redirect("/admin/roles");
};

exports.updateRole = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  await db
    .collection("roles")
    .updateOne(
      { _id: new require("mongodb").ObjectId(req.params.id) },
      { $set: { name: req.body.name } }
    );
  res.redirect("/admin/roles");
};

exports.deleteRole = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  await db
    .collection("roles")
    .deleteOne({ _id: new require("mongodb").ObjectId(req.params.id) });
  res.redirect("/admin/roles");
};
