const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const wishlistRouter = require('./wishlistRouter'); 
const cartRouter = require('./cartRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');

router.use('/users', userRouter);
router.use('/wishlist', wishlistRouter);
router.use('/carts', cartRouter);
router.use('/products/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/order', orderRouter);

module.exports = router;