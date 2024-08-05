import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import formatDateTime from "../helper/formatDateTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import spinner from "../assets/spinner.svg";
import useDataCall from "../hooks/useDataCall";
import useAuthCall from "../hooks/useAuthCall";
import IconButton from "@mui/joy/IconButton";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import useAxios from "../hooks/useAxios";
import Comments from "../components/Comments";
import parse from "html-react-parser";

const BlogRead = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const { likeBlog } = useDataCall();
  const { saveBlog } = useAuthCall();
  const { userId, savedBlog } = useSelector((state) => state?.auth);
  const { axiosWithToken } = useAxios();
  const [show, setShow] = useState(false);

  const readBlog = async () => {
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_BASE_URL}/blog/${blogId}`
      );

      setBlog(data.result);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      toast.error("Error fetching blog data!");
    }
  };

  const handleLikeBlog = async () => {
    try {
      await likeBlog({ blogId });
      readBlog();
    } catch (error) {
      console.error("Error liking blog:", error);
      toast.error("Error liking blog!");
    }
  };

  const handleSaveBlog = async () => {
    try {
      await saveBlog({ blogId });
      readBlog();
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Error saving blog!");
    }
  };
  const handleContent = (content) => {
    return parse(content, {
      replace: (domNode) => {
        if (domNode.name === "img") {
          domNode.attribs.class = `${
            domNode.attribs.class || ""
          } resized-image`;
          domNode.attribs.style =
            "width: 100%; max-height:270px; object-fit: contain; border-radius:1rem;"; 
        }
      },
    });
  };

  useEffect(() => {
    readBlog();
  }, [blogId]);

  if (!blog) {
    return (
      <Box
        sx={{
          width: "100wh",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            ml: { sm: "4rem", md: "10rem" },
            width: { xs: "8rem", md: "10rem" },
            mt: "4rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img style={{ width: "100%" }} src={spinner} alt="Loading" />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100wh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          ml: { xs: "0", sm: "6rem", md: "12rem" },
          mb: "2rem",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          pt: "2rem",
          maxWidth: "1536px",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100wh",
              maxWidth: "1532px",
              pr: { xs: "1rem", md: "3rem" },
              pl: "1rem",
              height: "auto",
              WebkitBoxOrient: "vertical",
              lineHeight: "1.2em",

              "&::-webkit-scrollbar": {
                width: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "transparent",
              },
            }}
          >
            {handleContent(blog.content)}
          </Box>

          <Typography
            sx={{
              width: "100wh",
              p: "0 1rem 0 1rem",
              mt: "1rem",
              fontSize: "0.8rem",
              color: "#757575",
            }}
          >
            {formatDateTime(blog?.createdAt)}
          </Typography>
        </Box>

        <Box
          sx={{
            p: "0 1rem 0 1rem",
            display: "flex",
            justifyContent: "space-between",
            mt: "2rem",
            mb: show ? "-1rem" : "4rem",
          }}
        >
          <Box>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={handleLikeBlog}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "2.4rem",
                }}
              >
                {blog?.likes.some((like) => like === userId) ? (
                  <FavoriteIcon
                    style={{
                      fontSize: "1.5rem",
                      marginRight: "0.1rem",
                      color: "red",
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    style={{
                      fontSize: "1.5rem",
                      marginRight: "0.1rem",
                    }}
                  />
                )}
                <Typography sx={{ fontSize: "1rem", color: "#535353" }}>
                  {blog?.likes_n}
                </Typography>
              </Box>
            </IconButton>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ width: "2.6rem", textAlign: "start" }}
              onClick={() => setShow(!show)}
            >
              <MessageOutlinedIcon
                style={{ fontSize: "1.5rem", marginRight: "0.2rem" }}
              />
              <Typography sx={{ fontSize: "1rem", color: "#535353" }}>
                {blog?.comments.length}
              </Typography>
            </IconButton>
          </Box>
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ pr: { xs: "1rem", md: "2rem" } }}
            onClick={handleSaveBlog}
          >
            {savedBlog.some((save) => save._id === blog._id) ? (
              <BookmarkIcon style={{ fontSize: "1.5rem" }} />
            ) : (
              <BookmarkBorderIcon style={{ fontSize: "1.5rem" }} />
            )}
          </IconButton>
        </Box>
      </Box>
      {/* COMMENTS SECTION */}
      <Box
        sx={{
          ml: { sm: "4rem", md: "10rem" },
          pl: { xs: "1rem", sm: "3rem" },
          pr: "1rem",
          width: "100wh",
          mt: "4rem",
          display: "flex",
          maxWidth: "1532px",
        }}
      >
        {show && <Comments blog={blog} setBlog={setBlog} />}
      </Box>
    </Box>
  );
};

export default BlogRead;
