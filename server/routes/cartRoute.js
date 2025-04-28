import express from "express";
import { admin, authUser } from "../middleware/authMiddleware.js";
import {
  addToCart,
  deleteCart,
  getUserCart,
  mergeCart,
  removeAllItems,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/merge", authUser, mergeCart);
cartRouter.get("/", getUserCart);
cartRouter.post("/", addToCart);
cartRouter.delete("/", deleteCart);
export default cartRouter;
