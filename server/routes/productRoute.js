import express from "express";
import { authUser, admin } from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getBestSellerProduct,
  getFilteredProducts,
  getNewArrivals,
  getProduct,
  getSimilarProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", authUser, admin, createProduct);

productRouter.put("/edit-product/:id", authUser, admin, editProduct);

productRouter.delete("/delete-product/:id", authUser, admin, deleteProduct);

productRouter.get("/getProduct/:id", getProduct);

productRouter.get("/getSimilarProduct/:id", getSimilarProduct);

productRouter.get("/best-seller/:id", getBestSellerProduct);
productRouter.get("/best-seller/:id", getNewArrivals);
productRouter.get("/filteredProduct", getFilteredProducts);

export default productRouter;
