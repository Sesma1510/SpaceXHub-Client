import React from "react";
import { Link, Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import NavBar from "../components/Navbar/Navbar";

function Root() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Outlet />
    </>
  );
}

export default Root;
