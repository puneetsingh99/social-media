import React from "react";
import { PostsList } from "./features/posts/PostsList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="min-h-screen font-inter bg-dark-3 text-text-light">
      <Routes>
        <Route path="/" element={<PostsList />} />
      </Routes>
    </main>
  );
}

export default App;
