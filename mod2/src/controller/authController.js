import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) =>
     { 
        
        const {userName, email, password, role} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
    
   

        const newUser = new userModel({
            userName,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

             res.status(201).json({ message: "User registered successfully" });
     };

const login = async (req, res) => { 
   
  try{
     const { email, password } = req.body;
   const user = await userModel.findOne({ email });
   if (!user) {
    return res.status(404).json({ message: "User not found" });
   }

   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
   }
const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

res.status(200).json({ token, message: "Login successful" });

   }
    catch (error) {
        res.status(500).json({ message: "Internal server error" }); 
    }
    };


export { register, login };