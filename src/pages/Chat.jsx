import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const socket = io('https://defi-chat-backend.onrender.com');

const Chat = () => {
  const { userId } = useSelector(state => state?.auth);
  const { id: chatUserId } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    socket.emit('joinRoom', userId);

    axios.get(`https://defi-chat-backend.onrender.com/api/messages/${userId}/${chatUserId}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

    socket.on('message', (newMessage) => {
      if ((newMessage.receiverId === userId && newMessage.senderId === chatUserId) || (newMessage.receiverId === chatUserId && newMessage.senderId === userId)) {
        setMessages(prevMessages => [newMessage, ...prevMessages]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [userId, chatUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('senderId', userId);
    formData.append('receiverId', chatUserId);
    formData.append('message', message);
    if (image) {
      formData.append('image', image);
    }
    if (video) {
      formData.append('video', video);
    }

    try {
      const response = await axios.post('https://defi-chat-backend.onrender.com/api/messages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessages([response.data, ...messages]);
      setMessage('');
      setImage(null);
      setVideo(null);
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4">Chat with {chatUserId}</Typography>
      <List>
        {messages?.map((msg, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src="" />
            </ListItemAvatar>
            <ListItemText
              primary={msg.message}
              secondary={new Date(msg.timestamp).toLocaleString()}
            />
            {msg.image && <img src={`https://defi-chat-backend.onrender.com/uploads/${msg.image}`} alt="Uploaded" style={{ maxWidth: '200px', margin: '10px' }} />}
            {msg.video && <video controls src={`https://defi-chat-backend.onrender.com/uploads/${msg.video}`} style={{ maxWidth: '200px', margin: '10px' }} />}
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <Button type="submit" variant="contained">Send</Button>
      </form>
    </Box>
  );
};

export default Chat;
