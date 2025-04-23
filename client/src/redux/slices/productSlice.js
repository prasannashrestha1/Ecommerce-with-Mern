import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  selectedProduct: null, //store the details of the single Product,
  similarProducts: [], //store similar products
  loading: false,
  error: null,
  filters: {
    category: "",
    size: "",
    gender: "",
    color: "",
    material: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    limit: "",
    collection: "",
  },
};

// async thunk to fetch products by collections and optional Filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilter",
  async (
    {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      category,
      material,
      brand,
      sortBy,
      search,
      limit,
    },
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams();
      if (collection) query.append("collection", collection);
      if (size) query.append("size", size);
      if (color) query.append("color", color);
      if (gender) query.append("gender", gender);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);
      if (category) query.append("category", category);
      if (material) query.append("material", material);
      if (brand) query.append("brand", brand);
      if (sortBy) query.append("sortBy", sortBy);
      if (search) query.append("search", search);
      if (limit) query.append("limit", limit);

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/product/filteredProduct?${query.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// async thunk to fetch a single product by id
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (productId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`
    );
    return response.data;
  }
);

// async thunk to update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);
// async thunk to fetch similar products
export const fetchSimilarProduct = createAsyncThunk(
  "products/fetchSimilarProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/product/getSimilarProduct/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        gender: "",
        color: "",
        material: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        limit: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    // handle fetching products with filter
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.filteredProduct;
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get similar products
      .addCase(fetchSimilarProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.similarProducts = action.payload.similarProduct;
      })
      .addCase(fetchSimilarProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // handle fetching single product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.selectedProduct = action.payload.product;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // handle updating single product details
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updateProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
