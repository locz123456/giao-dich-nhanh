const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
const { registerValidator, loginValidator } = require('../validators/loginValidator')
const dotenv = require('dotenv');
dotenv.config();

router.get('/users', userController.getAllUsers);
router.post('/register', registerValidator, userController.createUser);
router.post('/login', loginValidator, userController.login);
router.get("/verify-email", userController.verifyeEmail)

module.exports = router;
