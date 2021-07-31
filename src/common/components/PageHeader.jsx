import React from "react";

export const PageHeader = ({ heading }) => {
  return (
    <header className="bg-dark-3 sticky top-0 border-b border-outline p-4">
      <h1 className="text-xl font-extrabold">{heading}</h1>
    </header>
  );
};
