const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.token;

    const decoded = jwt.verify(token, "password");
    const userId = decoded.userId;

    if (userId) {
        req.userId = userId;
        next();
    } else {
        res.status(403).json({
            msg : "Invalid Token !"
        });
    };
};

module.exports = {
    authMiddleware
};