import React from "react";

export const PostExcerpt = ({ post }) => {
  const { author, content, image, video } = post;
  const { _id, firstname, lastname, username } = author;

  return (
    <article key={post._id} className="p-8">
      <h2 className="text-lg">{`${firstname} ${lastname}`}</h2>
      <small className="text-md ">{username}</small>
      <p className="text-2xl">{content}</p>
      {image && <img src={image} alt={`a post by ${username}`} />}
    </article>
  );
};
