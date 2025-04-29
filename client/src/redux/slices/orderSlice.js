import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userId = JSON.parse(localStorage.getItem("userToken"));
// async thunk to fetch user orders
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

// async thunk to fetch all user orders
export const fetchAllUserOrders = createAsyncThunk(
  "orders/fetchAllUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("userToken")
            )}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // case for fetching all orders
      .addCase(fetchAllUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.orders.length;
      })
      .addCase(fetchAllUserOrders.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      })
      //   case for fetching one order details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload.order;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload.message;
      });
  },
});

export default orderSlice.reducer;
