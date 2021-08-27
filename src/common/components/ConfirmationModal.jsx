import React from "react";
import { useModal } from "../contexts/ModalContext";
import { useSelector } from "react-redux";

const logoutButtonStyle = `border border-brand px-4 py-2 rounded-full font-bold text-white bg-brand`;
const cancelButtonStyle = `border border-gray-900 bg-semi-transparent px-4 py-2 rounded-full font-bold`;
const deleteButtonStyle = `border border-red-500 bg-red-500 px-4 py-2 rounded-full font-bold`;

export const ConfirmationModal = () => {
  const { modalState, cancel } = useModal();
  const { buttonName, confirm, actionType } = modalState;
  const { deleteCommentStatus, removePostStatus } = useSelector(
    (state) => state.posts
  );

  let showLoader = false;

  if (actionType === "remove comment") {
    if (deleteCommentStatus === "loading") {
      showLoader = true;
    }
  }

  if (actionType === "remove post") {
    if (removePostStatus === "loading") {
      showLoader = true;
    }
  }

  return (
    <main className="h-screen bg-semi-transparent pt-24 w-full">
      <article className="bg-dark-3 w-9/12 h-250 md:w-300 m-auto py-6 px-2 rounded-2xl">
        <h1 className="text-2xl text-center mb-32">Are you sure?</h1>
        <div className="flex justify-between items-center px-6">
          <button className={cancelButtonStyle} onClick={cancel}>
            Cancel
          </button>
          <button
            className={
              buttonName.toLowerCase() === "delete"
                ? deleteButtonStyle
                : logoutButtonStyle
            }
            onClick={confirm}
          >
            {showLoader ? "Deleting..." : buttonName}
          </button>
        </div>
      </article>
    </main>
  );
};
