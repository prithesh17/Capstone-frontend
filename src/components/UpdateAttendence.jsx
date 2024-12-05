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
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Button, 
  Alert, 
  Paper 
} from '@mui/material';

const UpdateAttendence = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [date, setDate] = useState('');
  const [isPresent, setIsPresent] = useState(null);
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
    const attendanceData = {
      studentId: selectedStudent?._id,
      date,
      isPresent,
    };

    const token = Cookies.get('accessToken');
    try {
      const response = await axios.post(`${apiUrl}/subject/updateAttendence`, attendanceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage('Attendance updated successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating attendance', error);
      setErrorMessage('Error updating attendance');
      setSuccessMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Update Attendance
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

          <TextField
            fullWidth
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          <FormControl component="fieldset">
            <Typography component="legend">Status</Typography>
            <RadioGroup
              row
              aria-label="status"
              name="status"
              value={isPresent ?? ''}
              onChange={(e) => setIsPresent(e.target.value === 'true')}
            >
              <FormControlLabel 
                value="true" 
                control={<Radio />} 
                label="Present" 
              />
              <FormControlLabel 
                value="false" 
                control={<Radio />} 
                label="Absent" 
              />
            </RadioGroup>
          </FormControl>

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Update Attendance
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

export default UpdateAttendence;