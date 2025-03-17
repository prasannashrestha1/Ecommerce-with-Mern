import productModal from "../models/ProductModal.js";

export const createProduct = async (req, res, next) => {
  const {
    name,
    price,
    description,
    discountPrice,
    category,
    sku,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimensions,
    weight,
    countInStock,
    sizes,
    colors,
  } = req.body;
  try {
    if (!name || !price || !description || !sku || !sizes || !colors) {
      return res.status(401).json({
        success: false,
        message: "Please fill in all the product details",
      });
    }
    const product = new productModal({
      name,
      price,
      description,
      discountPrice,
      category,
      sku,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      countInStock,
      sizes,
      colors,
      user: req.user._id,
    });
    const createdProduct = await product.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      createdProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const editProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    discountPrice,
    category,
    sku,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimensions,
    weight,
    countInStock,
    sizes,
    colors,
  } = req.body;
  try {
    if (!name || !price || !description || !sku || !sizes || !colors) {
      return res.status(401).json({
        success: false,
        message: "Please fill in all the product details",
      });
    }
    const newProduct = new productModal({
      name,
      price,
      description,
      discountPrice,
      category,
      sku,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      countInStock,
      sizes,
      colors,
    });
    await newProduct.save();
    return res.status(201).json({
      success: true,
      message: "Product edited successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
