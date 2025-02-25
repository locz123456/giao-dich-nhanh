const User = require('../models/userModels');
const { MESSAGE } = require('../utils/constants')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");
const sendEmail = require('../utils/sendEmail')
const dotenv = require('dotenv');
dotenv.config();

// Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.aggregate([
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "userId",
                    as: "products"
                }
            }
        ]);

        const total = await User.countDocuments();

        res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: users,
        });

    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR, error });
    }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ username, email, password: hashedPassword, isVerified: false });
        await user.save()

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const verifyLink = `${process.env.FRONTEND_URL}/api/verify-email?token=${token}`
        await sendEmail(email, username, verifyLink)

        res.status(201).json({ message: MESSAGE.SIGN_SUCCESS });
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let user = await User.findOne({ username: username })
        if (!user.isVerified) {
            return res.status(400).json({ message: MESSAGE.NOT_CONFIRMED_EMAIL });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 ngày
        })
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR });
    }
};
exports.verifyeEmail = async (req, res) => {
    const { token } = req.query;
    try {
        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({ message: MESSAGE.USERNAME_INVALID });
        }
        // Xác nhận tài khoản
        user.isVerified = true;
        await user.save();
        res.json({ message: MESSAGE.EMAIL_CONFIRMED });
    } catch (error) {
        return res.status(400).json({ message: MESSAGE.SERVER_ERROR });
    }
}