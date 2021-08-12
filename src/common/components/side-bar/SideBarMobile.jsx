import React from "react";
import { SearchBar } from "./SearchBar";
import { FollowSuggestions } from "./FollowSuggestions";
import { NavMobile } from "..";

export const SideBarMobile = () => {
  return (
    <>
      <aside className="md:hidden block sticky top-0  min-h-screen">
        <article>
          <div className="relative z-50 bg-dark-3 w-full p-2 mb-20">
            <SearchBar />
          </div>
          <div className="px-4">
            <div className="relative margin-top min-h-100 md:max-h-300 rounded-2xl  shadow-md border border-outline overflow-scroll">
              <div className="sticky top-0 z-30 bg-dark-2  px-4 py-2 border-b border-outline pb-2">
                <p className="text-xl font-bold">Who to follow</p>
              </div>
              <FollowSuggestions />
            </div>
          </div>
        </article>
      </aside>
      <section className="md:hidden bg-dark-3 border-t border-outline sticky bottom-0 z-10">
        <NavMobile />
      </section>
    </>
  );
};
