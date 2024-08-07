import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, TextField, Button, Typography, Alert } from "@mui/material";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import muiCustomStyles from "../../styles/muiCustomStyles";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          email: email,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <Card sx={muiCustomStyles.card}>
        <Box
          component="form"
          onSubmit={login}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          {errors.loginMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.loginMessage}
            </Alert>
          )}

          <TextField
            label="Email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={muiCustomStyles.textField}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={muiCustomStyles.textField}
          />

          <Button
            type="submit"
            variant="contained"
            sx={muiCustomStyles.continueButton}
          >
            Log In
          </Button>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <GoogleSignIn />
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default LoginForm;
