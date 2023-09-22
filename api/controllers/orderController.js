const { orderService } = require('../services')
const { catchAsync } = require('../utils/error');

const getOrders = catchAsync(async(req, res) => {
     const userId = req.user.id;

     const getOrders = await orderService.getOrders(userId);
     res.status(200).json({getOrders});
});

const addToOrders = catchAsync(async(req, res) => {
    const userId = req.user.id;
    const { totalPrice } = req.body;

    await orderService.addToOrders(userId, totalPrice);
    res.status(201).json({ message : "Successfully_Ordered" });
}); 

const cancelOrders = catchAsync(async(req, res) => {
    const userId = req.user.id;
    const { orderId, totalPrice } = req.body;

    await orderService.cancelOrders(userId, orderId, totalPrice);
    res.status(200).json({ message : "Successfully_Canceled" });
})


module.exports = {
    getOrders,
    addToOrders,
    cancelOrders
}