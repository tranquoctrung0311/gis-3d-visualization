// routes/prism.router.js

const express = require("express");
const router = express.Router();
const prismController = require("../controllers/prismControllers");

// GET all prisms
router.get("/", prismController.getPrisms);

// GET prism by ID
//router.get("/:id", prismController.getPrism);

// POST a new prism
router.post("/", prismController.postPrism);

// POST multiple prisms
router.post("/batch", prismController.post);

module.exports = router;
