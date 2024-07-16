

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LineSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  idNodes: [{
    type: Schema.Types.ObjectId,
    ref: "Node",
    required: true,
  }],
  color: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  des: String,
  name: String,
});

module.exports = mongoose.model("Line", LineSchema);
