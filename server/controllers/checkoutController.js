import orderModel from "./../models/Order.js";
import checkoutModal from "./../models/Checkout.js";
import cartModal from "./../models/CartModal.js";
import productModal from "./../models/ProductModal.js";

// creat a new checkout session
export const createCheckout = async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;
  if (!checkoutItems || checkoutItems.length === 0) {
    res.status(400).json({
      success: false,
      message:
        "Checkout Items is empty, Please select a certain item to checkout.",
    });
  }
  console.log("this i woo");
  try {
    // create a new checkout session.
    const newCheckout = await checkoutModal.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update checkout to mark as paid after successful payment.
export const updateSuccessfulCheckout = async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await checkoutModal.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found",
      });
    }
    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json({
        success: true,
        message: "Payment Successfull",
        checkout,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Payment Status",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// finalize checkout and convert to an order after payment confirmation
export const convertOrder = async (req, res) => {
  try {
    const checkout = await checkoutModal.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({
        success: false,
        message: "Checkout not found",
      });
    }
    if (!checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await orderModel.create({
        user: checkout.user,
        orderItems: checkout.orderItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      // mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      // Delete the cart asswociated with the user.
      await cartModal.findOneAndDelete({ user: checkout.user });
      res.status(201).json({
        success: true,
        message: "checkout updated",
        finalOrder,
      });
    } else if (checkout.isFinalized) {
      res
        .status(400)
        .json({ success: false, message: "checkout already finalized" });
    } else {
      res.status(400).json({
        success: false,
        message: "checkout not paid",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Order has not been paid",
    });
  } catch (error) {}
};
