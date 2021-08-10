import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, NavDesktop, PageHeader } from "../../common/components";
import { PostExcerpt } from "./PostExcerpt";
import { fetchPosts } from "./postsSlice";
import { SideBar } from "../../common/components/side-bar/SideBar";
import { AddPostForm } from "./AddPostForm";

export const PostsList = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.status === "idle") {
      dispatch(fetchPosts());
    }
  }, [posts.status, dispatch]);

  let renderPosts;

  if (posts.status === "succeeded") {
    const orderedPosts = posts.posts
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    renderPosts = orderedPosts.map((post) => {
      return <PostExcerpt key={post._id} post={post} />;
    });
  }

  return (
    <main className="max-w-1250 m-auto grid grid-cols-252">
      <NavDesktop />
      <section className="border border-outline border-t-0  border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        <div className="bg-dark-3 border-b border-outline sticky top-0 z-10">
          <PageHeader heading={"Home"} />
        </div>
        <AddPostForm />
        <div className="h-3 bg-dark-3-hover border-b border-outline"></div>
        {posts.status === "loading" && <Loader />}
        {posts.status === "succeeded" && renderPosts}
        {posts.status === "succeeded" && renderPosts.length === 0 && (
          <EmptyFeed message={"Such empty :("} />
        )}
        {posts.status === "failed" && <Error message={error} />}
      </section>
      <SideBar />
    </main>
  );
};
