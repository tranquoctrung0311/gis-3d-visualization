// models/Node.js

const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    z: Number,
});

module.exports = mongoose.model("Node", nodeSchema);
