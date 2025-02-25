const Product = require('../models/productModels');
const Review = require('../models/reviewModal');
const { MESSAGE } = require('../utils/constants')

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR, error });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, type, image, description } = req.body;
        const newProduct = new Product({ name, price, type, image, description, userId: req.user.id });
        await newProduct.save();
        res.status(201).json({ message: MESSAGE.CREATE_SUCCESS, data: newProduct });
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR, error });
    }
};

exports.findById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({ message: MESSAGE.PRODUCT_DOES_NOT_EXIST })
        const comments = await Review.find({ productId: product._id })
        res.json({
            product,
            comments
        })
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: MESSAGE.PRODUCT_DOES_NOT_EXIST });

        res.json({ updatedProduct });
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(
            req.params.id,
        );
        if (!deleteProduct) return res.status(404).json({ message: MESSAGE.PRODUCT_DOES_NOT_EXIST });
        res.json({ message: MESSAGE.DELETE_SUCCESS });
    } catch (error) {
        res.status(500).json({ message: MESSAGE.SERVER_ERROR });
    }
};
