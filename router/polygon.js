// File: routes/polygon.routes.js

const express = require('express');
const router = express.Router();
const polygonController = require('../controllers/polygonControllers');

router.get('/getByName', polygonController.getPolygons);
router.post('/post', polygonController.postPolygon);
router.post('/postFast', polygonController.post);

module.exports = router;
