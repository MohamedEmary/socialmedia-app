import { authState, loginData, signupData } from "@/app/types/auth.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: authState = {
  userData: null,
  userToken: null,
  isError: false,
  isLoading: false,
};

export const login = createAsyncThunk(
  "auth/login",

  (data: loginData) => {
    const config = {
      method: "post",
      url: "https://linked-posts.routemisr.com/users/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => error);
  }
);

export const signup = createAsyncThunk(
  "auth/signup",

  (data: signupData) => {
    const config = {
      method: "post",
      url: "https://linked-posts.routemisr.com/users/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => error);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearUserData: (prev) => {
      prev.userData = null;
      prev.userToken = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.userToken = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    // =====================================

    builder.addCase(signup.fulfilled, (state) => {
      state.isError = false;
      state.isLoading = false;
    });
    builder.addCase(signup.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(signup.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
