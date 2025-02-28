const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null },
    isVerified: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
