/**
 * 
 * @param {number} limit 
 * @param {number} page 
 * @param {number} totItems 
 * @description pagination calcul and return new pagination infos.
 * @returns {Object} with limit, currentPage, offset(skip), totPage and totItems.
 */
function pagination(limit, page, totItems) {
    return {
        limit: parseInt(limit),
        currentPage: parseInt(page),
        offset: page > 1 ? limit  * (page - 1) : 0,
        totPage: Math.round(parseInt(totItems) / parseInt(limit)),
        totItems: parseInt(totItems)
    }
}
module.exports = pagination;