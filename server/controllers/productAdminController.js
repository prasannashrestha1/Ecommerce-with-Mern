import productModal from "../models/ProductModal.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModal.find({});
    const productCount = products.length;
    return res.status(200).json({
      success: true,
      message: "Product Fetched Successfully",
      productCount,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  const { name, sizes, description, price, sku, colors, image } = req.body;
  try {
    let product = await productModal.findById(req.params.id);
    if (!product) {
      return res.status(200).json({
        success: false,
        message: "Product Not Found",
      });
    }
    product.name = name || product.name;
    product.sizes = sizes || product.sizes;
    product.description = description || product.description;
    product.price = price || product.price;
    product.colors = colors || product.colors;
    product.sku = sku || product.sku;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
