import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Box 
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  AssignmentInd as AttendanceIcon,
  Score as MarksIcon,
  PictureAsPdf as PDFIcon,
  Leaderboard as LeaderboardIcon,
  Chat as ChatIcon 
} from '@mui/icons-material';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const dashboardButtons = [
    { 
      label: 'View Attendance', 
      icon: <AttendanceIcon />, 
      path: '/viewAttendance' 
    },
    { 
      label: 'View Marks', 
      icon: <MarksIcon />, 
      path: '/viewMarks' 
    },
    { 
      label: 'Get PDFs', 
      icon: <PDFIcon />, 
      path: '/getPDFs' 
    },
    { 
      label: 'View Leaderboard', 
      icon: <LeaderboardIcon />, 
      path: '/getLeaderboard' 
    },
    { 
      label: 'Chat Room', 
      icon: <ChatIcon />, 
      path: '/chatroom' 
    }
  ];

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          my: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            color: 'primary.main',
            mb: 3 
          }}
        >
          <DashboardIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Student Dashboard
        </Typography>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%', 
            borderRadius: 2 
          }}
        >
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              textAlign: 'center', 
              color: 'text.secondary',
              mb: 4 
            }}
          >
            Welcome to your dashboard! Here, you can manage your academic progress and interact with faculty and fellow students.
          </Typography>

          <Grid 
            container 
            spacing={2} 
            justifyContent="center"
          >
            {dashboardButtons.map((button) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                key={button.label}
              >
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={button.icon}
                  onClick={() => navigate(button.path)}
                  sx={{
                    height: 60,
                    justifyContent: 'start',
                    pl: 3,
                    '&:hover': {
                      backgroundColor: 'primary.dark'
                    }
                  }}
                >
                  {button.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default StudentDashboard;