import React from "react";
import errorImg from "../../assets/error_robo.png";

export const Error = ({ message }) => {
  return (
    <article className="w-full flex flex-col justify-center items-center">
      <img src={errorImg} alt="error" className="sm:w-350 w-300" />
      <div className="px-8 py-2 rounded-2xl sm:w-350 w-300 text-center">
        <h1 className="text-2xl text-text-gray">{message}</h1>
      </div>
    </article>
  );
};
