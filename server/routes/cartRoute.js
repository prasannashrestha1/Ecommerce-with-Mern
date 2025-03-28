import express from "express";
import { admin, authUser } from "../middleware/authMiddleware.js";
import { addToCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart);

export default cartRouter;
