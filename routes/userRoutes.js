import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const router = express.Router();

//Protect routes
router.get("/profile", authMiddleware, async(req,res)=>{
    try{
        const user = await User.findById(req.user.userId).select("password");
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        res.status(200).json({
            message:"Protected API accessed",
            user
        })
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
})

//Another protected route
router.get("/dashboard", authMiddleware, (req,res)=>{
    res.status(200).json({
        message:"Welcome to dashboard",
        userId:req.user.userId
    })
})

export default router

