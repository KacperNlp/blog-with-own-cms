const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const Comment = require("../models/Comment");

/* GET users listing. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const isLogged = !!req.session.user;
  const loginOfLoggedUser = req.session.user;

  Article.findById(id, (err, article) => {
    if (err) {
      throw Error(err);
    } else {
      res.render("article", { isLogged, loginOfLoggedUser, article });
    }
  });
});

router.post("/:id", (req, res, next) => {
  const { id } = req.params;
  const { user } = req.session;
  const { content } = req.body;
  new Comment({
    author: user,
    content,
    postID: id,
  }).save();

  res.redirect(`/article/${id}`);
});

module.exports = router;
