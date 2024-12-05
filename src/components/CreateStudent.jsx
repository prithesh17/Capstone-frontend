import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Alert, 
  IconButton, 
  InputAdornment,
  AppBar,
  Toolbar
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  PersonAdd 
} from '@mui/icons-material';

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    usn: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [creationSuccess, setCreationSuccess] = useState(false);
  const [creationError, setCreationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full Name is required.";
    if (!formData.usn || !/^[A-Z0-9]+$/.test(formData.usn)) {
      errors.usn = "USN is required and should be in capital letters.";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Valid Email is required.";
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password should be at least 6 characters.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        setCreationError(true);
        setErrorMessage("Access token not found");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        `${apiUrl}/admin/createStudent`,
        formData,
        { headers }
      );

      if (response.data.success) {
        setCreationSuccess(true);
        setTimeout(() => {
          setCreationSuccess(false);
          navigate("/admin-dashboard");
        }, 2000);
      } else {
        setCreationError(true);
        setErrorMessage(response.data.msg || "Failed to create student");
      }
    } catch (error) {
      console.error("Error:", error);
      setCreationError(true);
      setErrorMessage(
        error.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Create Student
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="sm">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          {/* Form Title */}
          <Typography 
            component="h1" 
            variant="h5" 
            sx={{ mb: 3, textAlign: 'center' }}
          >
            Student Registration
          </Typography>

          {/* Success Alert */}
          {creationSuccess && (
            <Alert 
              severity="success" 
              sx={{ width: '100%', mb: 2 }}
            >
              Student creation successful! Redirecting to admin dashboard...
            </Alert>
          )}

          {/* Error Alert */}
          {creationError && (
            <Alert 
              severity="error" 
              sx={{ width: '100%', mb: 2 }}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Form */}
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
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              autoFocus
              value={formData.fullName}
              onChange={handleInputChange}
              error={!!formErrors.fullName}
              helperText={formErrors.fullName}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="usn"
              label="University Seat Number"
              name="usn"
              value={formData.usn}
              onChange={handleInputChange}
              error={!!formErrors.usn}
              helperText={formErrors.usn}
              inputProps={{ style: { textTransform: 'uppercase' } }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<PersonAdd />}
            >
              Create Student
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateStudent;