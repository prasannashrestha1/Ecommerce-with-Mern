import mongoose from "mongoose";
import { dotenv } from "dotenv";
import productModal from "./models/ProductModal.js";
import userModal from "./models/UserModal.js";
import products from "./Data/products.js";
import cartModal from "./models/CartModal.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // clear existing data
    await productModal.deleteMany();
    await userModal.deleteMany();
    await cartModal.deleteMany();

    // create a default admin user
    const createdUser = await userModal.create({
      name: "Admin",
      password: "Admin123",
      email: "admin@admin.com",
      role: "admin",
    });
    // assign default admin to the product
    const userId = createdUser._id;
    const sampleProducts = products.map((products) => {
      return { ...products, user: userId };
    });
    // insert products to the database
    await productModal.insertMany(sampleProducts);
    console.log("Product data seeded successfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedData();
