const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    login: { type: String, required: [true, "You must enter a login!"] },
    email: { type: String, required: [true, "You must enter a e-mail!"] },
    password: { type: String, required: [true, "You must enter a password!"] },
    comments: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    fraction: { type: String, defalut: "neutral" },
  },
  {
    collection: "accounts",
  }
);

module.exports = mongoose.model("Accounts", accountSchema);
