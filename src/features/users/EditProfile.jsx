import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "../../common/components";
import { CgClose } from "react-icons/cg";
import { BiImageAdd } from "react-icons/bi";
import { useEditProfile } from "./hooks/use-edit-profile/useEditProfile";
import { setEditProfileStatus } from "../auth/authSlice";

export const EditProfile = ({ setShowEditProfile, user }) => {
  const dispatch = useDispatch();
  const { editProfileStatus } = useSelector((state) => state.auth);
  const { editProfile, editProfileDispatch, saveButtonClicked } =
    useEditProfile(user);
  const {
    firstname,
    lastname,
    coverPic,
    profilePic,
    bio,
    newProfilePic,
    newCoverPic,
  } = editProfile;
  const profilePicRef = useRef(null);
  const coverPicRef = useRef(null);

  useEffect(() => {
    if (editProfileStatus === "succeeded") {
      dispatch(setEditProfileStatus("idle"));
      setShowEditProfile(false);
    }
  }, [editProfileStatus]);

  const loading = editProfileStatus === "loading";

  return (
    <main className="m-auto z-30 fixed inset-0  bg-semi-transparent flex justify-center items-center">
      <section className="w-550 bg-dark-3 overflow-hidden rounded-2xl h-5/6 m-auto">
        <div className="p-2 border-b border-b-outline text-brand cursor-pointer flex justify-between">
          <div
            onClick={() => setShowEditProfile(false)}
            className="transparent-brand w-max rounded-full p-2"
          >
            <CgClose size={22} />
          </div>
          <button
            disabled={loading}
            onClick={saveButtonClicked}
            className={`border border-brand px-4 py-1 rounded-full font-bold text-white bg-brand ${
              loading && "cursor-wait"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="relative">
          <div className="h-200 overflow-hidden cursor-pointer">
            <img src={coverPic} alt="cover" className="w-full" />
            <div
              onClick={() => coverPicRef.current.click()}
              className={"absolute inset-0 bg-semi-transparent flex-c"}
            >
              <div className="flex flex-col justify-center items-center">
                <BiImageAdd size={35} />
                {newCoverPic && <p>{newCoverPic.name}</p>}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={coverPicRef}
              onChange={(e) =>
                editProfileDispatch({
                  type: "SET_COVER_PIC",
                  payload: e.target.files[0],
                })
              }
            />
          </div>
          <div
            className={`absolute top-32 left-30 ml-4 border-4 border-dark-3 rounded-full cursor-pointer`}
          >
            <Avatar img={profilePic} size={`2xl`} />
            <div
              onClick={() => profilePicRef.current.click()}
              className={
                "absolute inset-0 rounded-full bg-semi-transparent flex-c"
              }
            >
              <div className="flex flex-col justify-center items-center">
                <BiImageAdd size={30} />
                {newProfilePic && <p>{"pic selected"}</p>}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={profilePicRef}
              onChange={(e) =>
                editProfileDispatch({
                  type: "SET_PROFILE_PIC",
                  payload: e.target.files[0],
                })
              }
            />
          </div>
        </div>
        <div className="px-4">
          <div className="flex mt-20 gap-4">
            <input
              type="text"
              value={firstname}
              onChange={(e) =>
                editProfileDispatch({
                  type: "SET_FIRST_NAME",
                  payload: { firstname: e.target.value },
                })
              }
              className="w-full bg-dark-3  px-2 py-3  mb-6 rounded-md border-2 border-outline focus:border-transparent focus:outline-none focus:ring-2 ring-brand ring-opacity-60"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) =>
                editProfileDispatch({
                  type: "SET_LAST_NAME",
                  payload: { lastname: e.target.value },
                })
              }
              className="w-full bg-dark-3  px-2 py-3  mb-6 rounded-md border-2 border-outline focus:border-transparent focus:outline-none focus:ring-2 ring-brand ring-opacity-60"
            />
          </div>
          <textarea
            type="text"
            value={bio}
            onChange={(e) =>
              editProfileDispatch({
                type: "SET_BIO",
                payload: { bio: e.target.value },
              })
            }
            className="w-full bg-dark-3  px-2 py-3  mb-6 rounded-md border-2 border-outline focus:border-transparent focus:outline-none focus:ring-2 ring-brand ring-opacity-60"
          />
        </div>
      </section>
    </main>
  );
};
