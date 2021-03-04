const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const Article = require("../models/Article");
const Comment = require("../models/Comment");
const Accounts = require("../models/Accounts");

/* GET users listing. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  const isLogged = !!req.session.user;
  const loginOfLoggedUser = req.session.user;

  Article.findById(id, (err, article) => {
    if (err) {
      throw Error(err);
    } else {
      Comment.find({ postID: id }, (err, commentsList) => {
        //get comments from data
        if (err) {
          throw Error(err);
        } else {
          const comments = !!commentsList.length ? commentsList : false;
          res.render("article", {
            isLogged,
            loginOfLoggedUser,
            article,
            comments,
          });
        }
      });
    }
  });
});

//save added comment in data
router.post("/:id", (req, res, next) => {
  const { id } = req.params;
  const { user } = req.session;
  const { content } = req.body;

  new Comment({
    author: user,
    content,
    postID: id,
  }).save();

  const userWhichAddComment = Accounts.find({ login: user });

  //update number of added comments
  userWhichAddComment.exec((err, userData) => {
    if (err) {
      throw Error(err);
    } else {
      const userComments = Number(userData[0].comments) + 1;
      Accounts.updateOne(
        { login: user },
        { $set: { comments: userComments } },
        (err) => {
          if (err) {
            throw Error(err);
          } else {
            res.redirect(`/article/${id}`);
          }
        }
      );
    }
  });
});

//update likes for comment
router.post("/:articleID/:commentID", (req, res, next) => {
  const { likes, commentAuthor } = req.body;
  const { user } = req.session;
  const { commentID } = req.params;

  const id = new mongodb.ObjectID(commentID);

  Comment.findById(commentID, (err, comment) => {
    if (err) {
      throw Error(err);
    } else {
      const { listOfUsersWhichLiked } = comment;
      const hasAlreadyBeenLiked = listOfUsersWhichLiked.find(
        (likingUser) => likingUser === user
      );

      const isUnlike = comment.likes > likes;
      const authorOfComment = Accounts.find({ login: commentAuthor });

      authorOfComment.exec((err, data) => {
        if (err) {
          throw Error(err);
        } else {
          let numberOfLikes = data[0].likes;

          if (!hasAlreadyBeenLiked && !isUnlike) {
            listOfUsersWhichLiked.push(user);
            numberOfLikes++;
          } else {
            const indexOfUser = listOfUsersWhichLiked.findIndex(
              (likedUsers) => likedUsers === user
            );
            listOfUsersWhichLiked.splice(indexOfUser, 1);
            numberOfLikes--;
          }

          Accounts.updateOne(
            { login: commentAuthor },
            { $set: { likes: numberOfLikes } },
            (err) => {
              if (err) {
                throw Error(err);
              }
            }
          );

          Comment.updateOne(
            { _id: id },
            {
              $set: {
                likes: likes,
                listOfUsersWhichLiked: listOfUsersWhichLiked,
              },
            },
            (err) => {
              if (err) throw Error(err);
            }
          );

          res.end();
        }
      });
    }
  });
});

module.exports = router;
