module.exports = {
  collection: "users",
  getUserObject({ username, email, password, role = "user" }) {
    return {
      username,
      email,
      password,
      role, // user, uploader, admin
      bookmarks: [], // list of comic IDs
      createdAt: new Date(),
    };
  },
};
