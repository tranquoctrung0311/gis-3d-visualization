// routers/node.router.js

const express = require("express");
const router = express.Router();
const nodeController = require("../controllers/nodeControllers");

router.get("/getAll", nodeController.getNodes);
router.get("/get", nodeController.getNode);
router.post("/post", nodeController.postNode);

module.exports = router;
