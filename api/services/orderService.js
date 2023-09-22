const { orderDao, enums } = require('../models');

const getOrders = async(userId) => {
    const userOrders = await orderDao.getOrders(userId);
    
    if(!userOrders[0]){
        const error = new Error('Ordered_Nothing');
        error.statusCode = 400;

        throw error;
    }
    return userOrders;
};

const addToOrders = async(userId, totalPrice) => {
    const userPoint = await orderDao.checkPoints(userId);
    const userCarts = await orderDao.userCarts(userId);

    if(userPoint<totalPrice||totalPrice<0){
        const error = new Error('Not_Enough_Points');
        error.statusCode = 400;

        throw error;
    };
    if(userCarts.length==0){
        const error = new Error('Order_Nothing');
        error.statusCode = 400;

        throw error;
    };
    return orderDao.MoveCartToOrder(userId, totalPrice, userCarts);
};

const cancelOrders = async(userId, orderId, totalPrice) => {
    const orderStatus = await orderDao.checkOrderStatus(orderId);
    
    if(orderStatus==enums.orderStatusEnum.CANCELED){
        const error = new Error('Already_canceled');
        error.statusCode = 400;

        throw error;
    };

    return await orderDao.cancelOrders(userId, orderId, totalPrice);
}; 

module.exports = {
    getOrders,
    addToOrders,
    cancelOrders
}