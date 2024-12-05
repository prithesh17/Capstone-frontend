import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { 
  Container, 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Button, 
  Alert, 
  Paper 
} from '@mui/material';

const UpdateMarks = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [examType, setExamType] = useState('');
  const [maxMarks, setMaxMarks] = useState(20);
  const [scoredMarks, setScoredMarks] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      console.error('Token is missing');
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/subject/studentList`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data?.data) {
        setStudents(response.data.data);
      } else {
        console.error('Unexpected response structure', response);
      }
    } catch (error) {
      console.error('Error fetching student list', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate scored marks
    if (scoredMarks < 0 || scoredMarks > maxMarks) {
      setErrorMessage(`Scored marks must be between 0 and ${maxMarks}`);
      setSuccessMessage('');
      return;
    }

    const marksData = {
      studentId: selectedStudent?._id,
      testType: examType,
      maxMarks: maxMarks,
      scoredMarks: scoredMarks,
    };

    const token = Cookies.get('accessToken');
    try {
      const response = await axios.post(`${apiUrl}/subject/updateMarks`, marksData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage('Marks updated successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating marks', error);
      setErrorMessage('Error updating marks');
      setSuccessMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Update Marks
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="student-select-label">Student Name</InputLabel>
            <Select
              labelId="student-select-label"
              id="student-select"
              value={selectedStudent?._id || ''}
              label="Student Name"
              onChange={(e) =>
                setSelectedStudent(students.find((student) => student._id === e.target.value))
              }
              required
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="exam-type-select-label">Type of Exam</InputLabel>
            <Select
              labelId="exam-type-select-label"
              id="exam-type-select"
              value={examType}
              label="Type of Exam"
              onChange={(e) => setExamType(e.target.value)}
              required
            >
              <MenuItem value="IA1">Internal Assessment 1</MenuItem>
              <MenuItem value="IA2">Internal Assessment 2</MenuItem>
              <MenuItem value="IA3">Internal Assessment 3</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="number"
            label="Max Marks"
            value={maxMarks}
            onChange={(e) => setMaxMarks(Number(e.target.value))}
            InputProps={{
              inputProps: { 
                min: 0 
              }
            }}
          />

          <TextField
            fullWidth
            type="number"
            label="Scored Marks"
            value={scoredMarks}
            onChange={(e) => setScoredMarks(Number(e.target.value))}
            InputProps={{
              inputProps: { 
                min: 0,
                max: maxMarks
              }
            }}
            required
          />

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Update Marks
          </Button>

          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateMarks;