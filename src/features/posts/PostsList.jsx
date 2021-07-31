import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, NavDesktop, PageHeader } from "../../common/components";
import { PostExcerpt } from "./PostExcerpt";
import { fetchPosts, selectAllPosts } from "./postsSlice";
import { SideBar } from "../side-bar/SideBar";

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
      return <PostExcerpt key={post._id} post={post} />;
    });
  }

  return (
    <main className="max-w-1250 m-auto grid grid-cols-252">
      <NavDesktop />
      <section className="border border-outline border-t-0  border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        <PageHeader heading={"Home"} />
        {status === "loading" && <Loader />}
        {status === "succeeded" && renderPosts}
        {status === "failed" && <Error message={error} />}
      </section>
      <SideBar />
    </main>
  );
};
