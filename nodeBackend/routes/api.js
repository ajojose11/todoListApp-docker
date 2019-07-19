const express = require('express');
const router = express.Router();

const apiController = require('../controller/api');

router.use('/', apiController.authenticate);

module.exports = router;