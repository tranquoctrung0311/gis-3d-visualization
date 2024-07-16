// File: models/polygon.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const symbolPolygonType = new Schema({
  type: String,
  color: String,
  outline: { color: String, width: Number },
});

const PolygonSchema = new Schema({
  type: { type: String, default: 'polygon' },
  name: String,
  idNodes: [{ type: Schema.Types.ObjectId, ref: 'Node' }],
  symbol: symbolPolygonType,
});

module.exports = mongoose.model('Polygon', PolygonSchema);
