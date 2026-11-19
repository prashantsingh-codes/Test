import express from "express"
import { signup, login } from "../controllers/authController.js";
import { rateLimit } from "express-rate-limit"

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        message:"Too many login attempts try again after 1 min"
    },
    standardHeaders:true,
    legacyHeaders:false,
})

router.post("/signup",signup);
router.post("/login", loginLimiter,login);

export default router
