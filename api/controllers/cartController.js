const { cartService } = require('../services');
const { catchAsync }  = require('../utils/error');

const addCart = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productOptionId, quantity } = req.body;
    
    const addCart = await cartService.addCart(userId, productOptionId, quantity);
    const messageName = await cartService.messageName(productOptionId);
    res.status(200).json({ addCart, messageName });
});

const getCart = catchAsync(async (req, res) => {
    const userId = req.user.id;

    if(!userId) {
        const error = new Error('USER_ID_IS_NOT_VALID');
        error.statusCode = 400;

        throw error;
    }

    const getCart = await cartService.getCart(userId);
    res.status(200).json({ getCart });
});

const cartQuantityChange = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productOptionId, quantity } = req.query;

    if( !productOptionId || !quantity) {
        const error = new Error("quantityPlus Error");
        error.statusCode = 400;

        throw error;
    }

    const cartQuantityChange = await cartService.cartQuantityChange(userId, productOptionId, quantity);
    res.status(200).json({ cartQuantityChange });
});

const allDeleteCart = catchAsync(async (req, res) => {
    const userId = req.user.id;

    if(!userId) {
        const error = new Error("ALL DELETE ERROR");
        error.statusCode = 400;

        throw error;
    }

    const allDeleteCart = await cartService.allDeleteCart(userId);
    res.status(200).json({ allDeleteCart });
});

const oneDeleteCart = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productOptionId } = req.query;

    if(!userId || !productOptionId) {
        const error = new Error("DELETE ERROR");
        error.statusCode = 400;

        throw error;
    }

    const oneDeleteCart = await cartService.oneDeleteCart(userId, productOptionId);
    const messageName = await cartService.messageName(productOptionId);
    res.status(200).json({ oneDeleteCart, messageName });
});

module.exports = {
    addCart,
    getCart,
    cartQuantityChange,
    allDeleteCart,
    oneDeleteCart
}