// File: models/cylinder.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CylinderSchema = new Schema({
  idNode: Schema.Types.ObjectId,
  radius: Number,
  height: Number,
  color: String,
  des: String,
  name: String,
});

module.exports = mongoose.model('Cylinder', CylinderSchema);
