const User = require('../models/userModels');
const { MESSAGE } = require('../utils/constants')
// Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Lấy danh sách user từ DB
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR, error });
    }
};
 
// Tạo người dùng mới
exports.createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: MESSAGE.CREATE_SUCCESS, data: newUser });
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR, error });
    }
};
