import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Box className="SignupPage" sx={{ p: 2 }}>
      <Typography variant="h4">Sign Up</Typography>

      <Box component="form" onSubmit={handleSignupSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmail}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={handlePassword}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleName}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </Box>

      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Typography sx={{ mt: 2 }}>
        Already have an account? <Link to={"/login"}>Login</Link>
      </Typography>
    </Box>
  );
}

export default SignupPage;
