import { FiUser, FiLogOut } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";

export const loggedInLinks = [
  {
    id: 1,
    icon: <AiFillHome />,
    path: "/",
    name: "Home",
  },
  {
    id: 2,
    icon: <AiFillStar />,
    path: "/favorites",
    name: "Favorites",
  },
  {
    id: 3,
    icon: <MdPeople />,
    path: "/crew",
    name: "Crew",
  },
  {
    id: 4,
    icon: <FaRocket />,
    path: "/launches",
    name: "Launches",
  },
  {
    id: 8,
    icon: <FiLogOut />,
    path: "/logout",
    name: "Logout",
  },
];

export const loggedOutLinks = [
  {
    id: 1,
    icon: <AiFillHome />,
    path: "/",
    name: "Home",
  },
  {
    id: 2,
    icon: <FiUser />,
    path: "/login",
    name: "Login",
  },
  {
    id: 3,
    icon: <FaUserPlus />,
    path: "/signup",
    name: "Sign Up",
  },
];
