import productModel from "../models/productModel.js";
import mongoose from "mongoose";


// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;

        const product = new productModel({
            name,
            description,
            price,
            quantity,
            category,
            owner: req.user.id
        });

        const savedProduct = await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: savedProduct
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {

        const products = await productModel
            .find()
            .populate("owner", "userName email role");

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await productModel
            .findById(id)
            .populate("owner", "userName email role");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        // ADMIN CAN UPDATE ANY PRODUCT
        if (req.user.role === "admin") {

            const { name, description, price, quantity, category } = req.body;

            const updatedProduct = await productModel.findByIdAndUpdate(
                id,
                {
                    name,
                    description,
                    price,
                    quantity,
                    category
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            return res.status(200).json({
                success: true,
                message: "Product updated successfully by Admin",
                product: updatedProduct
            });
        }


        // USER CAN UPDATE ONLY THEIR OWN PRODUCT
        if (product.owner.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can update only your own product"
            });
        }


        const { name, description, price, quantity, category } = req.body;

        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                quantity,
                category
            },
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Your product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        // ADMIN CAN DELETE ANY PRODUCT
        if (req.user.role === "admin") {

            await productModel.findByIdAndDelete(id);

            return res.status(200).json({
                success: true,
                message: "Product deleted successfully by Admin"
            });
        }


        // USER CAN DELETE ONLY THEIR OWN PRODUCT
        if (product.owner.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can delete only your own product"
            });
        }


        await productModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Your product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};