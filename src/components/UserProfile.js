import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import userDefaultImage from "../assets/user.png";
import { useOutletContext } from "react-router-dom";

const UserProfile = ({ toggle }) => {
  const { user } = useOutletContext();
  const userImage =
    localStorage.getItem("userProfileImage") || userDefaultImage;

  useEffect(() => {
    if (!localStorage.getItem("userProfileImage")) {
      localStorage.setItem("userProfileImage", userImage);
    }
  }, [userImage]);

  // Add a check to make sure the user is logged in before accessing user object
  if (!user) {
    return null;
  }

  return (
    <div
      className={`flex gap-5 items-center ${
        toggle
          ? "bg-none transition-all duration-300 delay-200"
          : "bg-white rounded-xl p-2"
      }`}
    >
      <Link to="/profile">
        <div className="min-w-[3.5rem] h-[3.5rem]">
          <img
            src={userImage}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </Link>
      <div className={toggle ? "opacity-0 delay-200" : ""}>
        <h3 className="text-xl">{user.name}</h3>
        <span className="text-[0.75rem] opacity-60">{user.email}</span>
      </div>
    </div>
  );
};

export default UserProfile;
