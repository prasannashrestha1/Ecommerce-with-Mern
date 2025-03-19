import express from "express";
import { authUser, admin } from "../middleware/authMiddleware.js";
import {
  createProduct,
  editProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", authUser, admin, createProduct);
productRouter.put("/:id", authUser, admin, editProduct);

export default productRouter;
