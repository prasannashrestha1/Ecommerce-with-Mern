import express from "express";
import { admin, authUser } from "../middleware/authMiddleware.js";
import { addToCart, getUserCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.get("/getCart", getUserCart);
cartRouter.post("/merge", authUser, getUserCart);

export default cartRouter;
