import express from "express";
import { getProfile, login, signup } from "../controllers/userController.js";
import { authUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/profile", authUser, getProfile);

export default userRouter;
