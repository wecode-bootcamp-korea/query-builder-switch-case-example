const { productService } = require('../services');
const { catchAsync }  = require('../utils/error');

const getRandomProducts = catchAsync(async (req, res) => {
    const products = await productService.getRandomProducts();

    res.status(200).json({ data : products });
});

const getProductDetailById = catchAsync(async(req, res) => {
     const id = req.params.id;

     if(!id){
          const error = new Error('KEY_ERROR');
          error.statusCode = 400;

          throw error;
     }
     const product = await productService.getProductDetailById(id);
     res.status(200).json({product});
});

module.exports = {
     getRandomProducts,
     getProductDetailById
}