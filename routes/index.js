const express = require("express");
const { handleUserEmail } = require("../middlewares/emailMiddleware");
const { login } = require("../controllers/controllers");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", handleUserEmail, login);

module.exports = router;
