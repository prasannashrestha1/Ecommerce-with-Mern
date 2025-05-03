import bcrypt from "bcryptjs";
import userModal from "./../models/UserModal.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let isUser = await userModal.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are mandatory",
      });
    }
    if (password.length < 7) {
      return res.status(400).json({
        success: false,
        message: "Password should be greater than 7 letters long",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModal({ name, email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user._id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(201).json({
      token,
      success: true,
      message: "User has been created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are mandatory",
      });
    }
    const validUser = await userModal.findOne({ email });
    if (!validUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const comparePassword = await bcrypt.compare(password, validUser.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Credentials",
      });
    }
    const user = validUser;

    const payload = { user: { id: user._id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({
      token,
      success: true,
      message: "User has been created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  res.status(200).send(req.user);
};
