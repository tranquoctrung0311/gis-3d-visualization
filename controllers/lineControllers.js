

const Line = require("../models/Line");
const Node = require("../models/Node");

const lineController = {
  getPolyline: async (req, res) => {
    try {
      const lines = await Line.find({ type: "polyline", name: req.query.name });
      return res.status(200).json(lines);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getLine: async (req, res) => {
    try {
      const lines = await Line.find({ type: "LineString", name: req.query.name });
      return res.status(200).json(lines);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  postLine: async (req, res) => {
    try {
      const { type, idNodes, color, height, width, name, des } = req.body;
      const newLine = new Line({
        type,
        idNodes,
        color,
        height,
        width,
        name,
        des,
      });
      const savedLine = await newLine.save();
      return res.status(200).json(savedLine);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  post: async (req, res) => {
    try {
      const linesData = req.body.features;
      const lines = [];
      for (let i = 0; i < linesData.length; i++) {
        const { geometry, properties } = linesData[i];
        const { coordinates } = geometry;
        const idNodes = [];
        for (let j = 0; j < coordinates.length; j++) {
          const nodeData = coordinates[j];
          const node = await Node.findOne({
            x: nodeData[0],
            y: nodeData[1],
            z: nodeData[2],
          });
          if (!node) {
            const newNode = new Node({
              x: nodeData[0],
              y: nodeData[1],
              z: nodeData[2],
            });
            const savedNode = await newNode.save();
            idNodes.push(savedNode._id);
          } else {
            idNodes.push(node._id);
          }
        }
        const newLine = new Line({
          type: "LineString",
          idNodes,
          color: properties.symbol.color,
          height: properties.height,
          width: properties.width,
          name: properties.name,
          des: properties.generator,
        });
        const savedLine = await newLine.save();
        lines.push(savedLine);
      }
      return res.status(200).json(lines);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  postPolyline: async (req, res) => {
    try {
      const linesData = req.body;
      const lines = [];
      for (let i = 0; i < linesData.length; i++) {
        const { paths, symbol, name } = linesData[i];
        const idNodes = [];
        for (let j = 0; j < paths.length; j++) {
          const nodeData = paths[j];
          const newNode = new Node({
            x: nodeData[0],
            y: nodeData[1],
            z: nodeData[2],
          });
          const savedNode = await newNode.save();
          idNodes.push(savedNode._id);
        }
        const newLine = new Line({
          type: "polyline",
          idNodes,
          color: symbol.color,
          height: 0,
          width: 0,
          name,
        });
        const savedLine = await newLine.save();
        lines.push(savedLine);
      }
      return res.status(200).json(lines);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = lineController;
