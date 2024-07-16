// controllers/face.controller.js

const Face = require("../models/Face");
const Node = require("../models/Node");

const faceController = {
    getFaces: async (req, res) => {
        try {
            const faces = await Face.find();
            return res.status(200).json(faces);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getFace: async (req, res) => {
        try {
            const { id } = req.query;

            // Tìm Face theo id
            const face = await Face.findOne({ _id: id });

            // Lấy thông tin các Node liên quan và chuyển đổi sang định dạng mới
            const newRes = [];
            for (let i = 0; i < face.idNodes.length; i++) {
                const node = await Node.findOne({ _id: face.idNodes[i] });
                newRes.push([node.x, node.y, node.z]);
            }

            return res.status(200).json(newRes);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    postFace: async (req, res) => {
        try {
            const { idNodes } = req.body;

            // Tạo một Face mới
            const newFace = new Face({
                idNodes,
            });

            // Lưu vào cơ sở dữ liệu
            const savedFace = await newFace.save();

            return res.status(200).json(savedFace);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = faceController;
