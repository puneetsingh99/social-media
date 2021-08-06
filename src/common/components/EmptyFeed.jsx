import React from "react";
import emptyImage from "../../assets/empty_robo.png";

export const EmptyFeed = ({ message }) => {
  return (
    <section className="text-center text-xl font-normal text-text-gray">
      <img
        src={emptyImage}
        alt="shows that the feed is empty"
        className={"w-3/6 m-auto"}
      />
      <h1 className="sm:px-8">{message}</h1>
    </section>
  );
};
