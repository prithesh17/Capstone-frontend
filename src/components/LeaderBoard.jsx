import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Card, 
  CardContent 
} from '@mui/material';

const StudentLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const jwtToken = Cookies.get('accessToken'); 

      if (!jwtToken) {
        setError('JWT token is missing!');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/student/leaderboard`, { 
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLeaderboardData(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error loading leaderboard');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <Typography align="center">Loading...</Typography>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  const assessments = ['IA1', 'IA2', 'IA3'];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center" sx={{ my: 3 }}>
        Student Leaderboard
      </Typography>
      
      {assessments.map((assessment) => {
        const currentStudentRankInfo = {
          IA1: leaderboardData.currentStudent.IA1Rank,
          IA2: leaderboardData.currentStudent.IA2Rank,
          IA3: leaderboardData.currentStudent.IA3Rank
        };

        const currentStudentMarksInfo = {
          IA1: leaderboardData.currentStudent.IA1Marks,
          IA2: leaderboardData.currentStudent.IA2Marks,
          IA3: leaderboardData.currentStudent.IA3Marks
        };

        const leaderboardEntries = [
          ...leaderboardData.data[assessment],
          {
            _id: 'current-student',
            fullName: 'Your Performance',
            totalMarks: currentStudentMarksInfo[assessment],
            rank: currentStudentRankInfo[assessment]
          }
        ];

        return (
          <Card key={assessment} variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {assessment} Leaderboard
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rank</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Total Marks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaderboardEntries.map((student, index) => (
                      <TableRow 
                        key={student._id}
                        sx={{ 
                          backgroundColor: student._id === 'current-student' 
                            ? 'primary.light' 
                            : 'inherit',
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell>
                          {student._id === 'current-student' 
                            ? student.rank 
                            : index + 1
                          }
                        </TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell align="right">{student.totalMarks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
};

export default StudentLeaderboard;
