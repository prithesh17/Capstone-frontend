import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Box,
  CircularProgress
} from '@mui/material';

const AttendanceCard = ({ subject, totalClasses, attendedClasses, attendancePercentage }) => {
  const getColorForPercentage = (percentage) => {
    if (percentage >= 75) return 'success.main';
    if (percentage >= 50) return 'warning.main';
    return 'error.main';
  };

  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Typography variant="h6" gutterBottom>
          {subject}
        </Typography>
        <Box position="relative" display="inline-flex" sx={{ my: 2 }}>
          <CircularProgress
            variant="determinate"
            value={parseFloat(attendancePercentage)}
            size={120}
            thickness={4}
            sx={{ 
              color: getColorForPercentage(parseFloat(attendancePercentage)),
              backgroundColor: 'grey.200',
              borderRadius: '50%'
            }}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography 
              variant="h5" 
              component="div" 
              color="text.secondary"
            >
              {`${attendancePercentage}%`}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {`${attendedClasses} / ${totalClasses} Classes`}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = Cookies.get('accessToken'); 
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`${apiUrl}/student/attendence`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAttendanceData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography color="error" align="center">Error loading attendance</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
        Your Attendance
      </Typography>
      <Grid container spacing={3}>
        {attendanceData.map((subject, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AttendanceCard 
              subject={subject.subjectName}
              totalClasses={subject.totalClasses}
              attendedClasses={subject.attendedClasses}
              attendancePercentage={subject.attendancePercentage}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ViewAttendance;
