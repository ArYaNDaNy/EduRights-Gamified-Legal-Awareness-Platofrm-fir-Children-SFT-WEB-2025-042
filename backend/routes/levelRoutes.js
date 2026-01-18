const express = require('express');
const { getLevelsByModule } = require('../controllers/levelController');

const router = express.Router();

router.get('/:moduleId', getLevelsByModule);

module.exports = router;
