const jwt = require("jsonwebtoken");


function authMiddleware(req, res, next) {
    const password = req.body.password;
    const token = req.headers.token;

    if (!token) {
        res.status(403).send({
            msg: "You are not authenticated."
        });
        return;
    };

    const decoded = jwt.verify(token, password);
    const username = decoded.username;
    req.username = username;

    if (!username) {
        res.status(403).json({
            message: "malformed token"
        });
        return;
    };

    next();
};

module.exports = authMiddleware;