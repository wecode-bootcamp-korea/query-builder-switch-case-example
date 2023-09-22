const { wekeaDataSource } = require('./dataSource');
const { orderStatusEnum } = require('./enums');

const getOrders = async(userId) => {
    const getOrders = await wekeaDataSource.query(`
        SELECT
            products.name AS name,
            o.id AS orderId,
            product_options.price AS price,
            o.created_at,
            o.updated_at,
            o.quantity,
            os.name AS orderStatus
        FROM orders o
        LEFT JOIN order_status os ON o.order_status_id=os.id
        INNER JOIN product_options ON o.product_option_id=product_options.id
        INNER JOIN products ON products.id=product_options.product_id
        WHERE o.user_id=?;`,[userId]
    );
    return getOrders;
};

const checkPoints = async(userId) => {
    const getPoints = await wekeaDataSource.query(`
        SELECT
            point
        FROM users
        WHERE id=?;`,[userId]
    );
    return getPoints[0].point;
};

const userCarts = async(userId) => {
    return await wekeaDataSource.query(`
        SELECT
            product_option_id,
            quantity
        FROM carts
        WHERE user_id=?;`,[userId]
    );
}

const MoveCartToOrder = async(userId, totalPrice, userCarts) => {

    const queryRunner = wekeaDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

    try{
        await queryRunner.query(`
            UPDATE users 
            SET
                point=point-?
            WHERE id=?;`,[totalPrice, userId]
        );
    
        for(var baseNumber=0; baseNumber<userCarts.length; baseNumber++){
            await queryRunner.query(`
                INSERT INTO orders(
                    user_id,
                    product_option_id,
                    quantity,
                    order_status_id
                ) VALUES (?,?,?,?);`
                ,[userId, userCarts[baseNumber].product_option_id, userCarts[baseNumber].quantity, orderStatusEnum.ADDED]
            );
        } 
        
        const deleteCarts = await queryRunner.query(`
            DELETE
            FROM carts
            WHERE user_id=?;`,[userId]
        );
        await queryRunner.commitTransaction();
        return deleteCarts;
    } catch (err) {
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
};

const checkOrderStatus = async(orderId) => {
    const orderStatus = await wekeaDataSource.query(`
        SELECT
            order_status_id AS osi
        FROM orders
        WHERE id=?`,[orderId]
    );
    console.log(orderStatus);
    return orderStatus[0].osi;
};

const cancelOrders = async(userId, orderId, totalPrice) => {

    const queryRunner = wekeaDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

    try{
        await queryRunner.query(`
            UPDATE users 
            SET
                point=point+?
            WHERE id=?;`,[totalPrice, userId]);
    
        const cancelOrders = await queryRunner.query(`
            UPDATE orders
            SET
                order_status_id=?
            WHERE id=?;`,[orderStatusEnum.CANCELED, orderId]);
        await queryRunner.commitTransaction();
        return cancelOrders;
    } catch (err) {
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
};

module.exports = {
    getOrders,
    checkPoints,
    userCarts,
    MoveCartToOrder,
    checkOrderStatus,
    cancelOrders
}
