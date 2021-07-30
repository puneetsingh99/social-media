import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader } from "../../common/components";
import { fetchPosts, selectAllPosts } from "./postsSlice";

export const PostsList = () => {
  const { posts, status, error } = useSelector(selectAllPosts);
  console.log({ posts, status, error });

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let renderPosts;

  if (status === "succeeded") {
    renderPosts = posts.map((post) => {
      return <article key={post._id}>{post.content}</article>;
    });
  }

  return (
    <main>
      <h1>Posts</h1>
      {status === "loading" && <Loader />}
      {status === "succeeded" && renderPosts}
      {status === "failed" && <Error message={error} />}
    </main>
  );
};
