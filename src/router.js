import { createBrowserRouter } from "react-router-dom";

// Pages
import Root from "./pages/Root";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import IsAnon from "./components/IsAnon/IsAnon";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        // Colocar aca las carpetas de memes
        path: "/",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: (
          <IsPrivate>
            <ProfilePage />,
          </IsPrivate>
        ),
      },
      {
        path: "signup",
        element: (
          <IsAnon>
            <SignupPage />,
          </IsAnon>
        ),
      },
      {
        path: "login",
        element: (
          <IsAnon>
            <LoginPage />,
          </IsAnon>
        ),
      },
    ],
  },
]);

export default router;
