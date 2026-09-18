import express from "express";
import dotenv from "dotenv";

import sequelize from "./models/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();


// Middleware
app.use(express.json());


// Routes
app.use("/api/products", productRoutes);


// Home route
app.get("/", (req, res) => {
    res.send("PostgreSQL Inventory API is running");
});


// Connect database and start server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {

        await sequelize.authenticate();

        console.log("PostgreSQL connected successfully");

        await sequelize.sync();

        console.log("Products table synchronized");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Database connection error:", error.message);
    }
};

startServer();