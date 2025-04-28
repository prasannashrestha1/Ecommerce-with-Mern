import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

// async thunk tot create a checkout session
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        checkoutData,
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
      rejectWithValue(error.response.data);
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCheckout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCheckout.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.checkout = action.payload;
    });
    builder.addCase(createCheckout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default checkoutSlice.reducer;
