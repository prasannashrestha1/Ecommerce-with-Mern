import userModal from "../models/UserModal.js";

export const createUser = (req, res) => {
  const { email, name, password, role } = req.body;

  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
