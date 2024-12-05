import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from "@mui/material";
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import FacultyLogin from './components/FacultyLogin';
import CreateStudent from './components/CreateStudent';
import CreateSubject from './components/CreateSubject';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0', 
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/create-subject" element={<CreateSubject />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
