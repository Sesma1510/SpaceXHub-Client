import "./Navbar.css";
import { Link, useOutletContext } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledLink = styled(Link)({
  color: "white",
  padding: "0.5rem",
  textDecoration: "none",
});

const LogoutButton = styled(Button)({
  marginLeft: "1rem",
  color: "white",
});

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useOutletContext();

  const pages = [
    {
      path: "/",
      title: "Home",
      authRequired: false,
    },
    {
      path: "/profile",
      title: "Profile",
      authRequired: true,
    },
  ];

  if (!isLoggedIn) {
    pages.push(
      {
        path: "/login",
        title: "Login",
        authRequired: false,
      },
      {
        path: "/signup",
        title: "Sign up",
        authRequired: false,
      }
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar className="navBar">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SpaceX Hub
          </Typography>
          <Box sx={{ display: "flex" }}>
            {pages.map((page) => {
              if (!page.authRequired || isLoggedIn) {
                return (
                  <StyledLink key={page.path} to={page.path}>
                    {page.title}
                  </StyledLink>
                );
              }
              return null;
            })}
          </Box>
          {isLoggedIn && (
            <>
              <span>{user && user.name}</span>
              <LogoutButton onClick={logOutUser}>Logout</LogoutButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
