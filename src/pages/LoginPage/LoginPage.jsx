import "./LoginPage.css";

import {
  useActionData,
  useNavigate,
  useOutletContext,
  Form,
  Link,
} from "react-router-dom";

import { useEffect } from "react";

import authService from "../../services/auth.service";

import { TextField, Button, Typography, Container } from "@mui/material";

export const loginPageAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { data } = await authService.login({ email, password });

    return {
      authToken: data.authToken,
      error: null,
    };
  } catch (error) {
    const {
      request: { response },
    } = error;
    const { message } = JSON.parse(response);
    return { error: message, authToken: null };
  }
};

function LoginPage(a) {
  const navigate = useNavigate();
  const actionData = useActionData();

  const { storeToken, authenticateUser } = useOutletContext();

  const authToken = actionData?.authToken;
  const error = actionData?.error;

  useEffect(() => {
    // Si el token de autenticación existe, lo almacenamos en el localStorage,
    // autenticamos al usuario y lo redirigimos a la página principal.
    if (authToken) {
      storeToken(authToken); // Almacenar el token en localStorage
      authenticateUser(); // Autenticar al usuario
      navigate("/"); // Redirigir al usuario a la página principal
    }
  }, [authToken, storeToken, authenticateUser, navigate]); // Dependencias del useEffect

  return (
    <Form action="/login" method="POST">
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link component={Link} to={"/signup"}>
            {" "}
            Sign Up
          </Link>
        </Typography>
      </Container>
    </Form>
  );
}

export default LoginPage;
