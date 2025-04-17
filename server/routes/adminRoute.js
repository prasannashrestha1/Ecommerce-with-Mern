import express from "express";
import { authUser, admin } from "../middleware/authMiddleware.js";
import {
  changeUserRole,
  createUser,
  deleteUser,
  getAllUsers,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/", authUser, admin, getAllUsers);
adminRouter.post("/", authUser, admin, createUser);
adminRouter.put("/:id", authUser, admin, changeUserRole);
adminRouter.delete("/:id", authUser, admin, deleteUser);

export default adminRouter;
