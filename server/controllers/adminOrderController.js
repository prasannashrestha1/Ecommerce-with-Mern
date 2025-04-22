import { trusted } from "mongoose";
import orderModel from "../models/Order.js";

export const getAllOrders = async (req, res) => {
  try {
    const order = await orderModel.find({}).populate("User", "name email");
    return res.status(200).json({
      success: true,
      message: "All Orders Fetched Successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { status, isDelivered } = req.body;
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email");
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }
    // change the status
    order.status = status || order.status;
    // if the the status is delivered changed the status
    if (status === "Delivered") {
      order.isDelivered = true || order.isDelivered;
      order.deliveredAt = Date.now();
    }
    if (isDelivered) {
      order.status = "Delivered" || order.status;
      order.isDelivered = true || order.isDelivered;
      order.deliveredAt = Date.now();
    }
    order.save();
    return res.status(200).json({
      success: true,
      message: "Product Updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Order Deleted Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Such order found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
