import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Error,
  Loader,
  NavDesktop,
  NavMobile,
  PageHeader,
} from "../../common/components";
import { fetchPost } from "./postsSlice";
import { SideBar } from "../../common/components/side-bar/SideBar";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { PostDetail } from "./PostDetail";
import { IoIosArrowRoundBack } from "react-icons/io";
import { setStatus } from "./postsSlice";
import { useModal } from "../../common/contexts/ModalContext";

export const Post = () => {
  const { token } = useSelector((state) => state.auth.auth);
  const { fetchPostStatus, error, removePostStatus, post } = useSelector(
    (state) => state.posts
  );
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPost({ postId, token }));
  }, [postId]);

  const { cancel } = useModal();

  useEffect(() => {
    if (removePostStatus === "succeeded") {
      navigate("/");
      dispatch(setStatus({ name: "removePostStatus", value: "idle" }));
      cancel();
    }
  }, [removePostStatus]);

  let renderPost;

  if (fetchPostStatus === "succeeded") {
    renderPost = post && <PostDetail />;
  }

  return (
    <main className="w-full m-auto md:max-w-1250 md:grid md:grid-cols-252">
      <NavDesktop />
      <section className="md:border md:border-outline md:border-t-0  md:border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        <div className="flex items-center border-b border-outline px-3  sticky z-30 top-0 bg-dark-3">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="p-2 md:p-1 rounded-full transparent-blue cursor-pointer text-brand md:mr-3"
          >
            <IoIosArrowRoundBack size={30} />
          </div>

          <PageHeader heading={`Post`} />
        </div>
        {fetchPostStatus === "loading" && <Loader />}

        {fetchPostStatus === "succeeded" && renderPost}

        {fetchPostStatus === "failed" && <Error message={error} />}
      </section>
      <section className="md:hidden bg-dark-3 border-t border-outline sticky bottom-0 z-10">
        <NavMobile />
      </section>
      <SideBar />
    </main>
  );
};
