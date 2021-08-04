import React from "react";
import { PostsList } from "./features/posts/PostsList";
import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./features/auth/login/LoginForm";
import { PrivateRoute } from "./common/components/PrivateRoute";
import { SignupForm } from "./features/auth/signup/SignupForm";
import { User } from "./features/users";

function App() {
  return (
    <main className="min-h-screen font-inter bg-dark-3 text-text-light">
      <Routes>
        <PrivateRoute path="/" element={<PostsList />} />
        <PrivateRoute path="/user/:userId" element={<User />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </main>
  );
}

export default App;
