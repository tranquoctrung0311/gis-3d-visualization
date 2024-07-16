// controllers/prism.controller.js

const Prism = require("../models/Prism");
const Node = require("../models/Node");
const Face = require("../models/Face");

const prismController = {
  getPrisms: async (req, res) => {
    try {
      const { name } = req.query;

      const prisms = await Prism.find({ name }).populate({
        path: "idFace",
        populate: { path: "idNodes", select: "x y z" },
      });

      if (prisms.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy Prism" });
      }

      const prismData = prisms.map((prism) => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [prism.idFace.idNodes.map((node) => [node.x, node.y, node.z])],
        },
        id: prism.idFace._id,
      }));

      res.status(200).json({
        type: "FeatureCollection",
        generator: prisms[0].des,
        copyright: prisms[0].des,
        timestamp: "2022-12-2",
        features: prismData,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  postPrism: async (req, res) => {
    try {
      const { idFace, h, color, name, des } = req.body;

      const prism = await Prism.create({
        idFace,
        height: h,
        color,
        name,
        des,
      });

      res.status(200).json(prism);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  post: async (req, res) => {
    try {
      const prisms = [];
      const data = req.body.features;

      for (let i = 0; i < data.length; i++) {
        const nodeArr = data[i].geometry.coordinates[0];
        const idNodes = [];

        for (let j = 0; j < nodeArr.length; j++) {
          const { x, y, z } = nodeArr[j];
          let node = await Node.findOne({ x, y, z });

          if (!node) {
            node = await Node.create({ x, y, z });
          }

          idNodes.push(node._id);
        }

        const face = await Face.create({
          idNodes,
        });

        const prism = await Prism.create({
          idFace: face._id,
          height: req.body.h,
          color: req.body.color,
          name: req.body.name,
          des: req.body.generator,
        });

        prisms.push(prism);
      }

      res.status(200).json(prisms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = prismController;
