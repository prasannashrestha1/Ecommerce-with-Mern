import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);
