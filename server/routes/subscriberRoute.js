import express from "express";
import subscriberModel from "../models/Subscriber.js";

const router = express.Router();

// router post api/subscribe
// handles newsletter subscription @acess public
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }
  try {
    // check if the email is already subscribed
    let subscriber = await subscriberModel.findOne({ email });
    if (subscriber) {
      return res.status(400).json({
        success: false,
        message: "Email is already subscribed",
      });
    }
    // create a new subscriber
    subscriber = subscriberModel.create({ email });
    return res.status(201).json({
      success: true,
      message: "Email has been subscribed successfully",
      subscriber,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
