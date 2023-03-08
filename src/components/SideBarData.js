import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { loggedOutLinks, loggedInLinks } from "../Data";
import { FaSignOutAlt } from "react-icons/fa";

const SidebarData = ({ toggle }) => {
  const { isLoggedIn, logOutUser } = useOutletContext();

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <div className="">
      {links.map((link) => {
        return (
          <div
            className={`${
              toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"
            } sidebar last:absolute left-4 bottom-4`}
            key={link.path}
          >
            {link.path === "/logout" ? (
              <Link to="/">
                <button
                  onClick={logOutUser}
                  className="text-white mr-5 cursor-pointer"
                >
                  <FaSignOutAlt className="text-brown text-[1.7rem]" />
                  <div
                    className={`${
                      toggle ? "opacity-0 delay-200" : ""
                    } text-[1rem] text-brown whitespace-pre text-left`}
                  >
                    {link.name}
                  </div>
                </button>
              </Link>
            ) : (
              <Link to={link.path}>
                <div className="mr-8 text-[1.7rem] text-brown">{link.icon}</div>
                <div
                  className={`${
                    toggle ? "opacity-0 delay-200" : ""
                  } text-[1rem] text-brown whitespace-pre`}
                >
                  {link.name}
                </div>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarData;
