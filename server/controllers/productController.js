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
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.discountPrice = discountPrice || product.discountPrice;
      product.category = product.category;
      product.sku = sku || product.sku;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.countInStock = countInStock || product.countInStock;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.brand = brand || product.brand;

      const updatedProduct = await product.save();
      return res.status(201).json({
        success: true,
        message: "Product edited successfully",
        product,
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

export const deleteProduct = async (req, res) => {
  try {
    await productModal.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// route to get all the the products with query filters

export const getFilteredProducts = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;
    let query = {};
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collection = collection;
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // fetch products and apply sorting
    const filteredProduct = await productModal.find(query);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const ProductId = req.params.id;
    const product = await productModal.findById(ProductId);
    if (product) {
      return res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSimilarProduct = async (req, res) => {
  try {
    const product = await productModal.findById(req.params.id);
    if (product) {
      const similarProduct = await productModal
        .find({
          // exclue the current product id
          _id: { $ne: id },
          gender: product.gender,
          category: product.category,
        })
        .limit(4);
      return res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        similarProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBestSellerProduct = async (req, res) => {
  try {
    const bestSeller = await productModal.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.status(200).json({
        success: true,
        message: "Best seller fetched successfully",
        bestSeller,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No best seller Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// retrive latest products from the creation date
export const getNewArrivals = async (req, res) => {
  try {
    // fetch latest 8 products
    const newArrivals = await productModal
      .find()
      .sort({ createdAt: -1 })
      .limit(8);
    if (newArrivals) {
      res.status(200).json({
        success: true,
        message: "New arrivals fetched successfully",
        newArrivals,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No new arrivals found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
