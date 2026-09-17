import express from "express";

import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import dbConnect from "./config/dbConnect.js";

dotenv.config();
dbConnect();

const app = express();
// app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});