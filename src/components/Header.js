import { Link, useOutletContext } from "react-router-dom";
import logo from "../images/logo.svg";

export default function Header() {
  const handleOpenMenu = () => {
    const navbar = document.querySelector(".navbar");
    const listItems = document.querySelectorAll("li");

    navbar.classList.toggle("open");
    listItems.forEach((listItem) => {
      listItem.addEventListener("click", () => {
        navbar.classList.remove("open");
      });
    });
  };

  const { isLoggedIn, logOutUser, user } = useOutletContext();

  return (
    <>
      <header className="fixed top-0 left-0 z-50 p-5 flex items-center justify-between w-full lg:py-0 bg-gradient-to-b from-gray-700 to-gray-900 bg-opacity-50">
        <div>
          <Link to="/">
            <img src={logo} alt="SpaceX" className="w-8 h-8 lg:w-auto" />
          </Link>
        </div>

        <nav className="navbar">
          <ul className="text-white mr-5 px-4 py-5">
            <li>
              <Link to="/crew">Crew</Link>
            </li>
            <li>
              <Link to="/launches">Launches</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          {!isLoggedIn && (
            <>
              <Link to="/login" className="text-white mr-5">
                Login
              </Link>
              <Link to="/signup" className="text-white mr-5">
                Sign Up
              </Link>
            </>
          )}
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-white mr-5">
                Welcome {user.name}
              </Link>
              <Link to="/" onClick={logOutUser} className="text-white mr-5">
                Logout
              </Link>
            </>
          ) : (
            <></>
          )}
          <div className="lg:hidden">
            <button
              onClick={handleOpenMenu}
              className="menu-button text-white uppercase text-sm tracking-wide"
            >
              Menu
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
