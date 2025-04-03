import express from "express";
import {
  createCheckout,
  updateSuccessfulCheckout,
} from "../controllers/checkoutController.js";
import { authUser } from "../middleware/authMiddleware.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/", authUser, createCheckout);
checkoutRouter.put("/:id/pay", authUser, updateSuccessfulCheckout);
checkoutRouter.post("/:id/finalize", authUser, updateSuccessfulCheckout);

export default checkoutRouter;
