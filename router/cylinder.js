// File: routes/index.js

const express = require('express');
const router = express.Router();

const cylinderController = require('../controllers/cylinderControllers');

router.get('/cylinders/getByName', cylinderController.getCylinders);
router.post('/cylinders/post', cylinderController.postCylinder);
router.post('/cylinders/postFast', cylinderController.post);

module.exports = router;
