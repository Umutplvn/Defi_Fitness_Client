import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import useDataCall from "../hooks/useDataCall";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import spinner from "../assets/spinner.svg";

const CreateBlog = () => {
  const editor = useRef(null);
  const [blogData, setBlogData] = useState({ content: "", tags: [] });
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const { createBlog } = useDataCall();
  const navigate = useNavigate();

  const openWidget = () => {
    if (window.cloudinary) {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dhaltl88a",
          uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            const imageUrl = result.info.secure_url;
            setBlogData((prevBlogData) => ({
              ...prevBlogData,
              content: `${prevBlogData.content}<img src="${imageUrl}" alt="Uploaded Image"/>`,
            }));
          } else if (error) {
            console.error("Error uploading image:", error);
          }
        }
      );
      myWidget.open();
    } else {
      console.error("Cloudinary is not loaded.");
    }
  };

  const config = useMemo(
    () => ({
      height: "100vh",
      readonly: false,
      width: "100wh",
    }),
    []
  );

  const handleSubmit = async () => {
    setLoading(true);
    if (blogData?.content?.trim() === "") {
      toast.error("Blog content cannot be empty.");
      return;
    }

    try {
      await createBlog(blogData);
      setBlogData({ content: "", tags: [] });
      toast.error("Blog successfully created");
      navigate("/blogs");
    } catch (error) {
      console.error("Error posting content:", error);
    }
    setLoading(false);
  };

  const handleTags = () => {
    if (tag.trim() !== "") {
      setBlogData((prevBlogData) => ({
        ...prevBlogData,
        tags: [...prevBlogData?.tags, tag.trim()],
      }));
      setTag("");
    }
  };

  const handleDeleteTag = (tag) => {
    const filterTag = blogData.tags.filter((item) => item !== tag);
    setBlogData({ ...blogData, tags: filterTag });
  };

  const formatTag = (tag) => {
    if (!tag) return "";
    return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
  };

  return (
    <Box
      sx={{
        pl: { xs: "0", sm: "4.4rem", md: "9.9rem" },
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <Box sx={{ height: "100vh", width: "100wh", overflow: "hidden" }}>
        <JoditEditor
          ref={editor}
          value={blogData.content}
          config={config}
          tabIndex={1}
          onChange={(newContent) =>
            setBlogData((prevBlogData) => ({
              ...prevBlogData,
              content: newContent,
            }))
          }
        />
      </Box>
      
      {loading && (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
            backdropFilter: "blur(5px)",
          }}
        >
          <img
            style={{
              width: "100px",
              zIndex: 3,

            }}
            src={spinner}
            alt="Loading"
          />
        </Box>
      )}

      <Box
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          justifyContent: "center",
          bottom: "0",
          backgroundColor: "white",
          pb: { xs: "4rem", md: "3rem" },
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <hr style={{ width: "100%", marginBottom: "1rem" }} />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              width: "100%",
              pl: "0.5rem",
              height: "2rem",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <TextField
              variant="outlined"
              value={formatTag(tag)}
              placeholder="Enter tag(s)..."
              onChange={(e) => setTag(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleTags}>
                      <AddCircleIcon
                        sx={{ color: "black", marginRight: "-0.8rem" }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: "20rem",
                mt: "-1.5rem",
                width: { xs: "15rem", md: "20rem" },
                borderRadius: "2rem",
                "& .MuiOutlinedInput-root": {
                  height: "2.2rem",
                  "& fieldset": {
                    borderColor: "black",
                    borderRadius: "2rem",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "& input": {
                    height: "auto",
                    padding: "0.75rem",
                  },
                },
              }}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {blogData?.tags?.map((item, index) => (
                <Typography
                  key={index}
                  sx={{
                    display: "flex",
                    gap: "0.3rem",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.2rem",
                    backgroundColor: "#f3f3f3",
                    borderRadius: "1rem",
                    fontSize: "0.8rem",
                    fontFamily: "Montserrat",
                  }}
                  onClick={() => handleDeleteTag(item)}
                >
                  <CancelIcon />
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: "1rem", mt: "-0.5rem" }}>
            <Button
              variant="contained"
              sx={{
                height: "2rem",
                textAlign: "center",
                backgroundColor: "#a5a5a5",
                color: "white",
                borderRadius: "0.7rem",
                width: "5rem",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              onClick={handleSubmit}
            >
              Post
            </Button>

            <Button
              variant="contained"
              onClick={openWidget}
              sx={{
                height: "2rem",
                textAlign: "center",
                backgroundColor: "#a5a5a5",
                color: "white",
                borderRadius: "0.7rem",
                width: "5rem",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              Upload
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateBlog;
