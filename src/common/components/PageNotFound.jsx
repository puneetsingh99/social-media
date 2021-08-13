import React from "react";
import pageNotFound from "../../assets/page_not_found_robo.png";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <main className="md:w-3/6 m-auto">
      <div className="md:w-3/6 m-auto">
        <img src={pageNotFound} alt="404 page not found" />
        <h1 className="text-text-gray text-3xl text-center">
          404 Page not found
        </h1>
        <div className="flex-c py-4">
          <Link to="/" replace>
            <button className="border border-brand px-6 py-2 rounded-full font-bold text-white bg-brand">
              Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};
