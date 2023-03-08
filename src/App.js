import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import React from "react";

import SideBar from "./components/SideBar";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

import {
  Homepage,
  Crew,
  SingleCrew,
  Error,
  Launches,
  SingleLaunches,
  LoginPage,
  SignupPage,
  ProfilePage,
  FavoritePage,
} from "./pages";

import { loginPageAction } from "./pages/LoginPage";
import { signupPageAction } from "./pages/SignupPage";
import { launchesPageAction, launchesPagesLoader } from "./pages/Launches";

import Root from "./pages/Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route
        path="/"
        element={
          <>
            <Homepage />
          </>
        }
      ></Route>
      <Route
        path="/crew"
        element={
          <IsPrivate>
            <SideBar />
            <Crew />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/crew/:id"
        element={
          <IsPrivate>
            <SideBar />
            <SingleCrew />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/launches"
        loader={launchesPagesLoader}
        action={launchesPageAction}
        element={
          <IsPrivate>
            <SideBar />
            <Launches />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/launches/:id"
        element={
          <IsPrivate>
            <SideBar />
            <SingleLaunches />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/login"
        action={loginPageAction}
        element={
          <IsAnon>
            <SideBar />
            <LoginPage />
          </IsAnon>
        }
      ></Route>
      <Route
        path="/signup"
        action={signupPageAction}
        element={
          <IsAnon>
            <SideBar />
            <SignupPage />
          </IsAnon>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <IsPrivate>
            <SideBar />
            <ProfilePage />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/favorites"
        element={
          <IsPrivate>
            <SideBar />
            <FavoritePage />
          </IsPrivate>
        }
      ></Route>

      {/* Reroute error links back to the homepage */}
      <Route path="*" element={<Error />}></Route>
    </Route>
  )
);

export default function App() {
  return (
    <>
      {/* <CheckOnlineStatus /> */}
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>
  );
}
