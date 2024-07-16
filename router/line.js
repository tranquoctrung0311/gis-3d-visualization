

const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineControllers");

// GET polyline by name
router.get("/getPolylineByName", lineController.getPolyline);

// GET line by name
router.get("/getByName", lineController.getLine);

// POST a new line
router.post("/post", lineController.postLine);

// POST multiple lines
router.post("/postFast", lineController.post);

// POST polyline
router.post("/postPolyline", lineController.postPolyline);

module.exports = router;
