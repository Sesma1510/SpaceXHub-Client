import "./SignupPage.css";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import {
  TextField,
  Button,
  Link as MuiLink,
  Typography,
  Container,
} from "@mui/material";

import authService from "../../services/auth.service";

export const signupPageAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  try {
    await authService.signup({ email, password, name });
    return redirect("/login");
  } catch (error) {
    const {
      request: { response },
    } = error;
    const { message } = JSON.parse(response);
    return message;
  }
};

function SignupPage() {
  const errorMessage = useActionData();

  return (
    <Form action="/signup" method="POST">
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
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
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        {errorMessage && (
          <Typography variant="body2" color="error">
            {errorMessage}
          </Typography>
        )}
        <Typography variant="body2">
          Already have an account?{" "}
          <MuiLink component={Link} to={"/login"}>
            {" "}
            Login
          </MuiLink>
        </Typography>
      </Container>
    </Form>
  );
}

export default SignupPage;
