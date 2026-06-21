const jwt = require("jsonwebtoken");

function Authmiddleware (req, res, next) {
    const token = req.headers.token;

    const decoded = jwt.verify(token, "password");
    const userId = decoded.userId;
    if (userId) {
        req.userId;
        next();
    } else {
        res.status(403).json({
            message : "Invalid Token"
        })
    };
};

module.exports = {
    Authmiddleware: Authmiddleware
}