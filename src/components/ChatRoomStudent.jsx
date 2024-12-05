import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';

// MUI Imports
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  Paper, 
  Container, 
  IconButton,
  Avatar,
  Stack
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';

const apiUrl = import.meta.env.VITE_API_URL;

const socket = io(apiUrl);

const ChatRoomStudent = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [clientsTotal, setClientsTotal] = useState(0);
  const [feedback, setFeedback] = useState('');
  const messageContainerRef = useRef(null);

  const jwtToken = Cookies.get('accessToken');

  useEffect(() => {
    if (jwtToken) {
      axios
        .get(`${apiUrl}/student/chat`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        .then((response) => {
          if (response.data.success) {
            setName(response.data.name);
          }
        })
        .catch((error) => {
          console.error('Error fetching name:', error);
        });
    }
  }, [jwtToken]);

  useEffect(() => {
    socket.on('clients-total', (total) => setClientsTotal(total));

    socket.on('chat-message', (data) => {
      setMessages((prevMessages) => [...prevMessages, { ...data, isOwnMessage: false }]);
      playMessageTone();
    });

    socket.on('feedback', (data) => setFeedback(data.feedback));

    return () => {
      socket.off('clients-total');
      socket.off('chat-message');
      socket.off('feedback');
    };
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo(0, messageContainerRef.current.scrollHeight);
    }
  }, [messages]);

  const playMessageTone = () => {
    const messageTone = new Audio('/message-tone.mp3');
    messageTone.play();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message) return;

    const data = {
      name,
      message,
      dateTime: new Date(),
    };

    socket.emit('message', data);
    setMessages((prevMessages) => [...prevMessages, { ...data, isOwnMessage: true }]);
    setMessage('');
  };

  const handleTypingFeedback = (status) => {
    socket.emit('feedback', { feedback: status ? `✍️ ${name} is typing a message...` : '' });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>
          <Typography variant="h5">UCV Chat Room 💬</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              flexGrow: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {name}
          </Typography>
        </Box>

        <Box 
          ref={messageContainerRef}
          sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 2,
            backgroundColor: 'background.default'
          }}
        >
          <List>
            {messages.map((msg, index) => (
              <ListItem 
                key={index}
                sx={{ 
                  justifyContent: msg.isOwnMessage ? 'flex-end' : 'flex-start',
                  mb: 1
                }}
              >
                <Paper 
                  elevation={1}
                  sx={{ 
                    p: 1, 
                    maxWidth: '75%',
                    backgroundColor: msg.isOwnMessage ? 'primary.light' : 'grey.200',
                    color: msg.isOwnMessage ? 'primary.contrastText' : 'text.primary'
                  }}
                >
                  <Typography variant="body2">{msg.message}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>
                    {msg.name} ● {moment(msg.dateTime).fromNow()}
                  </Typography>
                </Paper>
              </ListItem>
            ))}
            
            {feedback && (
              <ListItem>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  sx={{ fontStyle: 'italic' }}
                >
                  {feedback}
                </Typography>
              </ListItem>
            )}
          </List>
        </Box>

        <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => handleTypingFeedback(true)}
              onBlur={() => handleTypingFeedback(false)}
              onKeyPress={() => handleTypingFeedback(true)}
              placeholder="Type a message..."
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Stack>
        </Box>

        <Box sx={{ p: 1, textAlign: 'center', backgroundColor: 'grey.100' }}>
          <Typography variant="body2">
            Total clients: {clientsTotal}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatRoomStudent;