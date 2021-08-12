import React from "react";
import { SearchBar } from "./SearchBar";
import { FollowSuggestions } from "./FollowSuggestions";
import { useSelector } from "react-redux";

export const SideBar = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  return (
    <aside className="hidden sm:block sticky top-0 ml-6">
      <article>
        <div className="relative z-50 bg-dark-3 w-full">
          {loggedInUser && <SearchBar />}
        </div>
        <div className="px-4">
          <div className="relative margin-top min-h-100 max-h-350 rounded-2xl  shadow-md border border-outline overflow-scroll">
            <div className="sticky top-0 z-30 bg-dark-2  px-4 py-2 border-b border-outline pb-2">
              <p className="text-xl font-bold">Who to follow</p>
            </div>
            {loggedInUser && <FollowSuggestions />}
          </div>
        </div>
      </article>
    </aside>
  );
};
