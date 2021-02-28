const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const isLogged = !!req.session.user;
  const loginOfLoggedUser = req.session.user;

  res.render("index", { isLogged, loginOfLoggedUser });
});

module.exports = router;
