import "./HomePage.css";
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Button, Container, Typography } from "@mui/material";
import { theme } from "../../config/config";

const ContainerWrapper = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(8)};
  padding-bottom: ${({ theme }) => theme.spacing(8)};
`;

const H3 = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Body1 = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const CtaButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <ContainerWrapper maxWidth="md">
        <H3 variant="h3" align="center">
          Welcome to SpaceX Hub!
        </H3>
        <Body1 variant="body1" align="center">
          Get the latest information about SpaceX rockets, launches, and crew
          members. Sign up or log in to access additional features and content.
        </Body1>
        <CtaButton
          variant="contained"
          color="primary"
          size="large"
          href="/login"
        >
          Login
        </CtaButton>

        <CtaButton
          variant="contained"
          color="primary"
          size="large"
          href="/login"
        >
          Sign Up
        </CtaButton>
      </ContainerWrapper>
    </ThemeProvider>
  );
}

export default HomePage;
