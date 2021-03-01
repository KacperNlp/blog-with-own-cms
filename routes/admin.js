const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const { login } = req.params;
  const isLogged = !!req.session.user;
  const loginOfLoggedUser = req.session.user;

  res.render("admin", { isLogged, loginOfLoggedUser });
});

router.post("/", (req, res, next) => {
  new Article(req.body).save();

  res.redirect("/");
});

module.exports = router;
