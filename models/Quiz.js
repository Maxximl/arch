const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  theme: { type: String, required: true, unique: true },
  level: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  games: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Quiz", schema);