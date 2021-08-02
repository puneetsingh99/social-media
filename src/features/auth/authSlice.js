import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_LOGIN } from "../../api";
import { persistAuthState } from "./utils/persistAuthState";

const authReset = {
  isUserLoggedIn: false,
  userId: "",
  token: "",
};

export const loginWithCredentials = createAsyncThunk(
  "auth/loginWithCredentials",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(API_LOGIN, credentials);
      return response.data.user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: "idle",
  auth: persistAuthState(),
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem("socialMediaLogin");
      state.status = "idle";
      state.auth = authReset;
      state.error = null;
    },
  },
  extraReducers: {
    [loginWithCredentials.pending]: (state) => {
      state.status = "loading";
    },
    [loginWithCredentials.fulfilled]: (state, action) => {
      const { userId, token } = action.payload;
      state.status = "succeeded";

      const updatedLoginStatus = { isUserLoggedIn: true, userId, token };

      state.auth = updatedLoginStatus;
      window.localStorage.setItem(
        "socialMediaLogin",
        JSON.stringify(updatedLoginStatus)
      );
    },
    [loginWithCredentials.rejected]: (state, action) => {
      console.log(action.payload);
      state.status = "failed";
      state.auth = authReset;
      state.error = action.payload.message;
    },
  },
});

export const { logout, validateForm } = authSlice.actions;

export default authSlice.reducer;
