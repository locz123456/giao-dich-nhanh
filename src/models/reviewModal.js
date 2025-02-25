const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, default: null },
    comment: { type: String, default: null }
});

module.exports = mongoose.model('Review', reviewSchema);