const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const Article = require("../models/Article");
const Accounts = require("../models/Accounts");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const isLogged = !!req.session.user;
  const loginOfLoggedUser = req.session.user;
  const usersList = Accounts.find({});

  usersList.exec((err, users) => {
    if (err) {
      throw Error(err);
    } else {
      const banndeUsers = [];
      const adminIndex = users.findIndex((user) => user.login === "Admin");
      users.splice(adminIndex, 1);

      for (let i = users.length - 1; i >= 0; i--) {
        if (users[i].isBanned) {
          banndeUsers.push(users[i]);
          users.splice(i, 1);
        }
      }

      res.render("admin", { isLogged, loginOfLoggedUser, users, banndeUsers });
    }
  });
});

router.post("/", (req, res, next) => {
  new Article(req.body).save();

  res.redirect("/");
});

router.get("/:action/:userID", (req, res, next) => {
  const { userID, action } = req.params;
  const ban = action === "ban";

  Accounts.updateOne(
    { _id: mongodb.ObjectID(userID) },
    { $set: { isBanned: ban } },
    (err) => {
      if (err) {
        throw Error(err);
      } else {
        res.redirect("/admin");
      }
    }
  );
});

module.exports = router;
