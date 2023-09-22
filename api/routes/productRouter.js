const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');

router.get('random-items', productController.getRandomProducts);
router.get('/:id', productController.getProductDetailById);

module.exports = router;