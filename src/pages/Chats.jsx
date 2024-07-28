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
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
//! Working way
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const Chats = () => {
  const { listUsers } = useAuthCall();
  const { userId, users, isAdmin } = useSelector((state) => state?.auth);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const members = users?.filter(
    (user) => user?.isAdmin == true && user?._id !== userId
  );
  const admin = users?.filter((user) => user._id !== userId);
  const userList = isAdmin ? admin : members;
  console.log("object", users);

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

  console.log("users", users);

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

  const getUnreadCount = (receiverId) => {
    console.log(chats);
    return chats[receiverId]?.unreadCount || 0;
  };

  return (
    <Box
      sx={{
        paddingLeft: { xs: "1rem", sm: "5rem", md: "10.5rem" },
        pt: "1rem",
      }}
    >
      <Typography sx={{ fontWeight: "800", fontSize: "1.4rem" }}>
        Chats
      </Typography>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {userList?.map((user) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ListItem
              button
              sx={{
                width: "95%",
                height: "2.5rem",
                mt: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
              key={user._id}
              onClick={() => handleChatClick(user._id)}
            >
              <ListItemAvatar sx={{ width: "5%" }}>
                <Avatar
                  src={user?.avatar}
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
                      <Typography variant="body2" color="textSecondary">
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
                        }}
                      >
                        {getUnreadCount(user._id)}
                      </Typography>
                    )}

                    <Typography variant="body2" color="textSecondary">
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
