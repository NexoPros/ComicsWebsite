const DatabaseConnection = require("../../database/database");
const { getComicObject } = require("../../models/comic");

// GET all comics
exports.getAllComics = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const comics = await db.collection("comics").find().toArray();
  res.render("admin/comics/index", { comics });
};

// GET comic by ID
exports.getComic = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const comic = await db
    .collection("comics")
    .findOne({ _id: new require("mongodb").ObjectId(req.params.id) });
  res.render("admin/comics/edit", { comic });
};

// CREATE comic
exports.createComic = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const comic = getComicObject(req.body);
  await db.collection("comics").insertOne(comic);
  res.redirect("/admin/comics");
};

// UPDATE comic
exports.updateComic = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  await db
    .collection("comics")
    .updateOne(
      { _id: new require("mongodb").ObjectId(req.params.id) },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
  res.redirect("/admin/comics");
};

// DELETE comic
exports.deleteComic = async (req, res) => {
  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  await db
    .collection("comics")
    .deleteOne({ _id: new require("mongodb").ObjectId(req.params.id) });
  res.redirect("/admin/comics");
};
