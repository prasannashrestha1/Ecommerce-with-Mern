import express from "express";
import { getOrder, getUserOrders } from "../controllers/orderController.js";
import { authUser } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.get("/my-orders", authUser, getUserOrders);
orderRouter.get("/my-orders/:id", getOrder);

export default orderRouter;
