const { wekeaDataSource } = require('./dataSource');

const addWishlist = async (userId, productId) => {
    const addWishlist = await wekeaDataSource.query(`
        INSERT INTO wishlists(
            user_id,
            product_id
        ) values(?,?);`,[userId, productId]
    ) 
    return addWishlist.insertId;
};

const findWishlistId = async(userId, productId) => {
    return await wekeaDataSource.query(`
        SELECT 
            id
        FROM wishlists
        WHERE user_id=${userId} AND product_id=${productId}; 
    `) 
}

const getWishlist = async (userId) => {
    const result = await wekeaDataSource.query(`
        SELECT
            o.id,
            w.product_id,
            o.size,
            o.price,
            o.color,
            p.name,
            p.thumbnail,
            p.description
        FROM wishlists w
        INNER JOIN users u ON w.user_id = u.id
        INNER JOIN products p ON w.product_id = p.id
        INNER JOIN product_options o ON p.id = o.product_id 
        WHERE u.id = ${userId}
    `)
    return result;
}

const optionId = async(productId) => {
    const options = await wekeaDataSource.query(`
        SELECT id
            FROM product_options o
            WHERE o.product_id = ${productId}`);

    return options[0].id;
}

const addCart = async(userId, productId, quantity) => {
    return wekeaDataSource.query(`
        INSERT INTO carts(
            user_id,
            product_option_id,
            quantity
        ) VALUES (${userId}, ${productId}, ${quantity})
        `)
}

const allDeleteWishlist = async(userId) => {
    const allDeleteWishlist = await wekeaDataSource.query(`
        DELETE FROM wishlists w
        WHERE w.user_id = ${userId}
    `);
    return allDeleteWishlist;
}

const oneDeleteWishlist = async (userId, productId) => {
    const oneDeleteWishlist = await wekeaDataSource.query(`
        DELETE FROM wishlists w
        WHERE w.user_id=${userId} AND w.product_id=${productId}
    `)
    return oneDeleteWishlist;
};

const messageName = async (productId) => {
    return await wekeaDataSource.query(`
        SELECT name
        FROM products
        WHERE id=${productId}
    `)
};

module.exports = {
    addWishlist,
    findWishlistId,
    getWishlist,
    addCart,
    optionId,
    allDeleteWishlist,
    oneDeleteWishlist,
    messageName
}