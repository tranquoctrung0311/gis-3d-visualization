const express = require("express");
const router = express.Router();
const curveController = require("../controllers/curveControllers");

router.get("/getByName", curveController.getCurves);
router.post("/post", curveController.postCurve);
router.post("/postFast", curveController.postFast);

module.exports = router;
