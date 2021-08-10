import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader, NavDesktop, PageHeader } from "../../common/components";
import { fetchPost } from "./postsSlice";
import { SideBar } from "../../common/components/side-bar/SideBar";
import { useParams, useNavigate } from "react-router";
import { PostDetail } from "./PostDetail";
import { IoIosArrowRoundBack } from "react-icons/io";

export const Post = () => {
  const { token } = useSelector((state) => state.auth.auth);
  const { post, fetchPostStatus, error } = useSelector((state) => state.posts);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPost({ postId, token }));
  }, [postId]);

  return (
    <main className="max-w-1250 m-auto grid grid-cols-252">
      <NavDesktop />
      <section className="border border-outline border-t-0  border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        <div className="flex items-center border-b border-outline px-3  sticky z-30 top-0 bg-dark-3">
          <div
            onClick={() => navigate(-1)}
            className="p-1 rounded-full transparent-blue cursor-pointer text-brand mr-3"
          >
            <IoIosArrowRoundBack size={30} />
          </div>

          <PageHeader heading={`Post`} />
        </div>
        {fetchPostStatus === "loading" && <Loader />}
        {fetchPostStatus === "succeeded" && <PostDetail post={post} />}
        {fetchPostStatus === "failed" && <Error message={error} />}
      </section>
      <SideBar />
    </main>
  );
};
