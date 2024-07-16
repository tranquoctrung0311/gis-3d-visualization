// File: controllers/cylinder.controller.js

const Node = require('../models/Node');
const Cylinder = require('../models/Cylinder');

module.exports = {
  getCylinders: async function (req, res) {
    try {
      const name = req.query.name;
      const cylinders = await Cylinder.find({ name });

      if (cylinders.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy Cylinder' });
      }

      const cylinderData = [];
      for (let i = 0; i < cylinders.length; i++) {
        const node = await Node.findOne({ _id: cylinders[i].idNode });
        cylinderData.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [node.x, node.y, node.z],
          },
          id: cylinders[i].idNode,
        });
      }

      const featureCollection = {
        type: 'FeatureCollection',
        generator: cylinders[0].des,
        copyright: cylinders[0].des,
        timestamp: '2022-12-2',
        features: cylinderData,
      };

      res.status(200).json(featureCollection);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  postCylinder: async function (req, res) {
    try {
      const { idNode, radius, height, name, color, des } = req.body;
      const cylinder = await Cylinder.create({
        idNode,
        radius,
        height,
        name,
        color,
        des,
      });
      res.status(200).json(cylinder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  post: async function (req, res) {
    try {
      const features = req.body.features;
      const cylinders = [];

      for (let i = 0; i < features.length; i++) {
        const coordinates = features[i].geometry.coordinates;
        let idNode;

        const node = await Node.findOne({ x: coordinates[0], y: coordinates[1], z: coordinates[2] });

        if (!node) {
          const newNode = await Node.create({
            x: coordinates[0],
            y: coordinates[1],
            z: coordinates[2],
          });
          idNode = newNode._id;
        } else {
          idNode = node._id;
        }

        const cylinder = await Cylinder.create({
          idNode,
          radius: req.body.r,
          height: req.body.h,
          name: req.body.name,
          color: req.body.color,
          des: req.body.generator,
        });

        cylinders.push(cylinder);
      }

      res.status(200).json(cylinders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
