const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
    postID: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  {
    collection: "comments",
  }
);

module.exports = mongoose.model("Comment", commentSchema);
