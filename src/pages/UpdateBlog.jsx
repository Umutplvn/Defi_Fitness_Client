import React, { useState, useRef } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import formatDateTime from "../helper/formatDateTime";

const UpdateBlog = () => {
  const { blogId } = useParams();
  const { blogs } = useSelector((state) => state.appData);
  const blog = blogs.filter((item) => item._id == blogId);
  const [info, setInfo] = useState({
    content: blog[0]?.content,
  });

  const editor = useRef(null);

  const handleEditorChange = (newContent) => {
    setInfo({ ...info, content: newContent });
  };

  return (
    <Box
      sx={{
        ml: { xs: "0", sm: "6rem", md: "12rem" },
        mb: "7rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        pt: "2rem",
        maxWidth: "1536px",
        width: "100wh",
      }}
    >
      <Box
        sx={{
          width: "100%",
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
          
        <JoditEditor
          ref={editor}
          value={info.content}
          onChange={handleEditorChange}
          config={{
            readonly: false, // edit state
            height: 400,
          }}
        />
          <Box sx={{ display: "flex", justifyContent: "center", p: "1rem" }}>
            
            <img
              style={{
                width: "100%",
                maxWidth: "600px",
                marginBottom: "2rem",
                borderRadius: "1rem",
              }}
              src={blog[0]?.image}
              alt={blog[0]?.title}
            />

            <TextField
              value={info.image}
              sx={{
                fontSize: "0.5rem",
                "& fieldset": {},
              }}
            />
          </Box>
        </Box>
        <TextField
          sx={{
            fontSize: "0.5rem",
            "& fieldset": {
              border: "none",
            },
          }}
          value={info.category_name}
        />

        <TextField
          sx={{
            color: "#FE5E00",
            width: "100%",
            "& fieldset": {
              border: "none",
            },
          }}
          value={info.title}
        />


        <Typography
          sx={{
            width: "100wh",
            p: "0 1rem 0 1rem",
            mt: "1rem",
            fontSize: "0.8rem",
            color: "#757575",
          }}
        >
          {formatDateTime(blog[0]?.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
};

export default UpdateBlog;
