import express from "express";
import { admin, authUser } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getUserCart,
  mergeCart,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/", getUserCart);
cartRouter.post("/", addToCart);
cartRouter.post("/merge", authUser, mergeCart);

export default cartRouter;
