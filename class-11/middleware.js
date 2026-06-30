const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.token;

    const decoded = jwt.verify(token, "password");

    if (decoded.userId) {
        req.userId = decoded.userId;
        next()
    } else {
        res.status(403).json({
            msg : "Invalid Token"
        })
    }
};

module.exports = {
    authMiddleware : authMiddleware
};