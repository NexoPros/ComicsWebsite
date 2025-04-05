const { set, get } = require("../cache/cache");

async function getLatestComics(req, res) {
  const cached = get("latestComics");
  if (cached) {
    return res.render("home", { comics: cached });
  }

  const client = DatabaseConnection.getMongoClient();
  await client.connect();
  const db = client.db("ReadiWeb");

  const comics = await db
    .collection("comics")
    .find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray();

  set("latestComics", comics);
  res.render("home", { comics });
}
