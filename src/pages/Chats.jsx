import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const Chats = () => {
  const { listUsers } = useAuthCall();
  const { userId, users } = useSelector((state) => state?.auth);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const members = users.filter((user) => user._id !== userId);

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
  }, [userId]);

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
              message.receiverId === userId ? { ...message, read: true } : message
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
    const lastMessage = userChats.sort((a, b) => b.timestamp - a.timestamp)[0];
    return lastMessage ? lastMessage.message : "No messages yet";
  };

  const getLastMessageTime = (receiverId) => {
    const userChats = chats[receiverId]?.messages || [];
    const lastMessage = userChats.sort((a, b) => b.timestamp - a.timestamp)[0];
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

  const isMessageRead = (receiverId) => {
    const userChats = chats[receiverId]?.messages || [];
    const lastMessage = userChats.sort((a, b) => b.timestamp - a.timestamp)[0];
    return lastMessage ? lastMessage.read : false;
  };

  const getUnreadCount = (receiverId) => {
    return chats[receiverId]?.unreadCount || 0;
  };

  return (
    <Box
      sx={{
        paddingLeft: { xs: "1rem", sm: "5rem", md: "10.5rem" },
        pt: "1rem",
      }}
    >
      <Typography sx={{ fontWeight: "800", fontSize: "1.2rem" }}>
        Chats
      </Typography>
      <List>
        {members?.map((user) => (
          <ListItem
            button
            sx={{
              width: "100wh",
              display: "flex",
              justifyContent: "space-between",
            }}
            key={user._id}
            onClick={() => handleChatClick(user._id)}
          >
            <ListItemAvatar sx={{ width: "5%" }}>
              <Avatar
                src={user.avatar}
                sx={{ width: "3rem", height: "3rem" }}
              />
            </ListItemAvatar>

            <Box sx={{ width: "95%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <Box>
                  <Typography>{user.name}</Typography>

                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Typography
                      variant="body2"
                      color={
                        isMessageRead(user._id) ? "textSecondary" : "primary"
                      }
                    >
                      {isMessageRead(user._id) ? "Read" : "Unread"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {getLastMessage(user._id)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {`(${getUnreadCount(user._id)} unread)`}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="textSecondary">
                  {getLastMessageTime(user._id)}
                </Typography>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Chats;
