const errorHandler = require("./error.handler");
/**
 * Validate the 'limit' and `skip` query params
 * @param {String} val - limit or skip param
 * @param {Number} max - the max value (default 1000)
 * @param {String} type - what we're validating (skip or limit, default limit)
 * @return {Number} numerical form of the val
 */
function paginationHandler(val, type = "limit") {
    if (!val) {
        return null;
    }
    const num = +val;
    const min = 1;

    if (!Number.isInteger(num)) {
        return new errorHandler(
            500,
            `Invalid ${type}: '${val}', ${type} needs to be an integer.`
        );
    } else if (num < min) {
        return new errorHandler(
            500,
            `number should be equal or greater than ${min}`
        );
    }
    return num;
}

module.exports = paginationHandler;