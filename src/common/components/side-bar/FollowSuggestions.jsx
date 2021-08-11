import React from "react";
import { useSearch } from "./useSearch";
import { UserExcerpt } from "../../../features/users/UserExcerpt";

export const FollowSuggestions = () => {
  const { followSuggestions } = useSearch();
  let renderFollowSuggestions;

  if (followSuggestions.length === 0) {
    renderFollowSuggestions = (
      <div className="flex-c text-text-gray">
        <p>No suggestions</p>
      </div>
    );
  }
  if (followSuggestions.length > 0) {
    renderFollowSuggestions = followSuggestions.map((user) => {
      console.log(user);
      return (
        <div key={user._id} className="border-b border-outline  bg-dark-3">
          <UserExcerpt user={user} />
        </div>
      );
    });
  }

  return <section>{renderFollowSuggestions}</section>;
};
