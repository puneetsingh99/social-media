import React, { useRef, useEffect } from "react";
import { HiLink } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";

export const CopyLink = ({ linkCopied, setLinkCopied, postId }) => {
  const postLink = `https://growsocialmedia.netlify.app/post/${postId}`;
  const linkRef = useRef(null);

  useEffect(() => {
    if (linkCopied) {
      setTimeout(() => {
        setLinkCopied(false);
      }, 5000);
    }
  }, [linkCopied]);

  const copyLink = () => {
    linkRef.current.value = postLink;
    linkRef.current.select();
    document.execCommand("copy");
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setLinkCopied(true);
        copyLink();
      }}
      className={`bg-dark-3 rounded-full flex-c w-200 gap-2`}
    >
      <input
        type="text"
        ref={linkRef}
        className="absolute out-of-view w-1 border-none bg-dark-3 outline-none focus:outline-none"
      />
      <HiLink />
      <p>{linkCopied ? "Link copied" : "Click to copy link"}</p>
      {linkCopied && (
        <div className="text-green-500 flex-c">
          <BsCheckCircle />
        </div>
      )}
    </div>
  );
};
