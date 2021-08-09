import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addCommentAPI,
  API_ALL_POSTS,
  deleteCommentAPI,
  getPostsByUserAPI,
  likePostAPI,
} from "../../api";

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

export const addPost = createAsyncThunk(
  "posts/addPost",
  async ({ post, token }, thunkAPI) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(API_ALL_POSTS, post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.savedPost;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, likedBy, token }, thunkAPI) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(likePostAPI(postId), { likedBy });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, madeBy, content, token }, thunkAPI) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(addCommentAPI(postId), {
        madeBy,
        content,
      });
      return response.data.updatedPost;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, commentId, token }, thunkAPI) => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(deleteCommentAPI(postId), {
        commentId,
      });
      return response.data.updatedPost;
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
  addPostStatus: "idle",
  addCommentStatus: "idle",
  postsByUser: [],
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      const { statusName, statusValue } = action.payload;
      state[statusName] = statusValue;
    },
    setAddPostStatus: (state, action) => {
      state.addPostStatus = action.payload;
    },
    setAddCommentStatus: (state, action) => {
      state.addCommentStatus = action.payload;
    },
  },
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
    [addPost.pending]: (state, action) => {
      state.addPostStatus = "loading";
    },
    [addPost.fulfilled]: (state, action) => {
      state.addPostStatus = "succeeded";
      state.posts.push(action.payload);
    },
    [addPost.rejected]: (state, action) => {
      state.addPostStatus = "failed";
      state.error = action.payload.message;
    },
    [addComment.pending]: (state, action) => {
      state.addCommentStatus = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      state.addCommentStatus = "succeeded";
      const postId = action.payload._id;
      const allPostsPostIndex = state.posts.findIndex(
        (post) => post._id === postId
      );
      const postsByUserIndex = state.postsByUser.findIndex(
        (post) => post._id === postId
      );

      if (allPostsPostIndex !== -1) {
        state.posts[allPostsPostIndex] = action.payload;
      }

      if (postsByUserIndex !== -1) {
        state.postsByUser[postsByUserIndex] = action.payload;
      }
    },
    [addComment.rejected]: (state, action) => {
      state.addCommentStatus = "failed";
      state.error = action.payload.message;
    },
    [deleteComment.fulfilled]: (state, action) => {
      const postId = action.payload._id;
      const allPostsPostIndex = state.posts.findIndex(
        (post) => post._id === postId
      );
      const postsByUserIndex = state.postsByUser.findIndex(
        (post) => post._id === postId
      );

      if (allPostsPostIndex !== -1) {
        state.posts[allPostsPostIndex] = action.payload;
      }

      if (postsByUserIndex !== -1) {
        state.postsByUser[postsByUserIndex] = action.payload;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const selectPostByUser = (state) => state.posts.postsByUser;
export const { setAddPostStatus, setStatus } = postsSlice.actions;
export default postsSlice.reducer;
