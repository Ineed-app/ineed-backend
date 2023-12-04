const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header("Authorization");
    // console.log(token)
    if (!token) return res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = verified;
        req.device_id = verified.user.device_id;
        next();
        // console.log(req.AuthId);
    } catch (err) {
        res.status(400).json({ Error: "Invalid Token" });
    }
};