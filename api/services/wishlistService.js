const { wishlistDao } = require('../models');

const addWishlist = async(userId, productId) => {
    const findWishlistId = await wishlistDao.findWishlistId(userId, productId);

    if(findWishlistId.length==0){
        return await wishlistDao.addWishlist(userId, productId);
    }
    else{
        return await wishlistDao.oneDeleteWishlist(userId, productId);
    }
};

const getWishlist = async(userId) => {
    return await wishlistDao.getWishlist(userId);
};

const addCart = async(userId, productId, quantity) => {
    let optionId = await wishlistDao.optionId(productId)
    
    return wishlistDao.addCart(userId, optionId, quantity)
}

const oneDeleteWishlist = async(userId, productId) => {
    return await wishlistDao.oneDeleteWishlist(userId, productId);
}

const messageName = async(productId) => {
    return await wishlistDao.messageName(productId);
}

module.exports = {
    addWishlist,
    getWishlist,
    addCart,
    oneDeleteWishlist,
    messageName
}