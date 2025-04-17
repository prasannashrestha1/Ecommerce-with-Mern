import express from "express";
import { admin, authUser } from "../middleware/authMiddleware.js";
import {
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get("/", authUser, admin, getAllOrders);
router.put("/:id", authUser, admin, updateOrderStatus);
router.delete("/:id", authUser, admin, deleteOrder);

export default router;
