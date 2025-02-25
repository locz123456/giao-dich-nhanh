const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { verifyToken } = require('../middlewares/authMiddleware')

router.post('/review', verifyToken, reviewController.postReview);
router.delete('/review/:id', verifyToken, reviewController.deleteReview);

module.exports = router;