const Review = require('../models/reviewModal');
const { MESSAGE } = require('../utils/constants')

exports.postReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const newReview = new Review({ productId, userId: req.user.id, rating, comment });
        console.log(newReview)
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR, error });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(
            req.params.id,
        );
        res.json({ message: MESSAGE.DELETE_SUCCESS });
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR, error });
    }
};