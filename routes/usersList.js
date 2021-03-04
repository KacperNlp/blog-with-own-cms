const express = require("express");
const router = express.Router();
const Accounts = require("../models/Accounts");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const search = req.query.search || "";
  console.log(search);

  const isLogged = !!req.session.user;
  const loginOfLoggedUser = req.session.user;

  const listOfAccounts = Accounts.find({
    login: new RegExp(search.trim(), "i"),
  }).sort({ likes: -1 });

  listOfAccounts.exec((err, data) => {
    if (err) {
      throw Error(err);
    } else {
      res.render("listOfUsers", { isLogged, loginOfLoggedUser, users: data });
    }
  });
});

module.exports = router;
