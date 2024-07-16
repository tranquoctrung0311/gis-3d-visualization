const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurveSchema = new Schema({
    idFaces: [{
        type: Schema.Types.ObjectId,
        ref: "Face"
    }],
    color: String,
    des: String,
    name: String,
});

module.exports = mongoose.model("Curve", CurveSchema);
