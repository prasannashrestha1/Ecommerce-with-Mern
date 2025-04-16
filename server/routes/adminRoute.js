import express from "express";
import userModal from "../models/UserModal.js";
import { authUser, admin } from "../middleware/authMiddleware.js";
import { createUser } from "../controllers/adminController.js";

const adminRouter = express.Router();

router.post("/create-user", authUser, admin, createUser);
