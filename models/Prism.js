// models/prism.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrismSchema = new Schema({
  idFace: {
    type: Schema.Types.ObjectId,
    ref: "Face",
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Prism", PrismSchema);
