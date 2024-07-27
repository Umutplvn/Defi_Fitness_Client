import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import dayjs from 'dayjs'; // Tarihleri formatlamak için kullanılır

const Chats = () => {
  const { userId, users } = useSelector((state) => state?.auth); 
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`https://defi-chat-backend.onrender.com/api/messages/${userId}`);
        setChats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, [userId]);

  const getLastMessage = (receiverId) => {
    const userChats = chats.filter(chat => chat.receiverId === receiverId || chat.senderId === receiverId);
    const lastMessage = userChats.sort((a, b) => b.timestamp - a.timestamp)[0];
    return lastMessage ? lastMessage.message : 'No messages yet';
  };

  const getLastMessageTime = (receiverId) => {
    const userChats = chats.filter(chat => chat.receiverId === receiverId || chat.senderId === receiverId);
    const lastMessage = userChats.sort((a, b) => b.timestamp - a.timestamp)[0];
    return lastMessage ? dayjs(lastMessage.timestamp).format('MMM D, YYYY h:mm A') : '';
  };

  const isMessageRead = (receiverId) => {
    const userChats = chats.filter(chat => chat.receiverId === receiverId || chat.senderId === receiverId);
    const lastMessage = userChats.sort((a, b) => b.timestamp - a.timestamp)[0];
    return lastMessage ? lastMessage.read : false;
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4">Chats</Typography>
      <List>
        {users?.map((user) => (
          <ListItem component={Link} to={`/chat/${user._id}`} key={user._id}>
            <ListItemAvatar>
              <Avatar src={user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {getLastMessage(user._id)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {getLastMessageTime(user._id)}
                  </Typography>
                  <Typography variant="body2" color={isMessageRead(user._id) ? 'textSecondary' : 'primary'}>
                    {isMessageRead(user._id) ? 'Read' : 'Unread'}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Chats;
