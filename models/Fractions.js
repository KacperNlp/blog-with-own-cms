const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fractionsSchema = new Schema(
  {
    name: { type: String },
    members: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
  },
  {
    collection: "fractions",
  }
);

module.exports = mongoose.model("Fractions", fractionsSchema);
