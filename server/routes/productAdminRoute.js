import express from "express";
import { admin, authUser } from "../middleware/authMiddleware.js";
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productAdminController.js";

const router = express.Router();

router.get("/", authUser, admin, getAllProducts);
router.put("/:id", authUser, admin, updateProduct);
router.delete("/:id", authUser, admin, deleteProduct);

export default router;
