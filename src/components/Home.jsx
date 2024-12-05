import React from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Box, 
  Paper
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          my: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 3
          }}
        >
          Undergrad Cohesion Virtue
        </Typography>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2 
          }}
        >
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              color: 'text.secondary', 
              mb: 2 
            }}
          >
            Undergrad Cohesion Virtue is your comprehensive academic management system. 
            This platform streamlines administrative and academic tasks, making collaboration 
            easier for students, faculty, and administrators.
          </Typography>

          <Typography 
            variant="body2" 
            sx={{ 
              fontStyle: 'italic', 
              color: 'text.disabled' 
            }}
          >
            If you're new to the platform and wish to register as an admin, kindly reach out 
            to us at: undergradcohesionvirtue@gmail.com
          </Typography>
        </Paper>

        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 'medium' 
          }}
        >
          Login
        </Typography>

        <Grid 
          container 
          spacing={2} 
          justifyContent="center"
        >
          <Grid item xs={12} sm={4}>
            <Button 
              component={RouterLink} 
              to="/admin-login" 
              variant="contained" 
              color="primary" 
              fullWidth
            >
              Login as Admin
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button 
              component={RouterLink} 
              to="/student-login" 
              variant="contained" 
              color="secondary" 
              fullWidth
            >
              Login as Student
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button 
              component={RouterLink} 
              to="/faculty-login" 
              variant="contained" 
              color="info" 
              fullWidth
            >
              Login as Faculty
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;