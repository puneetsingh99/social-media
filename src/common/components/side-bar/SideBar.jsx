import React from "react";
import { SearchBar } from "./SearchBar";

export const SideBar = () => {
  return (
    <aside className="sticky top-0">
      <article>
        <SearchBar />
      </article>
    </aside>
  );
};
