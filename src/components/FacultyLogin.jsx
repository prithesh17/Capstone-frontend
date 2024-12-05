import React, { useState } from "react";
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Alert, 
  InputAdornment, 
  IconButton 
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const FacultyLogin = () => {
  const [subjectCode, setSubjectCode] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateSubjectCode = (value) => /^[A-Z0-9]+$/.test(value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;

    if (subjectCode && password) {
      try {
        const response = await axios.post(`${apiUrl}/subject/login`, { 
          subjectCode, 
          password 
        });

        if (response.data.success) {
          const { accessToken } = response.data.data;

          // Store access token in cookies
          Cookies.set("accessToken", accessToken, { expires: 1 }); // Expires in 1 day
          console.log("Access Token stored in cookies:", accessToken);

          navigate("/faculty-dashboard");
        } else {
          setLoginError(true);
        }
      } catch (error) {
        console.error("Login error:", error);
        setLoginError(true);
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Faculty Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="subjectCode"
            label="Subject Code"
            name="subjectCode"
            autoComplete="off"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            error={!!subjectCode && !validateSubjectCode(subjectCode)}
            helperText={
              subjectCode && !validateSubjectCode(subjectCode)
                ? "Subject Code should be in capital letters and numbers"
                : ""
            }
            variant="outlined"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{ minLength: 6 }}
          />

          {loginError && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              Login failed! Please check your Subject Code and password and try again.
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!subjectCode || !password}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FacultyLogin;
