import express from "express";
import { admin, authUser } from "../middleware/authMiddleware.js";
import { getAllOrders } from "../controllers/adminOrderController.js";

const router = express.Router();

router.post("/", authUser, admin, getAllOrders);

export default router;
