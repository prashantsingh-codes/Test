import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();


const app= express();
app.use(express.json());
connectDB();
let PORT=4000;

//ROutes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.get("/",(req,res)=>{
    res.json("Server is running");
})

app.listen(PORT,()=>{
    console.log("Hi there")
})