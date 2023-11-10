const express = require("express");
const { handleUserEmail } = require("../middlewares/emailMiddleware");
const { login, registerUser } = require("../controllers/controllers");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// register user endpoint
router.post("/register-user", handleUserEmail, registerUser);

// login route
router.post("/login", handleUserEmail, login);

module.exports = router;
