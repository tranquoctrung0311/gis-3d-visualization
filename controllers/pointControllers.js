const Point = require("../models/Point");
const Node = require("../models/Node");

module.exports = {
    getPoints: async function (req, res) {
        try {
            const points = await Point.find();
            const detailedPoints = await Promise.all(points.map(async (point) => {
                const node = await Node.findById(point.idNode);
                return {
                    type: point.type,
                    x: node.x,
                    y: node.y,
                    z: node.z,
                    symbol: point.symbol,
                };
            }));
            return res.status(200).json(detailedPoints);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    postPoint: async function (req, res) {
        try {
            const data = req.body;
            const point = await Point.create({
                type: "point",
                idNode: data.idNode,
                symbol: {
                    type: "web-style",
                    name: data.name,
                    styleName: data.styleName,
                },
            });
            return res.status(200).json(point);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    postFast: async function (req, res) {
        try {
            const data = req.body;
            const points = await Promise.all(data.map(async (item) => {
                const node = await Node.create({
                    x: item.x,
                    y: item.y,
                    z: item.z,
                });

                const point = await Point.create({
                    type: "point",
                    idNode: node._id,
                    symbol: {
                        type: "web-style",
                        name: item.symbol.name,
                        styleName: item.symbol.styleName,
                    },
                });
                return point;
            }));
            return res.status(200).json(points);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};
