// controllers/node.controller.js

const Node = require("../models/Node");

const nodeController = {
    getNodes: async (req, res) => {
        try {
            const nodes = await Node.find();
            return res.status(200).json(nodes);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getNode: async (req, res) => {
        try {
            const nodeId = req.query.id;
            const node = await Node.findById(nodeId);
            if (!node) {
                return res.status(404).json({ message: "Node not found" });
            }
            return res.status(200).json(node);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    postNode: async (req, res) => {
        try {
            const { x, y, z } = req.body;
            const newNode = new Node({ x, y, z });
            const savedNode = await newNode.save();
            return res.status(200).json(savedNode);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = nodeController;
