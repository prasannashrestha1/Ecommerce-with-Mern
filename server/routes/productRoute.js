import express from "express";
import authUser from "../middleware/authMiddleware.js";
import {
  createProduct,
  editProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/create-product", authUser, createProduct);
productRouter.post("/edit-product", authUser, editProduct);

export default productRouter;
