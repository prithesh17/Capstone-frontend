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
  PersonAdd,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

const CreateSubject = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    facultyName: "",
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
    if (!formData.subjectName) errors.subjectName = "Subject Name is required.";
    if (!formData.subjectCode || !/^[A-Z0-9]+$/.test(formData.subjectCode)) {
      errors.subjectCode = "Subject Code is required and should be in capital letters.";
    }
    if (!formData.facultyName) errors.facultyName = "Faculty Name is required.";
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
        `${apiUrl}/admin/createSubject`,
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
        setErrorMessage(response.data.msg || "Failed to create subject");
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
            Create Subject
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
            Subject Creation
          </Typography>

          {/* Success Alert */}
          {creationSuccess && (
            <Alert 
              severity="success" 
              sx={{ width: '100%', mb: 2 }}
            >
              Subject creation successful! Redirecting to admin dashboard...
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
              id="subjectName"
              label="Subject Name"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleInputChange}
              error={!!formErrors.subjectName}
              helperText={formErrors.subjectName}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="subjectCode"
              label="Subject Code"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleInputChange}
              error={!!formErrors.subjectCode}
              helperText={formErrors.subjectCode}
              inputProps={{ style: { textTransform: 'uppercase' } }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="facultyName"
              label="Faculty Name"
              name="facultyName"
              value={formData.facultyName}
              onChange={handleInputChange}
              error={!!formErrors.facultyName}
              helperText={formErrors.facultyName}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
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
              Create Subject
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateSubject;
