const { body } = require("express-validator")
const User = require('../models/userModels')
const { MESSAGE } = require('../utils/constants')
const bcrypt = require("bcrypt");

const registerValidator = [
    body("username")
        .notEmpty().withMessage(MESSAGE.REQUIRE_USERNAME)
        .custom(async (value) => {
            const existingUser = await User.findOne({ username: value });
            if (existingUser) {
                throw new Error(MESSAGE.EXISTS_USERNAME);
            }
            return true;
        }),
    body("email")
        .isEmail()
        .withMessage(MESSAGE.EMAIL_INVALID)
        .custom(async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                throw new Error(MESSAGE.EXISTS_EMAIL);
            }
            return true;
        }),
    body("password")
        .notEmpty().withMessage(MESSAGE.REQUIRE_PASSWORD)
        .isLength({ min: 6 }).withMessage(MESSAGE.CHARACTER_PASSWORD)
        .matches(/[A-Z]/).withMessage(MESSAGE.CAPITALIZE_PASSWORD),
];
const loginValidator = [
    body("username")
        .notEmpty()
        .withMessage(MESSAGE.REQUIRE_USERNAME)
        .custom(async (value) => {
            const isUser = await User.findOne({ username: value });
            if (!isUser) {
                throw new Error(MESSAGE.USERNAME_INVALID);
            }
            return true;
        }),
    body("password")
        .notEmpty().withMessage(MESSAGE.REQUIRE_PASSWORD)
        .isLength({ min: 6 }).withMessage(MESSAGE.CHARACTER_PASSWORD)
        .matches(/[A-Z]/).withMessage(MESSAGE.CAPITALIZE_PASSWORD)
        .custom(async (value, { req }) => {
            const user = await User.findOne({ username: req.body.username });
            const isMatch = await bcrypt.compare(value, user.password);
            if (!isMatch) {
                throw new Error("Sai mật khẩu");
            }
            return true;
        }),
];

module.exports = { registerValidator, loginValidator };