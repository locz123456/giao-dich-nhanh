const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Không có token, từ chối truy cập" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token không hợp lệ" });
        }
        req.user = decoded;
        next(); // Cho phép request tiếp tục vào controller
    });
};