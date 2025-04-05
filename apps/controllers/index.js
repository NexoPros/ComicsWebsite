const express = require("express");
const router = express.Router();

// Import all controllers
const usersController = require("./admin/usersController");
const comicsController = require("./admin/comicsController");
const rolesController = require("./admin/rolesController");
const genresController = require("./admin/genresController");

// Routes for Users
// View all users
router.get("/admin/users", usersController.getAllUsers);

// View single user (edit)
router.get("/admin/users/edit/:id", usersController.getUser);

// Create new user
router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});
router.post("/admin/users", usersController.createUser);

// Update user
router.post("/admin/users/edit/:id", usersController.updateUser);

// Delete user
router.post("/admin/users/delete/:id", usersController.deleteUser);

// Routes for Comics
// View all comics
router.get("/admin/comics", comicsController.getAllComics);

// Create new comic
router.get("/admin/comics/create", (req, res) => {
  res.render("admin/comics/create");
});
router.post("/admin/comics", comicsController.createComic);

// Edit single comic
router.get("/admin/comics/edit/:id", comicsController.getComic);
router.post("/admin/comics/edit/:id", comicsController.updateComic);

// Delete comic
router.post("/admin/comics/delete/:id", comicsController.deleteComic);

// Routes for Roles
// View all roles
router.get("/admin/roles", rolesController.getAllRoles);

// Create new role
router.get("/admin/roles/create", (req, res) => {
  res.render("admin/roles/create");
});
router.post("/admin/roles", rolesController.createRole);

// Update role
router.post("/admin/roles/edit/:id", rolesController.updateRole);

// Delete role
router.post("/admin/roles/delete/:id", rolesController.deleteRole);

// Routes for Genres
// View all genres
router.get("/admin/genres", genresController.getAllGenres);

// Create new genre
router.get("/admin/genres/create", (req, res) => {
  res.render("admin/genres/create");
});
router.post("/admin/genres", genresController.createGenre);

// Update genre
router.post("/admin/genres/edit/:id", genresController.updateGenre);

// Delete genre
router.post("/admin/genres/delete/:id", genresController.deleteGenre);

// Exports the router
module.exports = router;
