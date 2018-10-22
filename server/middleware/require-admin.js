const httpError = require("http-errors");

const requireAdmin = function (req, res, next) {
    console.log("req.user===",req.user,req.session);
    if (req.user && req.user.roles.indexOf("admin") > -1) 
        return next();
    const err = new httpError(401);
    return next(err);
};

module.exports = requireAdmin;
