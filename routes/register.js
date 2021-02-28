const express = require("express");
const router = express.Router();
const Accounts = require("../models/Accounts");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("register");
});

router.post("/", (req, res, next) => {
  const { login, password } = req.body;
  const email = req.body.email ? req.body.email : false;
  //login
  if (!email) {
    const accounts = Accounts.find({}, (err) => {
      if (err) {
        console.log(err);
      }
    });

    accounts.exec((err, listOfAccounts) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        listOfAccounts.forEach((account, id, array) => {
          if (account.login === login && account.password == password) {
            req.session.user = login;
            res.locals.user = login;

            res.redirect("/");
          } else if (id + 1 === array.lenth) {
            res.redirect("/register");
          }
        });
      }
    });
    //register new user
  } else {
    const accounts = Accounts.find({ $or: [{ email }, { login }] }, (err) => {
      if (err) {
        console.log(err);
      }
    });

    accounts.exec((err, listOfAccounts) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else if (!!listOfAccounts.length) {
        console.log("This nic or email is busy");
        res.redirect("/register");
      } else {
        req.session.user = login;
        res.locals.user = login;

        new Accounts({
          login,
          email,
          password,
        }).save();

        res.redirect("/");
      }
    });
  }
});

module.exports = router;
