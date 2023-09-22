const express = require('express');
const router = express.Router();

const { categoryController } = require('../controllers');

router.get('/:categoryId', categoryController.categoryInfo);

module.exports = router;