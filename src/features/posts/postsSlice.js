import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ALL_POSTS, getPostsByUserAPI } from "../../api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(API_ALL_POSTS);
  return response.data.posts;
});

export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchPostsByUser",
  async ({ userId, token }, thunkAPI) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.get(getPostsByUserAPI(userId));
      return response.data.posts;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  status: "idle",
  posts: [],
  postsByUserStatus: "idle",
  postsByUser: [],
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchPostsByUser.pending]: (state) => {
      state.postsByUserStatus = "loading";
    },
    [fetchPostsByUser.fulfilled]: (state, action) => {
      state.postsByUserStatus = "succeeded";
      state.postsByUser = action.payload;
    },
    [fetchPostsByUser.rejected]: (state, action) => {
      state.postsByUserStatus = "failed";
      state.error = action.error.message;
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const selectPostByUser = (state) => state.posts.postsByUser;

export default postsSlice.reducer;
