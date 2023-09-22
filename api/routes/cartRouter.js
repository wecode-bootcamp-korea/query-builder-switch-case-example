const express = require('express');
const router  = express.Router();
const { loginRequired } = require('../utils/auth');

const { cartController } = require('../controllers');

router.post('',loginRequired, cartController.addCart);
router.get('',loginRequired, cartController.getCart);
router.patch('/change', loginRequired, cartController.cartQuantityChange);
router.delete('/all',loginRequired, cartController.allDeleteCart);
router.delete('/one',loginRequired, cartController.oneDeleteCart);

module.exports = router;
