import userModal from "../models/UserModal.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModal.find({});
    return res.status(200).json({
      success: false,
      message: "users fetched successfully",
      allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { email, name, password, role } = req.body;

  try {
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields are mandatory.",
      });
    }
    let user = await userModal.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please add a new email address",
      });
    }
    user = await userModal.create({
      email,
      name,
      password,
      role: role || "customer",
    });
    res.status(200).json({
      success: false,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    let user = await userModal.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const updatedUser = await userModal.findByIdAndUpdate(id, { role });
    return res.status(200).json({
      success: false,
      message: "Role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModal.findById(id);
    if (user) {
      await userModal.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
