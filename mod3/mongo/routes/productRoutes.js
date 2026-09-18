import express from "express";

import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

import authMiddleware from "../Middleware/authMiddleware.js";
import allowRoles from "../Middleware/roleMiddleware.js";

const router = express.Router();


router.get(
    "/admin-test",
    authMiddleware,
    allowRoles("Admin"),
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin! You have access.",
            role: req.user.role
        });
    }
);


router.post(
    "/",
    authMiddleware,
    allowRoles("admin", "user"),
    createProduct
);

router.get(
    "/",
    authMiddleware,
    allowRoles("admin", "user", "seller"),
    getProducts
);

router.get(
    "/:id",
    authMiddleware,
    allowRoles("admin", "user", "seller"),
    getProductById
);

router.put(
    "/:id",
    authMiddleware,
    updateProduct
);

router.delete(
    "/:id",
    authMiddleware,
    deleteProduct
);

export default router;