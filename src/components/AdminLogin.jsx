import React, { useState } from "react";
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Alert, 
  IconButton, 
  InputAdornment
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff 
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;

    if (email && password) {
      try {
        const response = await axios.post(`${apiUrl}/admin/login`, { 
          email, 
          password 
        });
        
        if (response.data.success) {
          const { accessToken } = response.data.data;

          Cookies.set("accessToken", accessToken, { expires: 1 }); // Expires in 1 day

          console.log("Access Token stored in cookies:", accessToken);

          navigate("/admin-dashboard");
        } else {
          setLoginError(true);
        }
      } catch (error) {
        console.error("Login error:", error);
        setLoginError(true);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={6} 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 4,
          borderRadius: 2
        }}
      >
        <Typography 
          component="h1" 
          variant="h5" 
          sx={{ mb: 3 }}
        >
          Admin Login
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={loginError}
            variant="outlined"
            type="email"
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
            error={loginError}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {loginError && (
            <Alert 
              severity="error" 
              sx={{ mt: 2, width: "100%" }}
            >
              Login failed! Please check your email and password and try again.
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!email || !password}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
