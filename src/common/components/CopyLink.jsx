import React from "react";
import { HiLink } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";

export const CopyLink = ({ linkCopied, setLinkCopied }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setLinkCopied(true);
      }}
      className={`bg-dark-3 rounded-full flex-c w-200 gap-2`}
    >
      <HiLink />
      <p>{linkCopied ? "Copied" : "Click to copy"}</p>
      {linkCopied && (
        <div className="text-green-500 flex-c">
          <BsCheckCircle />
        </div>
      )}
    </div>
  );
};
