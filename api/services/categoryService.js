const { categoryDao } = require('../models');

const categoryService = async(categoryId, offset, limit, minPrice, maxPrice, sortBy) => {

    const ordering = async(sortBy) => {

        switch(sortBy){
            case 'priceASC':
                return `ORDER BY o.price ASC, o.id ASC`
            case 'priceDESC':
                return `ORDER BY o.price DESC, o.id ASC`
            case 'nameASC':
                return `ORDER BY productName ASC, o.id ASC`
            case 'newest':
                return `ORDER BY p.created_at DESC, o.id ASC`
            default:
                return `ORDER BY o.id`
        }
    };

    const priceRange = async(minPrice, maxPrice) => {

        if (!minPrice && !maxPrice) return ` AND o.price>=0`

        if (minPrice===0)           return ` AND (o.price>=0 AND o.price<${maxPrice})`

        return  ` AND (o.price>=${minPrice} AND o.price<${maxPrice})`;

    };

    const orderingQuery = await ordering(sortBy);
    const priceRangeQuery = await priceRange(minPrice, maxPrice);

    return await categoryDao.getProductsByCat(categoryId, offset, limit, orderingQuery, priceRangeQuery);
}

module.exports = {
    categoryService
}
