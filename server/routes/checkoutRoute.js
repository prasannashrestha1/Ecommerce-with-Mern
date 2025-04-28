import express from "express";
import {
  convertOrder,
  createCheckout,
  newCreateCheckout,
  updateSuccessfulCheckout,
} from "../controllers/checkoutController.js";
import { authUser } from "../middleware/authMiddleware.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/", authUser, newCreateCheckout);
// checkoutRouter.post("/", authUser, createCheckout);
checkoutRouter.put("/:id/pay", authUser, updateSuccessfulCheckout);
checkoutRouter.post("/:id/finalize", authUser, convertOrder);

export default checkoutRouter;
