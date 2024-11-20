import express from "express";
import { loginUser, signUpUser } from "../controller/authUser.js";
import { validateSignup } from "../middlewares/validationMiddleware.js";

const router = express.Router();

//routes
router.post("/login", loginUser);
router.post("/signup", validateSignup, signUpUser);
export default router;
