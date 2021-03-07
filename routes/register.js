const express = require("express");
const router = express.Router();
const Accounts = require("../models/Accounts");

/* GET home page. */
router.get("/", function (req, res, next) {
  const { user } = req.session;
  const isLogged = !!user;
  const loginOfLoggedUser = user;

  res.render("register", {
    messages: false,
    registerParams: false,
    loginParams: false,
    isLogged,
    loginOfLoggedUser,
  });
});

router.post("/", (req, res, next) => {
  const { login, password } = req.body;
  const { user } = req.session;
  const isLogged = !!user;
  const loginOfLoggedUser = user;
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
          if (
            account.login === login &&
            account.password === password &&
            !account.isBanned
          ) {
            req.session.user = login;

            res.redirect("/");
          }
          if (id + 1 === array.length) {
            res.render("register", {
              messages: false,
              registerParams: false,
              loginParams: `This account isn't exists or your account could be banned!`,
              isLogged,
              loginOfLoggedUser,
            });
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
        const messages = {
          login: "",
          email: "",
        };

        listOfAccounts.forEach((account, id, array) => {
          if (account.email === email) {
            messages.email = "This e-mail is exists in our data!";
          }

          if (account.login === login) {
            messages.login = "This login is exists in our data!";
          }

          if (array.length === id + 1) {
            res.render("register", {
              messages,
              registerParams: req.body,
              loginParams: false,
              isLogged,
              loginOfLoggedUser,
            });
          }
        });
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
