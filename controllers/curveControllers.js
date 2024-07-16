const Curve = require("../models/Curve");
const Face = require("../models/Face");
const Node = require("../models/Node");

module.exports = {
    getCurves: async function (req, res) {
        try {
            const curves = await Curve.find({ name: req.query.name }).populate('idFaces');
            const newRes = [];
            for (let i = 0; i < curves.length; ++i) {
                const curve = curves[i];
                for (let j = 0; j < curve.idFaces.length; ++j) {
                    const face = curve.idFaces[j];
                    const arrFace = [];
                    for (let k = 0; k < face.idNodes.length; ++k) {
                        const node = await Node.findOne({ _id: face.idNodes[k] });
                        if (node) {
                            arrFace.push([node.x, node.y, node.z]);
                        }
                    }
                    newRes.push({
                        type: "polygon",
                        rings: arrFace,
                        symbol: {
                            type: "simple-fill",
                            color: curve.color,
                            outline: { color: curve.color, width: 1 },
                        },
                    });
                }
            }
            return res.status(200).json(newRes);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    postCurve: async function (req, res) {
        try {
            const data = req.body;
            const curve = await Curve.create({
                idFaces: data.idFaces,
                color: data.color,
                des: data.des,
                name: data.name,
            });
            return res.status(200).json(curve);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    postFast: async function (req, res) {
        try {
            const data = req.body;
            const idFaces = [];
            const curveData = {
                color: data[0].symbol.color,
                name: data[0].name,
            };
            for (let i = 0; i < data.length; ++i) {
                const nodeArr = data[i].rings;
                const idNodes = [];
                for (let j = 0; j < nodeArr.length; ++j) {
                    let node = await Node.findOne({
                        x: nodeArr[j][0],
                        y: nodeArr[j][1],
                        z: nodeArr[j][2],
                    });
                    if (!node) {
                        node = await Node.create({
                            x: nodeArr[j][0],
                            y: nodeArr[j][1],
                            z: nodeArr[j][2],
                        });
                    }
                    idNodes.push(node._id);
                }
                const face = await Face.create({
                    idNodes: idNodes,
                });
                idFaces.push(face._id);
            }
            curveData.idFaces = idFaces;
            const curve = await Curve.create(curveData);
            return res.status(200).json(curve);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};
