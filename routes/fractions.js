const express = require("express");
const router = express.Router();
const Fractions = require("../models/Fractions");

//render login panel by nick name
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
