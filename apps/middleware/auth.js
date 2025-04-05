const { MongoClient } = require("mongodb");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login"); // Redirect to login if not logged in
  }

  const db = await MongoClient.connect("mongodb://localhost:27017");
  const user = await User.findUserById(db, req.session.userId);
  if (!user) {
    return res.redirect("/login"); // If user not found in DB, log out
  }

  req.user = user; // Attach the user to the request
  next();
};

// Role-based access control middleware
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).send("Forbidden"); // Unauthorized if role doesn't match
    }
    next();
  };
};

module.exports = { authMiddleware, roleMiddleware };
