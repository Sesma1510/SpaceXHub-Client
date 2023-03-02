import { createBrowserRouter } from "react-router-dom";

// Pages
import Root from "./pages/Root/Root";
import SignupPage, { signupPageAction } from "./pages/SignupPage/SignupPage";
import LoginPage, { loginPageAction } from "./pages/LoginPage/LoginPage";
import IsAnon from "./components/IsAnon/IsAnon";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        // Colocar aca las carpetas de memes
        path: "/",
        element: (
          <>
            <Navbar />
            <HomePage />,
          </>
        ),
      },
      {
        path: "profile",
        element: (
          <IsPrivate>
            <Navbar />
            <ProfilePage />,
          </IsPrivate>
        ),
      },
      {
        path: "signup",
        action: signupPageAction,
        element: (
          <IsAnon>
            <Navbar />
            <SignupPage />,
          </IsAnon>
        ),
      },
      {
        path: "login",
        action: loginPageAction,
        element: (
          <IsAnon>
            <Navbar />
            <LoginPage />,
          </IsAnon>
        ),
      },
    ],
  },
]);

export default router;
