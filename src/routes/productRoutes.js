const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middlewares/authMiddleware')

router.get('/products', verifyToken, productController.getAllProducts);
router.post('/products', verifyToken, productController.createProduct);
router.get('/products/:id', verifyToken, productController.findById)
router.put('/products/:id', verifyToken, productController.updateProduct);
router.delete('/products/:id', verifyToken, productController.deleteProduct);

module.exports = router;
