import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"]
        },

        quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
            min: [0, "Quantity cannot be negative"]
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;