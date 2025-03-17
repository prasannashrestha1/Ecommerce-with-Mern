import express from "express";
import authUser from "../middleware/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/create-product", authUser, createProduct);

export default productRouter;
