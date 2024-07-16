// models/Face.js

const mongoose = require("mongoose");

const faceSchema = new mongoose.Schema({
    idNodes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Node"
    }],
});

module.exports = mongoose.model("Face", faceSchema);
