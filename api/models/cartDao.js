const { wekeaDataSource } = require('./dataSource');

const addCart = async (userId, productOptionId, quantity) => {
    const addCart = await wekeaDataSource.query(`
        INSERT INTO carts(
            user_id,
            product_option_id,
            quantity
        ) values(?,?,?);`,[userId, productOptionId, quantity]
    ) 
    return addCart.insertId;
};

const findCartId = async(userId, productOptionId) => {
    return await wekeaDataSource.query(`
        SELECT 
            id
        FROM carts
        WHERE user_id=? AND product_option_id=?
    `, [userId, productOptionId]
    ) 
}

const onePlusQuantity = async(findCartId) => {
    return await wekeaDataSource.query(`
        UPDATE carts
        SET quantity = quantity + 1
        WHERE id =?;
    `, [findCartId]
    )
};

const getCart = async (userId) => {
    const result = await wekeaDataSource.query(`
        SELECT
            c.id,
            c.quantity,
            o.size,
            o.price,
            o.color,
            o.id AS optionId,
            p.id AS productId,
            p.name,
            p.thumbnail,
            p.description
        FROM carts c
        INNER JOIN product_options o ON c.product_option_id = o.id 
        INNER JOIN products p ON o.product_id = p.id
        INNER JOIN users u ON c.user_id = u.id
        WHERE u.id = ?
        `, [userId]
        )     

    return result;
};

const messageName = async (productOptionId) => {
    return await wekeaDataSource.query(`
        SELECT name
        FROM products
        WHERE id=?
    `, [productOptionId]
    )
};

const cartQuantityChange = async (userId, productOptionId, quantity) => {
    const result = await wekeaDataSource.query(`
        UPDATE carts
        SET quantity =?
        WHERE user_id =? AND product_option_id =?
    `, [quantity, userId, productOptionId])

    return result;
}

const allDeleteCart = async(userId) => {
    const allDeleteCart = await wekeaDataSource.query(`
        DELETE FROM carts c
        WHERE c.user_id =?
    `, [userId]
    );
    return allDeleteCart;
}

const oneDeleteCart = async (userId, productOptionId) => {
    const oneDeleteCart = await wekeaDataSource.query(`
        DELETE FROM carts c
        WHERE c.user_id=? AND c.product_option_id=?
    `, [userId, productOptionId]
    )
    return oneDeleteCart;
};

module.exports = {
    addCart,
    findCartId,
    onePlusQuantity,
    getCart,
    messageName,
    cartQuantityChange,
    allDeleteCart,
    oneDeleteCart
}