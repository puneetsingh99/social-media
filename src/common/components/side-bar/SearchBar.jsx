import React from "react";
import { useSearch } from "./useSearch";
import { RiSearch2Line } from "react-icons/ri";
import { UserExcerpt } from "../../../features/users/UserExcerpt";

export const SearchBar = () => {
  const { keyword, setKeyword, searchResult } = useSearch();

  let renderUsers;

  if (keyword.length > 0) {
    if (searchResult.length === 0) {
      renderUsers = (
        <div className="flex-c text-text-gray text-lg h-50">
          <p>No users found :(</p>
        </div>
      );
    } else {
      renderUsers = searchResult.map((user) => (
        <UserExcerpt key={user._id} user={user} />
      ));
    }
  }

  return (
    <>
      <div className="sticky top-0 bg-dark-3 px-4 md:pl-6 pt-2">
        <input
          className={`relative w-full bg-dark-2 py-2 px-4 pl-12 mb-2 rounded-full border-2 border-dark-2 focus:border-transparent focus:outline-none focus:ring-2 ring-brand ring-opacity-60`}
          value={keyword}
          type="text"
          placeholder={"Search people"}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <p className="text-text-gray absolute top-5 left-8 md:left-10">
          <RiSearch2Line size={20} />
        </p>
        {keyword !== "" && (
          <section className="absolute min-h-100 max-h-300 rounded-2xl py-2 shadow-md border border-outline overflow-scroll w-11/12 bg-dark-3">
            {renderUsers}
          </section>
        )}
      </div>
    </>
  );
};
