import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import loadingGif from "../assets/loading.gif";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { ReactTyped } from "react-typed";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Select from "@mui/material/Select";
import documentSvg from "../assets/documentsvg.png";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Avatar,
  IconButton,
} from "@mui/material";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { toast } from "react-hot-toast";
import ModalUnstyled from "../components/ClearChatModal";

const socket = io("https://defi-chat-backend.onrender.com");

const Chat = () => {
  const { userId, users } = useSelector((state) => state?.auth);
  const { id: chatUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const user = users?.filter((user) => user._id === chatUserId);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const messagesEndRef = useRef(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [drop, setDrop] = React.useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://defi-chat-backend.onrender.com/api/chats/${userId}/${chatUserId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    socket.emit("joinRoom", userId);

    socket.on("message", (newMessage) => {
      if (
        (newMessage.receiverId === userId &&
          newMessage.senderId === chatUserId) ||
        (newMessage.receiverId === chatUserId && newMessage.senderId === userId)
      ) {
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      }
    });
    fetchMessages();

    return () => {
      socket.off("message");
    };
  }, [userId, chatUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //! DOCUMENT
    if (Boolean(file)) {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("receiverId", chatUserId);
      formData.append("file", file);
      setLoading(true);

      try {
        const res = await axios.post(
          "https://defi-chat-backend.onrender.com/uploaddoc",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setMessages([...messages, res.data]);
        setMessage("");
        setImage(null);
        setVideo(null);
        setFile(null);
        toast.success("File uploaded successfully");
      } catch (err) {
        console.error("File upload failed", err);
        toast.error("File upload failed");
      } finally {
        setLoading(false);
      }
      return;
    }
    //! DOCUMENT END

    // ! MESSAGE || !IMAGE || !VIDEO
    if (!message.trim() && !image && !video) {
      return;
    }

    const formData = new FormData();
    formData.append("senderId", userId);
    formData.append("receiverId", chatUserId);
    formData.append("message", message);
    if (image || video) {
      setLoading(true);
      if (image) {
        formData.append("image", image);
      }
      if (video) {
        formData.append("video", video);
      }
    }

    try {
      const response = await axios.post(
        "https://defi-chat-backend.onrender.com/api/messages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessages([...messages, response.data]);
      setMessage("");
      setImage(null);
      setVideo(null);
    } catch (error) {
      console.error("Failed to send message", error);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
      fetchMessages()
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSubmit(e);
    }
  };
  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(
        `https://defi-chat-backend.onrender.com/api/messages/delete/${messageId}`
      );
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
      toast.success("Message deleted successfully.");
    } catch (error) {
      console.error("Failed to delete message", error);
      toast.error("Failed to delete message.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else if (file && file.type.startsWith("video/")) {
      setVideo(file);
    }
  };

  //! DOCUMENT
  const handleDocumentChange = (e) => {
    setFile(e.target.files[0]);
  };

  const ShortenedText = ({ text }) => {
    if (text.length <= 9) {
      return <Typography>{text}</Typography>;
    }
    const firstFive = text.substring(0, 5);
    const lastFour = text.substring(text.length - 4);

    return (
      <Typography>
        {firstFive}...{lastFour}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        height: "98vh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fefefe",
          justifyContent: "space-between",
          padding: "1rem",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          borderBottomLeftRadius: "0.7rem",
          borderBottomRightRadius: "0.7rem",
          height: "4rem",
          position: "fixed",
          zIndex: "2",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Box
            sx={{
              color: "black",
              height: "100%",
              width: "1rem",
              display: "flex",
              alignItems: "start",
              cursor: "pointer",
              mb: "0.8rem",
              mr: "0.5rem",
            }}
            onClick={() => navigate("/chats")}
          >
            <ReplyRoundedIcon
              sx={{
                fontSize: "2rem",
                cursor: "pointer",
                transition: "0.4s",
                "&:hover": { scale: "1.05" },
              }}
            />
          </Box>
          <Avatar src={user[0].avatar} sx={{ ml: "0.5rem" }} />
          <Typography>{user[0].name}</Typography>
        </Box>
        <CancelRoundedIcon
          sx={{
            cursor: "pointer",
            transition: "0.4s",
            "&:hover": { scale: "1.05" },
          }}
          onClick={handleOpen}
        />
      </Box>

      <ModalUnstyled
        handleClose={handleClose}
        open={open}
        setMessages={setMessages}
      />

      <Box
        sx={{
          mb: "3rem",
          mt: "4rem",
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        {messages.length === 0 ? (
          <Box
            sx={{
              backgroundColor: "#faf8f8",
              maxWidth: "22rem",
              padding: "1rem",
              margin: "auto",
              mt: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ReactTyped
              style={{
                fontSize: "0.8rem",
                color: "#434343",
                textAlign: "center",
              }}
              strings={["Messages older than 7 days will be auto-deleted"]}
              typeSpeed={40}
            />
          </Box>
        ) : (
          <List>
            {messages?.slice().map((msg, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.senderId === userId ? "flex-end" : "flex-start",
                }}
              >
                {msg.message && (
                  <MessageBox
                    position={msg.senderId === userId ? "right" : "left"}
                    type="text"
                    text={
                      <>
                        <Box sx={{ position: "relative" }}>
                          <Typography
                            sx={{
                              mt: "-0.2rem",
                              fontSize: "0.9rem",
                              mb: "-1.5rem",
                            }}
                          >
                            {msg.message}
                          </Typography>
                        </Box>

                        {msg.senderId == userId && (
                          <Select
                            IconComponent={(props) => (
                              <KeyboardArrowDownIcon
                                {...props}
                                sx={{ fontSize: "1rem" }}
                              />
                            )}
                            onChange={() => setDrop(!drop)}
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                              width: "1.5rem",
                              height: "1.3rem",
                              position: "absolute",
                              left: "-0.1rem",
                              bottom: "-0.3rem",
                              overflow: "hidden",
                              "& fieldset": {
                                border: "none",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                position: "relative",
                                cursor: "pointer",
                                width: "120px",
                                marginLeft: "1rem",
                                fontSize: "0.8rem",
                                marginRight: "-3rem",
                                pl: "0.4rem",
                              }}
                              onClick={() => deleteMessage(msg._id)}
                            >
                              Delete
                            </Typography>
                          </Select>
                        )}
                      </>
                    }
                    date={new Date(msg.timestamp)}
                    styles={
                      msg.senderId === userId
                        ? {
                            background:
                              "linear-gradient(to top right, #D9FDD3, #fff",
                            maxWidth: "80%",
                            overflow: "hidden",
                          }
                        : {
                            maxWidth: "80%",
                            overflow: "hidden",
                          }
                    }
                  />
                )}
                {msg.image && (
                  <Box sx={{ maxWidth: "320px", maxHeight: "350px" }}>
                    <Box
                      sx={{
                        maxWidth: "310px",
                        maxHeight: "350px",
                        borderRadius: "0.5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "scroll",
                        backgroundColor: "#efefef",
                        marginRight: "1.1rem",
                        marginLeft:"1.1rem",
                        boxShadow:
                          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        backdropFilter: "blur(10px)",
                        position: "relative",
                      }}
                    >
                      {msg.senderId == userId && (
                        <Select
                          IconComponent={(props) => (
                            <KeyboardArrowDownIcon
                              {...props}
                              sx={{
                                fontSize: "1rem",
                                backgroundColor: "white",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                          onChange={() => setDrop(!drop)}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            width: "1.5rem",
                            height: "1.3rem",
                            position: "absolute",
                            left: "0.5rem",
                            top: "0.5rem",
                            zIndex: "22",
                            overflow: "hidden",
                            "& fieldset": {
                              border: "none",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              position: "relative",
                              cursor: "pointer",
                              width: "120px",
                              marginLeft: "1rem",
                              fontSize: "0.8rem",
                              marginRight: "-3rem",
                              pl: "0.4rem",
                            }}
                            onClick={() => deleteMessage(msg._id)}
                          >
                            Delete
                          </Typography>
                        </Select>
                      )}
                      <a
                        target="_blank"
                        href={`https://defi-chat-backend.onrender.com/uploads/${msg.image}`}
                        download={`https://defi-chat-backend.onrender.com/uploads/${msg.image}`}
                      >
                        <img
                          controls
                          src={`https://defi-chat-backend.onrender.com/uploads/${msg.image}`}
                          style={{
                            maxWidth: "310px",
                            maxHeight: "350px",
                            objectFit: "contain",
                          }}
                        />
                      </a>
                    </Box>
                  </Box>
                )}
                {/*  */}
                {msg.video && (
                  <Box sx={{ maxWidth: "320px", maxHeight: "350px" }}>
                    <Box
                      sx={{
                        maxWidth: "310px",
                        maxHeight: "350px",
                        borderRadius: "0.5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "scroll",
                        backgroundColor: "#efefef",
                        marginRight: "1.1rem",
                        marginLeft:"1.1rem",
                        boxShadow:
                          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        backdropFilter: "blur(10px)",
                        position: "relative",
                      }}
                    >
                      {msg.senderId == userId && (
                        <Select
                          IconComponent={(props) => (
                            <KeyboardArrowDownIcon
                              {...props}
                              sx={{
                                fontSize: "1rem",
                                backgroundColor: "white",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                          onChange={() => setDrop(!drop)}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            width: "1.5rem",
                            height: "1.3rem",
                            position: "absolute",
                            left: "0.5rem",
                            top: "0.5rem",
                            zIndex: "22",
                            overflow: "hidden",
                            "& fieldset": {
                              border: "none",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              position: "relative",
                              cursor: "pointer",
                              width: "120px",
                              marginLeft: "1rem",
                              fontSize: "0.8rem",
                              marginRight: "-3rem",
                              pl: "0.4rem",
                            }}
                            onClick={() => deleteMessage(msg._id)}
                          >
                            Delete
                          </Typography>
                        </Select>
                      )}
                      <video
                        controls
                        src={`https://defi-chat-backend.onrender.com/uploads/${msg.video}`}
                        style={{
                          maxWidth: "310px",
                          maxHeight: "350px",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </Box>
                )}

                {msg.file && (
                  <Box sx={{ maxWidth: "320px", maxHeight: "350px" }}>
                    <Box
                      sx={{
                        maxWidth: "310px",
                        maxHeight: "350px",
                        borderRadius: "0.5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        overflow: "scroll",
                        backgroundColor: "white",
                        marginRight: "1.1rem",
                        marginLeft:"1.1rem",
                        boxShadow:
                          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                        backdropFilter: "blur(10px)",
                        position: "relative",
                      }}
                    >
                      {msg.senderId == userId && (
                        <Select
                          IconComponent={(props) => (
                            <KeyboardArrowDownIcon
                              {...props}
                              sx={{
                                fontSize: "1rem",
                                backgroundColor: "white",
                                borderRadius: "50%",
                                border: "1px solid #666666",
                              }}
                            />
                          )}
                          onChange={() => setDrop(!drop)}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            width: "1.5rem",
                            height: "1.3rem",
                            position: "absolute",
                            left: "0.5rem",
                            top: "0.5rem",
                            zIndex: "22",
                            overflow: "hidden",
                            "& fieldset": {
                              border: "none",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              position: "relative",
                              cursor: "pointer",
                              width: "120px",
                              marginLeft: "1rem",
                              fontSize: "0.8rem",
                              marginRight: "-3rem",
                              pl: "0.4rem",
                            }}
                            onClick={() => deleteMessage(msg._id)}
                          >
                            Delete
                          </Typography>
                        </Select>
                      )}
                      <IconButton
                        sx={{ display: "flex", justifyContent: "center" }}
                        component="a"
                        href={`https://defi-chat-backend.onrender.com/uploads/${msg.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        <img style={{ width: "100px" }} src={documentSvg} />
                      </IconButton>
                      <ShortenedText text={msg.file} />
                    </Box>
                  </Box>
                )}
              </ListItem>
            ))}
            {loading && (
              <ListItem
                alignItems="flex-start"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "1rem",
                }}
              >
                <Box
                  sx={{
                    maxWidth: "300px",
                    maxHeight: "340px",
                    borderRadius: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    backgroundColor: "fefefe",
                    boxShadow:
                      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <img
                    src={loadingGif}
                    alt="Loading"
                    style={{
                      width: "200px",
                      height: "220px",
                      padding: "80px",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        )}
      </Box>

      <Box sx={{ position: "fixed", width: "100%", bottom: "0", left: "0", zIndex:"4" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            gap: "0.5rem",
            padding: "1rem",
            width: "100%",
            alignItems: "center",
            height: "3.9rem",
            backgroundColor: "white",
            borderTopRightRadius: "0.5rem",
            borderTopLeftRadius: "0.5rem",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          {(image || video) && (
            <Typography
              sx={{
                position: "fixed",
                marginTop: "-1.7rem",
                left: "2.5rem",
                color: "white",
                backgroundColor: "#94cf70",
                borderRadius: "50%",
                fontSize: "0.7rem",
                width: "0.9rem",
                height: "0.9rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              1
            </Typography>
          )}
          <input
            type="file"
            id="file-upload"
            accept="image/*,video/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-upload">
            <IconButton component="span">
              <LocalSeeIcon sx={{ color: "black" }} />
            </IconButton>
          </label>
          {file && (
            <Typography
              sx={{
                position: "fixed",
                marginTop: "-1.7rem",
                left: "5.5rem",
                color: "white",
                backgroundColor: "#94cf70",
                borderRadius: "50%",
                fontSize: "0.7rem",
                width: "0.9rem",
                height: "0.9rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              1
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <IconButton component="label">
              <AttachFileIcon />
              <input
                accept=".pdf,.doc,.docx"
                type="file"
                hidden
                onChange={handleDocumentChange}
              />
            </IconButton>
          </form>

          <TextField
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                height: "2rem",
                padding: 0,
                borderRadius: "2rem",
              },
              "& .MuiOutlinedInput-input": {
                height: "2rem",
                padding: "0 14px",
              },
              "& .MuiInputLabel-root": {
                height: "2rem",
                lineHeight: "2rem",
              },
            }}
            placeholder="Type..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          <Button
            type="submit"
            sx={{ backgroundColor: "#fefefe", color: "black" }}
          >
            <SendRoundedIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
