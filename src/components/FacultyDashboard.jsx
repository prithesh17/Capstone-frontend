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
  AssignmentTurnedIn as UpdateAttendanceIcon,
  Edit as UpdateMarksIcon,
  Chat as ChatIcon,
  UploadFile as UploadPDFIcon 
} from '@mui/icons-material';

const FacultyDashboard = () => {
  const navigate = useNavigate();

  const dashboardButtons = [
    { 
      label: 'Update Attendance', 
      icon: <UpdateAttendanceIcon />, 
      path: '/updateAttendance' 
    },
    { 
      label: 'Update Marks', 
      icon: <UpdateMarksIcon />, 
      path: '/updateMarks' 
    },
    { 
      label: 'Chat Room', 
      icon: <ChatIcon />, 
      path: '/chatroomfaculty' 
    },
    { 
      label: 'Upload PDFs', 
      icon: <UploadPDFIcon />, 
      path: '/uploadPDFs' 
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
          Faculty Dashboard
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
            Welcome to your dashboard! Here, you can manage student progress, upload resources, and interact with students.
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

export default FacultyDashboard;
