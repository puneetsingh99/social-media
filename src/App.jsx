import React from "react";
import { PostsList } from "./features/posts/PostsList";
import { Routes, Route } from "react-router-dom";
import { LoginForm } from "./features/auth/LoginForm";
import { PrivateRoute } from "./common/components/PrivateRoute";

function App() {
  return (
    <main className="min-h-screen font-inter bg-dark-3 text-text-light">
      <Routes>
        <PrivateRoute path="/" element={<PostsList />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </main>
  );
}

export default App;
