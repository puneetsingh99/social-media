import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "./features/auth/login/LoginForm";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { SignupForm } from "./features/auth/signup/SignupForm";
import { Followers, User, NotificationsList } from "./features/users";
import { Post, PostsList } from "./features/posts";
import { SideBarMobile } from "./common/components/side-bar/SideBarMobile";
import { PageNotFound } from "./common/components";
import { ConfirmationModal } from "./common/components/ConfirmationModal";
import { useModal } from "./common/contexts/ModalContext";
import { useWindowSize } from "./common/hooks/useWindowSize";

function App() {
  const { modalState } = useModal();

  const [width] = useWindowSize();
  const renderSearchPage = width < 768;

  return (
    <main className="min-h-screen font-inter bg-dark-3 text-text-light">
      {modalState.showModal && (
        <div className="fixed z-40 w-full h-full">
          <ConfirmationModal />
        </div>
      )}
      <Routes>
        <PrivateRoute path="/" element={<PostsList />} />
        <PrivateRoute path="/post/:postId" element={<Post />} />
        <PrivateRoute path="/user/:userId" element={<User />} />
        <PrivateRoute
          path="/user/notifications"
          element={<NotificationsList />}
        />
        <PrivateRoute
          path="/search"
          element={
            renderSearchPage ? <SideBarMobile /> : <Navigate replace to="/" />
          }
        />

        <PrivateRoute
          path="/user/:userId/:followersOrFollowing"
          element={<Followers />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default App;
