const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  links: [
    {
      type: Types.ObjectId,
      ref: "Link",
    },
  ],
  quizes: [
    {
      type: Types.ObjectId,
      ref: "Quiz",
    },
  ],
  greenhouses: [
    {
      type: Types.ObjectId,
      ref: "Greenhouse"
    }
  ]
});

module.exports = model("User", schema);
