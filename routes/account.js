const express = require("express");
const router = express.Router();
const Accounts = require("../models/Accounts");

/* GET users listing. */

//logout
router.get("/logout", (req, res, next) => {
  req.session.user = false;
  res.redirect("/register");
});

//render login panel by nick name
router.get("/:login", async function (req, res, next) {
  const { login } = req.params;
  const { fraction } = req.query;
  const isLogged = !!req.session.user;
  const loginOfLoggedUser = req.session.user;

  if (fraction) {
    await Accounts.updateOne({ login }, { $set: { fraction: fraction } });
  }

  Accounts.find({ login }, (err, foundLogin) => {
    if (err) {
      console.log(err);
    } else if (!foundLogin.length) {
      res.redirect("/");
    } else {
      res.render("accountPanel", {
        isLogged,
        loginOfLoggedUser,
        account: foundLogin[0],
      });
    }
  });
});

module.exports = router;
