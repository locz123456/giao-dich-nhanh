const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, default: null },
    image: { type: String, default: null },
    description: { type: String, default: null }
}, { timestamps: true });

// Format price khi lấy dữ liệu
// productSchema.methods.getFormattedPrice = function () {
//     return this.price.toLocaleString("vi-VN");
// };

module.exports = mongoose.model('Product', productSchema);
