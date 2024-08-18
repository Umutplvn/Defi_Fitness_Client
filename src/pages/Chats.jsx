import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
} from "@mui/material";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import useAuthCall from "../hooks/useAuthCall";
//! Working way
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const Chats = () => {
  const { listUsers } = useAuthCall();
  const { userId, users, isAdmin } = useSelector((state) => state?.auth);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const members = users?.filter(
    (user) => user?.isAdmin === true && user?._id !== userId
  );
  const admin = users?.filter((user) => user._id !== userId);
  const userList = isAdmin ? admin : members;

  useEffect(() => {
    listUsers();
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `https://defi-chat-backend.onrender.com/api/chats/${userId}`
        );
        setChats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, []);

  const markMessagesAsRead = useCallback(
    async (receiverId) => {
      try {
        await axios.put(
          `https://defi-chat-backend.onrender.com/api/messages/read/${userId}/${receiverId}`
        );
        setChats((prevChats) => ({
          ...prevChats,
          [receiverId]: {
            ...prevChats[receiverId],
            unreadCount: 0,
            messages: prevChats[receiverId].messages.map((message) =>
              message.receiverId === userId
                ? { ...message, read: true }
                : message
            ),
          },
        }));
      } catch (err) {
        console.error(err);
      }
    },
    [userId]
  );

  const handleChatClick = (receiverId) => {
    markMessagesAsRead(receiverId);
    navigate(`/chat/${receiverId}`);
  };

  const getLastMessage = (receiverId) => {
    const userChats = chats[receiverId]?.messages || [];
    const lastMessage = userChats.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )[0];

    if (!lastMessage) {
      return "No messages yet";
    }

    if (lastMessage.image) {
      return "Image";
    }

    if (lastMessage.video) {
      return "Video";
    }

    return lastMessage.message || "No message yet.";
  };

  const getLastMessageTime = (receiverId) => {
    const userChats = chats[receiverId]?.messages || [];
    const lastMessage = userChats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
    if (lastMessage) {
      const messageTime = dayjs(lastMessage.timestamp);
      if (messageTime.isToday()) {
        return messageTime.format("h:mm A");
      } else if (messageTime.isYesterday()) {
        return "Yesterday";
      } else {
        return messageTime.format("MMM D, YYYY");
      }
    }
    return "";
  };

  const getLastMessageTimestamp = (receiverId) => {
    const userChats = chats[receiverId]?.messages || [];
    const lastMessage = userChats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
    return lastMessage ? new Date(lastMessage.timestamp).getTime() : 0;
  };

  const getUnreadCount = (receiverId) => {
    return chats[receiverId]?.unreadCount || 0;
  };

  const sortedUserList = [...userList].sort((a, b) => getLastMessageTimestamp(b._id) - getLastMessageTimestamp(a._id));

  return (
    <Box
      sx={{
        paddingLeft: { xs: "1rem", sm: "5rem", md: "10.5rem" },
        pt: "1rem",
        pb: "7rem",
      }}
    >
           <Typography
        sx={{
          padding: "1rem 0.5rem",
          fontSize: "1.2rem",
          fontWeight: "700",
          boxShadow: " rgba(17, 17, 26, 0.1) 0px 1px 0px ",
          backgroundColor: "#fdffff",
          mb: "1rem",
          fontFamily: "Montserrat",
        }}
      >
        {isAdmin ? "Chats": "Chat"}
      </Typography>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {sortedUserList?.map((user) => (
          <Box
            key={user._id}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ListItem
              sx={{
                width: "95%",
                height: "2.5rem",
                mt: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={() => handleChatClick(user._id)}
            >
              <ListItemAvatar sx={{ width: "5%" }}>
                <Avatar
                  src={user?.avatar}
                  sx={{ width: "2.7rem", height: "2.7rem" }}
                />
              </ListItemAvatar>

              <Box sx={{ width: "95%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    fontFamily:"Montserrat" 
                  }}
                >
                  <Box>
                    <Typography>{user.name}</Typography>

                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <Typography variant="body2" color="textSecondary" sx={{fontFamily:"Montserrat" }}>
                        {getLastMessage(user._id)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                    }}
                  >
                    {getUnreadCount(user._id) !== 0 && (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          border: "1px solid #FE5E00",
                          borderRadius: "50%",
                          width: "1rem",
                          height: "1rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#FE5E00",
                          color: "white",
                          fontSize: "0.8rem",
                          fontFamily:"Montserrat" 
                        }}
                      >
                        {getUnreadCount(user._id)}
                      </Typography>
                    )}

                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily:"Montserrat" }}>
                      {getLastMessageTime(user._id)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ListItem>
            <hr style={{ width: "95%" }} />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Chats;
