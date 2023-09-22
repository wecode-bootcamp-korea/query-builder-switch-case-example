const { wishlistService } = require('../services');
const { catchAsync }  = require('../utils/error');

const addWishlist = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.query;
    
    const addWishlist = await wishlistService.addWishlist(userId, productId);
    const messageName = await wishlistService.messageName(productId);
    res.status(200).json({ addWishlist, messageName });
});

const getWishlist = catchAsync(async (req, res) => {
    const userId = req.user.id;

    if(!userId) {
        const error = new Error('USER_ID_IS_NOT_VALID');
        error.statusCode = 400;

        throw error;
    }

    const getWishlist = await wishlistService.getWishlist(userId);
    res.status(200).json({ getWishlist });
});

const addCart = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.query;

    if(!userId) {
        const error = new Error("replace ERROR");
        error.statusCode = 400;
        throw error;
    }

    const app = await wishlistService.addCart(userId, productId, quantity);
    res.status(200).json({"message":"success" , "data" : app})
});

const oneDeleteWishlist = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.query;

    if(!userId || !productId) {
        const error = new Error("DELETE ERROR");
        error.statusCode = 400;

        throw error;
    }

    const oneDeleteWishlist = await wishlistService.oneDeleteWishlist(userId, productId);
    const messageName = await wishlistService.messageName(productId);
    res.status(200).json({ oneDeleteWishlist, messageName });
});

module.exports = {
    addWishlist,
    getWishlist,
    addCart,
    oneDeleteWishlist
}