import jwt from "jsonwebtoken";
import userModal from "../models/UserModal.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token expired! please login again to continue",
      });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModal
      .findById(verifyToken.user.id)
      .select("-password");
    next();
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
