import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Paper, 
  Grid, 
  Alert, 
  AppBar, 
  Toolbar 
} from '@mui/material';
import { Delete, AddCircleOutline } from '@mui/icons-material';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudentsAndSubjects = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(`${apiUrl}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          const { students, subjects } = response.data.data;
          setStudents(students);
          setSubjects(subjects);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError(err.message || "An error occurred");
      }
    };

    fetchStudentsAndSubjects();
  }, []);

  const handleRemoveStudent = async (id) => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.post(
        `${apiUrl}/admin/removeStudent`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
        alert("Student removed successfully!");
      } else {
        throw new Error("Failed to remove student");
      }
    } catch (err) {
      console.error("Error removing student:", err.message);
      alert(err.message || "Failed to remove student");
    }
  };

  const handleRemoveSubject = async (id) => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.post(
        `${apiUrl}/admin/removeSubject`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject._id !== id));
        alert("Subject removed successfully!");
      } else {
        throw new Error("Failed to remove subject");
      }
    } catch (err) {
      console.error("Error removing subject:", err.message);
      alert(err.message || "Failed to remove subject");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Create Links */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Button 
                component={Link} 
                to="/create-student" 
                variant="contained" 
                color="primary" 
                startIcon={<AddCircleOutline />}
              >
                Create Student
              </Button>
              <Button 
                component={Link} 
                to="/create-subject" 
                variant="contained" 
                color="secondary" 
                startIcon={<AddCircleOutline />}
              >
                Create Subject
              </Button>
            </Box>
          </Grid>

          {/* Error Handling */}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {/* Students Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Students
              </Typography>
              <List>
                {students.map((student) => (
                  <ListItem 
                    key={student._id}
                    secondaryAction={
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => handleRemoveStudent(student._id)}
                      >
                        Remove
                      </Button>
                    }
                  >
                    <ListItemText 
                      primary={student.fullName} 
                      secondary={student.email} 
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Subjects Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Subjects
              </Typography>
              <List>
                {subjects.map((subject) => (
                  <ListItem 
                    key={subject._id}
                    secondaryAction={
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => handleRemoveSubject(subject._id)}
                      >
                        Remove
                      </Button>
                    }
                  >
                    <ListItemText 
                      primary={subject.subjectName} 
                      secondary={`Code: ${subject.subjectCode}`} 
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;