const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require('../middlewares/authMiddleware')

router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.get('/products/:id', productController.findById)
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
