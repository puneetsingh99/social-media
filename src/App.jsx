import React from "react";
import { useSelector } from "react-redux";

function App() {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <div className="App">
      <div className="text-4xl text-red">
        {posts.map((post) => {
          return <h1 key={post._id}>{post.content}</h1>;
        })}
      </div>
    </div>
  );
}

export default App;
