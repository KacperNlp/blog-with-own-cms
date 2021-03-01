const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

/* GET home page. */
router.get("/", function (req, res, next) {
  const isLogged = !!req.session.user;
  const loginOfLoggedUser = req.session.user;

  const listOfArticles = Article.find({}).sort({ date: -1 });

  listOfArticles.exec((err, articles) => {
    if (err) {
      throw Error(err);
    } else if (!articles.length) {
      res.render("index", {
        isLogged,
        loginOfLoggedUser,
        articles: false,
        latesArticle: false,
      });
    } else {
      const latesArticle = articles[0];
      articles.splice(0, 1);
      const restArticles = !!articles.length ? articles : false;

      res.render("index", {
        isLogged,
        loginOfLoggedUser,
        articles: restArticles,
        latesArticle,
      });
    }
  });
});

module.exports = router;
