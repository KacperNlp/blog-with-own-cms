const express = require("express");
const router = express.Router();
const Fractions = require("../models/Fractions");
const Accounts = require("../models/Accounts");

//render login panel by nick name
router.get("/", (req, res, next) => {
  const usersList = Accounts.find({});
  const fractions = Fractions.find({});

  fractions.exec((err, listOfFractions) => {
    if (err) {
      throw Error(err);
    } else {
      listOfFractions.forEach((fraction) => {
        fraction.points = 0;
        fraction.members = 0;
      });

      usersList.exec((err, users) => {
        if (err) {
          throw Error(err);
        } else {
          users.forEach((user) => {
            listOfFractions.forEach((fraction) => {
              if (user.fraction === fraction.name) {
                fraction.points += user.likes;
                fraction.members++;
              }
            });
          });

          listOfFractions.forEach((fraction) => {
            const { name, points, members } = fraction;
            Fractions.updateOne(
              { name },
              { $set: { points, members } },
              (err) => {
                if (err) {
                  throw Error(err);
                }
              }
            );
          });
          next();
        }
      });
    }
  });
});

router.get("/", async function (req, res, next) {
  const isLogged = !!req.session.user;
  const loginOfLoggedUser = req.session.user;

  const fractions = Fractions.find({}).sort({ points: -1 });

  fractions.exec((err, listOfFractions) => {
    if (err) {
      throw Error(err);
    } else {
      res.render("fractions", {
        isLogged,
        loginOfLoggedUser,
        fractions: listOfFractions,
      });
    }
  });
});

module.exports = router;
