const express = require("express");
const router = express.Router();
const pointController = require("../controllers/pointControllers");

router.get("/getAll", pointController.getPoints);
router.post("/post", pointController.postPoint);
router.post("/postFast", pointController.postFast);

module.exports = router;
