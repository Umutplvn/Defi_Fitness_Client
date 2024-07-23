import { Box, Typography } from "@mui/joy";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import formatDateTime from "../helper/formatDateTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const BlogRead = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  const readBlog = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/blog/${blogId}`
      );
      setBlog(data);
    } catch (error) {
      toast.error("Error fetching blog data!");
    }
  };
  console.log(blog);
  useEffect(() => {
    readBlog();
  }, [blogId]);

  if (!blog) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box
      sx={{
        ml: { xs: "0", sm: "6rem", md: "12rem" },
        mb:"8rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        pt: "3rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", p: "1rem" }}>
          <img
            style={{
              width: "100%",
              maxWidth: "600px",
              marginBottom: "2rem",
              borderRadius: "1rem",
            }}
            src={blog?.result.image}
          />
        </Box>
      </Box>
      <Typography sx={{ textTransform: "capitalize", p: "0 1rem 0 1rem", fontWeight: "800", textAlign:"center", color:"#FE5E00" }}>
                {blog?.result?.title}
            </Typography>
            <Typography sx={{ p: "0 1rem 0 1rem", mt:"1rem"}}>
                {blog?.result.content}
            </Typography>
    </Box>
  );
};

export default BlogRead;
