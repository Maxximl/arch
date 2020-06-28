const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imgData: { type: String, required: true },
  fileName: { type: String },
});

module.exports = model("Greenhouse", schema);