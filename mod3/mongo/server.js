import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';  
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    try{
        res.send('inventory management system is running ');
      
    }catch(err){
        res.status(500).send('Server Error');
    }
})


 const MONGO_URI = process.env.MONGO_URI
 mongoose.connect(MONGO_URI)
   .then(() => {
     console.log('Connected to MongoDB');
     app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
     });
   })
   .catch((error) => {
     console.error('Error connecting to MongoDB:', error);
   });

 