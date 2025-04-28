import jwt from "jsonwebtoken";
import userModal from "../models/UserModal.js";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await userModal
        .findById(verifyToken.user.id)
        .select("-password");
      if (!req.user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// middleware to check if the uer is an admin

export const admin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized as an admin",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Not authorized",
    });
  }
};
