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
productRouter.get("/getSimilarProduct/:id", getSimilarProduct);

productRouter.get("/best-seller", getBestSellerProduct);
productRouter.get("/new-arrivals", getNewArrivals);
productRouter.get("/filteredProduct", getFilteredProducts);

productRouter.put("/:id", authUser, admin, editProduct);

productRouter.delete("/:id", authUser, admin, deleteProduct);

productRouter.get("/:id", getProduct);

export default productRouter;
