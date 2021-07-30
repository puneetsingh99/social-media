import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  posts: [
    { _id: "12", content: "first post" },
    { _id: "23", content: "second post" },
    { _id: "45", content: "third post" },
  ],
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
