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
import ChatRoomStudent from './components/ChatRoomStudent';
import GetPDFs from './components/GetPDFs';
import LeaderBoard from './components/LeaderBoard';
import StudentDashboard from './components/StudentDashboard';
import ViewAttendance from './components/ViewAttendance';
import ViewMarks from './components/ViewMarks';
import FacultyDashboard from './components/FacultyDashboard';
import UploadPdfs from './components/UploadPdfs';
import UpdateAttendence from './components/UpdateAttendence';
import UpdateMarks from './components/UpdateMarks';
import ChatRoomFaculty from './components/ChatRoomFaculty';

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
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/chatroom" element={<ChatRoomStudent />} />
          <Route path="/getLeaderboard" element={<LeaderBoard />} />
          <Route path="/getPDFs" element={<GetPDFs />} />
          <Route path="/viewMarks" element={<ViewMarks />} />
          <Route path="/viewAttendance" element={<ViewAttendance />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/updateAttendance" element={<UpdateAttendence />} />
          <Route path="/updateMarks" element={<UpdateMarks />} />
          <Route path="/chatroomfaculty" element={<ChatRoomFaculty />} />
          <Route path="/uploadPDFs" element={<UploadPdfs />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
