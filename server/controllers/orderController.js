import orderModel from "./../models/Order.js";

export const getUserOrders = async (req, res) => {
  try {
    // find orders for the authenticated user
    const orders = await orderModel
      .find({ user: req.user._id })
      .sort({ createdAt: -1 }); //sort by most recent orderss
    return res.status(200).json({
      success: true,
      message: "Orders Fetched Successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get Order details by id
export const getOrder = async (req, res) => {
  try {
    // find orders for the authenticated user
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Orders Fetched Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};
