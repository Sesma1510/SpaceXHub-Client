import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import React from "react";

import Header from "./components/Header";
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

import Root from "./pages/Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Homepage />
          </>
        }
      ></Route>
      <Route
        path="/crew"
        element={
          <IsPrivate>
            <Header />
            <Crew />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/crew/:id"
        element={
          <IsPrivate>
            <Header />
            <SingleCrew />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/launches"
        element={
          <IsPrivate>
            <Header />
            <Launches />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/launches/:id"
        element={
          <IsPrivate>
            <Header />
            <SingleLaunches />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/login"
        action={loginPageAction}
        element={
          <IsAnon>
            <Header />
            <LoginPage />
          </IsAnon>
        }
      ></Route>
      <Route
        path="/signup"
        action={signupPageAction}
        element={
          <IsAnon>
            <Header />
            <SignupPage />
          </IsAnon>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <IsPrivate>
            <Header />
            <ProfilePage />
          </IsPrivate>
        }
      ></Route>
      <Route
        path="/favorites"
        element={
          <IsPrivate>
            <Header />
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
