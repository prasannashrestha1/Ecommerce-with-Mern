import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// retrieve user info and token from localstorage
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// check for an existing guest id in the localStorage or generate a new One
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// initial state
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "/auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.BACKEND_URL}/api/user/login`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", JSON.stringify(response.data.token));
      return response.data.user; // return user object from the response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const registerUser = createAsyncThunk(
  "/auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.BACKEND_URL}/api/user/login`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", JSON.stringify(response.data.token));
      return response.data.user; // return user object from the response
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date.now().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId); //set new guest id in local storage
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date.now().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
});
