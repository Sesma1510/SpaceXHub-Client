import React from "react";
import { Link } from "react-router-dom";
import user from "../assets/user.png";

const UserProfile = ({ toggle }) => {
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
            src={user}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </Link>
      <div className={toggle ? "opacity-0 delay-200" : ""}>
        <h3 className="text-xl">Sesma</h3>
        <span className="text-[0.75rem] opacity-60">sesma@gmail.com</span>
      </div>
    </div>
  );
};

export default UserProfile;
