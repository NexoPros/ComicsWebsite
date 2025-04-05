const express = require("express");
var bodyParser = require("body-parser");
const session = require("express-session");
const DatabaseConnection = require("./apps/database/database");

const app = express();

// Middleware for parsing request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Fixed this line (added parentheses)

// Set view engine to EJS
app.set("view engine", "ejs");

// Set views directory correctly (fixing path)
app.set("views", __dirname + "/apps/views");

// Static file handling (CSS, JS, images)
app.use("/static", express.static(__dirname + "/apps/public"));
app.use("/partial", express.static(__dirname + "/apps/views/partial"));

// Session handling for user authentication
app.use(
  session({
    secret: "readiweb_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Import routes (controllers) and use them
const routes = require("./apps/controllers/index");
app.use("/", routes);

// Connect to DB before starting routes
DatabaseConnection.getMongoClient()
  .connect()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running...");
      console.log("Connected to MongoDB successfully.");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
