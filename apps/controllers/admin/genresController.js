const DatabaseConnection = require("../../database/database");
const { getGenreObject } = require("../../models/genre");

exports.getAllGenres = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const genres = await db.collection("genres").find().toArray();
  res.render("admin/genres/index", { genres });
};

exports.createGenre = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const genre = getGenreObject(req.body.name);
  await db.collection("genres").insertOne(genre);
  res.redirect("/admin/genres");
};

exports.updateGenre = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  await db
    .collection("genres")
    .updateOne(
      { _id: new require("mongodb").ObjectId(req.params.id) },
      { $set: { name: req.body.name } }
    );
  res.redirect("/admin/genres");
};

exports.deleteGenre = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  await db
    .collection("genres")
    .deleteOne({ _id: new require("mongodb").ObjectId(req.params.id) });
  res.redirect("/admin/genres");
};
