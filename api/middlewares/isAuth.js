const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const token = req.header("x-auth-token").split(" ")[1];
    if (!token) {
        res.status(401);
        throw new Error("No token, authorization denied");
    }
    try {
        const decoded = jwt.verify(token, 'process.env.JWT_SECRET');
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(403);
        throw new Error("Invalid token");
    }
};

module.exports = isAuth;
