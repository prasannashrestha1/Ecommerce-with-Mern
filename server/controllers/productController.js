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
    brand,
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
      brand,
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
      message: error.message,
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
    brand,
  } = req.body;
  try {
    if (!name || !price || !description || !sku || !sizes || !colors) {
      return res.status(401).json({
        success: false,
        message: "Please fill in all the product details",
      });
    }
    const product = await productModal.findById(req.params.id);

    if (product && req.user._id === product.user) {
      // product.name = name || product.name;
      // product.price = price || product.price;
      // product.description = description || product.description;
      // product.discountPrice = discountPrice || product.discountPrice;
      // product.countInStock = countInStock || product.countInStock;
      // product.category = category || product.category;
      // product.brand = brand || product.brand;
      // product.name = name || product.name;
      // product.name = name || product.name;

      await productModal.findByIdAndUpdate(req.params.id, {
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
        brand,
      });
      return res.status(201).json({
        success: true,
        message: "Product edited successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
