import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Container, 
  Grid, 
  CircularProgress, 
  Paper,
  Divider
} from '@mui/material';

const ViewMarks = () => {
  const [marksData, setMarksData] = useState({ IA1: [], IA2: [], IA3: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const jwtToken = Cookies.get('accessToken'); 

    const fetchMarks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/student/marks`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`, 
          },
        });

        setMarksData(response.data.data); 
        setLoading(false); 
      } catch (error) {
        setError('Failed to load marks.');
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  const calculatePerformance = (scoredMarks, maxMarks) => {
    const percentage = (scoredMarks / maxMarks) * 100;
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 80) return 'Very Good';
    if (percentage >= 70) return 'Good';
    if (percentage >= 60) return 'Average';
    return 'Needs Improvement';
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent': return 'success.main';
      case 'Very Good': return 'primary.main';
      case 'Good': return 'info.main';
      case 'Average': return 'warning.main';
      default: return 'error.main';
    }
  };

  const renderMarksCards = (testType) => {
    const marks = marksData[testType];
    return marks.map((mark, index) => {
      const performance = calculatePerformance(mark.scoredMarks, mark.maxMarks);
      
      return (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card 
            variant="outlined"
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 3,
                transform: 'translateY(-5px)'
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" component="div">
                  {mark.subjectName}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {mark.subjectCode}
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body1">
                  Marks:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {mark.scoredMarks}/{mark.maxMarks}
                </Typography>
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">
                  Performance:
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold"
                  color={getPerformanceColor(performance)}
                >
                  {performance}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  if (loading) {
    return (
      <Container 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          py: 3, 
          px: 2, 
          mb: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          color="white"
          sx={{ fontWeight: 'bold', letterSpacing: 1 }}
        >
          Academic Performance
        </Typography>
      </Paper>

      {['IA1', 'IA2', 'IA3'].map((testType) => (
        <Box key={testType} mb={4}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3, 
              pl: 1, 
              borderLeft: 4, 
              borderColor: 'primary.main' 
            }}
          >
            {testType} Marks
          </Typography>
          <Grid container spacing={3}>
            {renderMarksCards(testType)}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default ViewMarks;