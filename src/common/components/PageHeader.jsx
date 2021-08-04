import React from "react";

export const PageHeader = ({ heading, subHeading }) => {
  return (
    <header className={`${subHeading ? "p-1" : "p-4"}`}>
      <h1 className="text-xl font-extrabold">{heading}</h1>
      {subHeading && <p className="text-text-gray text-sm">{subHeading}</p>}
    </header>
  );
};
