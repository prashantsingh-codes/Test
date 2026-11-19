import bcrypt from "bcryptjs";
import User from "../models/userModel.js"
import jwt from "jsonwebtoken";

const signup = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({message: "Missing req fields"})
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({message:"User already present"})
        }

        const hashedPassword= await bcrypt.has(password,12);

        const user = await User.create({
            name,email,password:hashedPassword
        });

        res.status(201).json({
            message: "User registered success",user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });


    } catch (error) {
        res.status(500).json({message:"Signup failed",
            error:error.message
        })
        
    }
}

const login = async(req,res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({success:false})
        }

        const isPasswordValid = await bcrypt.compare(
            password,user.password
        )

        if(!isPasswordValid){
            return res.status(401).json({
                success:false
            })
        }

        const token =jwt.sign({userId},process.env.JWT_SECRET,{
                expiresIn: "1d",}
            )

            res.status(200).json({success:true})
    }
    catch(error){
        res.status(500).json({success:false})

    }

}

export {signup,login}