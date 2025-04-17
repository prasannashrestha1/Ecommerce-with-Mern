import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/UserRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import checkoutRouter from "./routes/checkoutRoute.js";
import orderRouter from "./routes/orderRoute.js";
import uploadRoutes from "./routes/uploadRoute.js";
import subscriberRoutes from "./routes/subscriberRoute.js";
import adminRouter from "./routes/adminRoute.js";
import productAdminRouter from "./routes/productAdminRoute.js";
import adminOrderRouter from "./routes/adminOrderRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to ecoommerce");
});
connectDB().then(
  app.listen(PORT, () => {
    console.log(`server running on  ${PORT}`);
  })
);

// api routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscriberRoutes);

// Admin
app.use("/api/admin/users", adminRouter);
app.use("/api/admin/products", productAdminRouter);
app.use("/api/admin/orders", adminOrderRouter);
