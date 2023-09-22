const express = require('express');
const router  = express.Router();
const { loginRequired } = require('../utils/auth');

const { wishlistController } = require('../controllers');

router.post('',loginRequired, wishlistController.addWishlist);
router.get('',loginRequired, wishlistController.getWishlist);
router.post('/addition',loginRequired, wishlistController.addCart);
router.delete('/one',loginRequired, wishlistController.oneDeleteWishlist);

module.exports = router;