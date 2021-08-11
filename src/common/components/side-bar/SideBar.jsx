import React from "react";
import { SearchBar } from "./SearchBar";
import { FollowSuggestions } from "./FollowSuggestions";

export const SideBar = () => {
  return (
    <aside className="sticky top-0">
      <article>
        <SearchBar />
        <div className="px-4">
          <div className="relative margin-top min-h-100 max-h-300 rounded-2xl  shadow-md border border-outline overflow-scroll">
            <div className="sticky top-0 z-30 bg-dark-3  px-4 py-2 border-b border-outline pb-2">
              <p className="text-xl font-bold">Who to Follow</p>
            </div>
            <FollowSuggestions />
          </div>
        </div>
      </article>
    </aside>
  );
};
