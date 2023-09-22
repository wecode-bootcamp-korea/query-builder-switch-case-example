const express = require('express');
const router = express.Router();

const { orderController } = require('../controllers');
const { loginRequired } = require('../utils/auth');

router.get('', loginRequired, orderController.getOrders);
router.post('/pay', loginRequired, orderController.addToOrders);
router.post('/refund', loginRequired, orderController.cancelOrders);

module.exports = router;
