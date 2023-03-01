import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { TextField, Button, Typography } from "@mui/material";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <Typography variant="h4">Login</Typography>

      <form onSubmit={handleLoginSubmit}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          margin="normal"
        />

        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
        />

        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>

      {errorMessage && (
        <Typography color="error" variant="subtitle1">
          {errorMessage}
        </Typography>
      )}

      <Typography variant="subtitle1">
        Don't have an account yet? <Link to={"/signup"}>Sign Up</Link>
      </Typography>
    </div>
  );
}

export default LoginPage;
