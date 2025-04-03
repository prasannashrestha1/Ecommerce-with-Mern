import express from "express";
import {
  createCheckout,
  updateSuccessfulCheckout,
} from "../controllers/checkoutController.js";
import { authUser } from "../middleware/authMiddleware.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/", authUser, createCheckout);
checkoutRouter.post("/:id/pay", authUser, updateSuccessfulCheckout);

export default checkoutRouter;
