const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    type: { type: String, default: null },
    image: { type: String, default: null },
    description: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
