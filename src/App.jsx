import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./features/auth/login/LoginForm";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { SignupForm } from "./features/auth/signup/SignupForm";
import { Followers, User, Notifications } from "./features/users";
import { Post, PostsList } from "./features/posts";

function App() {
  return (
    <main className="min-h-screen font-inter bg-dark-3 text-text-light">
      <Routes>
        <PrivateRoute path="/" element={<PostsList />} />
        <PrivateRoute path="/post/:postId" element={<Post />} />
        <PrivateRoute path="/user/:userId" element={<User />} />
        <PrivateRoute path="/user/notifications" element={<Notifications />} />

        <PrivateRoute
          path="/user/:userId/:followersOrFollowing"
          element={<Followers />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </main>
  );
}

export default App;
