import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./usersSlice";
import { fetchPostsByUser } from "../posts/postsSlice";
import {
  NavDesktop,
  NavMobile,
  SideBar,
  PageHeader,
  Loader,
  Error,
  EmptyFeed,
} from "../../common/components";
import { PostExcerpt } from "../posts/PostExcerpt";
import { IoIosArrowRoundBack } from "react-icons/io";
import { UserDetails } from "./UserDetails";

export const User = () => {
  const { userId } = useParams();
  const { auth, editProfileStatus } = useSelector((state) => state.auth);
  const { token } = auth;
  const userState = useSelector((state) => state.users);

  const postState = useSelector((state) => state.posts);

  const { postsByUser, postsByUserStatus } = postState;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser({ userId, token }));
    dispatch(fetchPostsByUser({ userId, token }));
  }, [userId]);

  useEffect(() => {
    if (editProfileStatus === "succeeded") {
      dispatch(fetchUser({ userId, token }));
    }
  }, [editProfileStatus]);

  let renderPosts;
  if (postsByUserStatus === "succeeded") {
    const orderedPosts = postsByUser
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    renderPosts = orderedPosts.map((post) => {
      return <PostExcerpt key={post._id} post={post} />;
    });
  }

  return (
    <main className="w-full m-auto md:max-w-1250 md:grid md:grid-cols-252">
      <NavDesktop />
      <section className="md:border md:border-outline md:border-t-0  md:border-b-0 h-screen pb-8 overflow-scroll hide-scrollbar">
        {userState.user ? (
          <div>
            <div className="flex items-center border-b border-outline px-3  sticky z-30 top-0 bg-dark-3">
              <div
                onClick={() => navigate(-1)}
                className="p-1 rounded-full transparent-blue cursor-pointer text-brand mr-3 md:mr-6"
              >
                <IoIosArrowRoundBack size={30} />
              </div>

              <PageHeader
                heading={`${userState.user.firstname} ${userState.user.lastname}`}
                subHeading={`${postState.postsByUser.length} Posts`}
              />
            </div>
            <div className="pb-4">{<UserDetails user={userState.user} />}</div>
            <div className="border-b border-outline">
              <div className="px-4">
                <p className="  py-3 text-brand font-bold border-b-4 border-brand w-max">
                  Posts
                </p>
              </div>
            </div>

            {postsByUserStatus === "loading" && <Loader />}
            {postsByUserStatus === "succeeded" && renderPosts}
            {postsByUserStatus === "succeeded" && renderPosts.length === 0 && (
              <EmptyFeed message={"No posts :("} />
            )}
            {postsByUserStatus === "failed" && <Error message={error} />}
          </div>
        ) : (
          <Loader />
        )}
      </section>
      <section className="md:hidden bg-dark-3 border-t border-outline sticky bottom-0 z-10">
        <NavMobile />
      </section>
      <SideBar />
    </main>
  );
};
