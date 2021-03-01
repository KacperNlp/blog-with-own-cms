const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    author: { type: String, required: true },
    title: { type: String, required: true },
    sneakPeak: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now() },
  },
  {
    collection: "news",
  }
);

module.exports = mongoose.model("Article", articleSchema);
