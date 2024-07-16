const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const symbolPointType = new Schema({
    type: String,
    name: String,
    styleName: String,
});

const pointSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    idNode: {
        type: Schema.Types.ObjectId,
        ref: "Node",
        required: true
    },
    symbol: symbolPointType,
});

module.exports = mongoose.model("Point", pointSchema);
