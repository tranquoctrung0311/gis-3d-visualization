// File: controllers/polygon.controller.js

const Node = require('../models/Node');
const Polygon = require('../models/Polygon');

module.exports = {
  getPolygons: async function (req, res) {
    try {
      const name = req.query.name;
      const polygons = await Polygon.find({ name }).populate('idNodes');

      if (polygons.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy Polygon' });
      }

      const polygonData = polygons.map(polygon => ({
        type: polygon.type,
        rings: polygon.idNodes.map(node => [node.x, node.y, node.z]),
        symbol: polygon.symbol,
      }));

      res.status(200).json(polygonData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  postPolygon: async function (req, res) {
    try {
      const { name, idNodes, color } = req.body;
      const polygon = await Polygon.create({
        name,
        idNodes,
        symbol: {
          type: 'simple-fill',
          color,
          outline: { color, width: 1 },
        },
      });
      res.status(200).json(polygon);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  post: async function (req, res) {
    try {
      const polygons = [];
      const data = req.body.features;

      for (let i = 0; i < data.length; i++) {
        const nodeArr = data[i].rings;
        const idNodes = [];

        for (let j = 0; j < nodeArr.length; j++) {
          const { x, y, z } = nodeArr[j];
          let node = await Node.findOne({ x, y, z });

          if (!node) {
            node = await Node.create({ x, y, z });
          }

          idNodes.push(node._id);
        }

        const polygon = await Polygon.create({
          type: 'polygon',
          name: data[i].name,
          idNodes,
          symbol: {
            type: 'simple-fill',
            color: data[i].symbol.color,
            outline: { color: data[i].symbol.color, width: 1 },
          },
        });

        polygons.push(polygon);
      }

      res.status(200).json(polygons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
