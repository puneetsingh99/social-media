import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Error,
  Loader,
  NavDesktop,
  NavMobile,
  PageHeader,
} from "../../common/components";
import { PostExcerpt } from "./PostExcerpt";
import { fetchPosts } from "./postsSlice";
import { SideBar } from "../../common/components/side-bar/SideBar";
import { AddPostForm } from "./AddPostForm";
import { HomePageHeader } from "../../common/components/HomePageHeader";
import { HamburgerMenu } from "../../common/components/HamburgerMenu";

export const PostsList = () => {
  const posts = useSelector((state) => state.posts);
  const { loggedInUser } = useSelector((state) => state.auth);
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

  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  return (
    <main className="w-full m-auto md:max-w-1250 md:grid md:grid-cols-252">
      <NavDesktop />
      <section className="md:border md:border-outline md:border-t-0  md:border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        <div className="bg-dark-3 border-b border-outline sticky top-0 z-10">
          <div className="hidden md:block">
            <PageHeader heading={"Home"} />
          </div>
          <HomePageHeader setShowHamburgerMenu={setShowHamburgerMenu} />
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
      <section className="md:hidden bg-dark-3 border-t border-outline sticky bottom-0 z-10">
        <NavMobile />
      </section>
      {loggedInUser && (
        <section
          className={`flex fixed inset-0 z-20 hamburger ${
            showHamburgerMenu && "show-hamburger"
          }`}
        >
          <article className={`w-full bg-dark-3`}>
            <HamburgerMenu setShowHamburgerMenu={setShowHamburgerMenu} />
          </article>

          <aside
            onClick={() => setShowHamburgerMenu(false)}
            className={`w-1/6 h-screen`}
          ></aside>
        </section>
      )}

      <SideBar />
    </main>
  );
};
