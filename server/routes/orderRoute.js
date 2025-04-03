import express from "express";
import { getOrder, getUserOrders } from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.get("/my-orders", getUserOrders);
orderRouter.get("/my-orders/:id", getOrder);

export default orderRouter;
