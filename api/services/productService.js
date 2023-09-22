const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { productDao } = require('../models');

const getRandomProducts = async () => {
    return await productDao.getRandomProducts();
};

const getProductDetailById = async(id) => {
     const product = await productDao.getProductDetailById(id);
     return product;
};

module.exports = {
    getRandomProducts,
    getProductDetailById
}
