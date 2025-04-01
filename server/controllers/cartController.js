import cartModal from "../models/CartModal.js";
import productModal from "../models/ProductModal.js";

// helper function to get a cart by user id or guestid
const getCart = async (userId, guestId) => {
  if (userId) {
    return await cartModal.findOne({ user: userId });
  } else if (guestId) {
    return await cartModal.findOne({ guestId });
  }
  return null;
};

export const addToCart = async (req, res) => {
  const { productId, quantity, size, color, userId, guestId } = req.body;
  try {
    const product = await productModal.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not found",
      });
    }
    let cart = await getCart(userId, guestId);
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );
      if (productIndex > -1) {
        // if the product already exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }
      //   calculate the total price
      cart.totalPrice = cart.products.reduce(
        (accumulator, item) => accumulator + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // create a new cart for the guest or user.
      const newCart = await cartModal.create({
        userId: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId, guestId } = req.query;
    const cart = await getCart(userId, guestId);
    if (cart) {
      return res.status(201).json({
        success: true,
        message: "Cart Fetched Successfully",
        cart,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No Cart Items found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const mergeCart = async (req, res) => {
  const { guestId } = req.body;
  try {
    const guestCart = await cartModal.findOne({ guestId });
    const userCart = await cartModal.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Guest Cart is empty",
        });
      }

      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId.toString() &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            // If the product exists in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            // Otherwise, add the guest item to the cart
            userCart.products.push(guestItem);
          }
        });

        // Recalculate total price
        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        await userCart.save();

        // Remove the guest cart after merging
        try {
          await cartModal.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart", error);
        }

        return res.status(200).json({
          success: true,
          message: "Cart Merged Successfully",
          userCart,
        });
      } else {
        // If the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;
        await guestCart.save();

        return res.status(200).json({
          success: true,
          message: "Cart Merged Successfully",
          guestCart,
        });
      }
    }

    return res.status(200).json({
      success: true,
      userCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
