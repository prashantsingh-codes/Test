import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
dotenv.config();


const app= express();
connectDB();
let PORT=4000;

app.listen(PORT,()=>{
    console.log("Hi there")
})