import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, TextField, Button, Typography, Alert } from "@mui/material";
import muiCustomStyles from "../../styles/muiCustomStyles";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <Card sx={muiCustomStyles.card}>
        <Box
          component="form"
          onSubmit={registerUser}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h4" gutterBottom>
            Register User
          </Typography>

          {errors.registrationMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.registrationMessage}
            </Alert>
          )}

          <TextField
            label="Email"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
            Register
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

export default RegisterForm;
