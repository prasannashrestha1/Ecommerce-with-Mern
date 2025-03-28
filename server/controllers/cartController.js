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
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
