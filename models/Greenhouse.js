const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imgData: { type: String, required: true },
  fileName: { type: String },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Greenhouse", schema);