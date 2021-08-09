import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ALL_USERS, getUserAPI, updateFollowersAPI } from "../../api";

const initialState = {
  status: "idle",
  allUsers: [],
  user: null,
  error: null,
};

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_ALL_USERS);
      return response.data.users;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async ({ userId, token }, thunkAPI) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(getUserAPI(userId));
      return response.data.user;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateFollowers = createAsyncThunk(
  "users/updateFollowers",
  async ({ userId, loggedInUserId, token }, thunkAPI) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(updateFollowersAPI(userId), {
        loggedInUserId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const onFollowButtonClicked = createAsyncThunk(
  "users/updateFollowers",
  async ({ userId, loggedInUserId, token }, thunkAPI) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(updateFollowersAPI(userId), {
        loggedInUserId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.allUsers = action.payload;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    [fetchUser.pending]: (state) => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
    [updateFollowers.fulfilled]: (state, action) => {
      const { updatedLoggedInUser, updatedUser } = action.payload;

      const loggedInUserIndex = state.allUsers.findIndex(
        (user) => user._id === updatedLoggedInUser._id
      );

      const updatedUserIndex = state.allUsers.findIndex(
        (user) => user._id === updatedUser._id
      );

      state.allUsers[loggedInUserIndex] = updatedLoggedInUser;
      state.allUsers[updatedUserIndex] = updatedUser;
      state.user = action.payload.updatedUser;
    },

    [onFollowButtonClicked.fulfilled]: (state, action) => {
      const { updatedLoggedInUser, updatedUser } = action.payload;

      const loggedInUserIndex = state.allUsers.findIndex(
        (user) => user._id === updatedLoggedInUser._id
      );

      const updatedUserIndex = state.allUsers.findIndex(
        (user) => user._id === updatedUser._id
      );

      state.allUsers[loggedInUserIndex] = updatedLoggedInUser;
      state.allUsers[updatedUserIndex] = updatedUser;
    },
  },
});

export const selectAllUsers = (state) => state.users.allUsers;
export const selectUser = (state) => state.users.user;
export const selectUserById = (state, userId) =>
  state.users.allUsers.find((user) => user._id === userId);

export default usersSlice.reducer;
