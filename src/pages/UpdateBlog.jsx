import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useRef, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import useDataCall from "../hooks/useDataCall";
import { toast } from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import spinner from "../assets/loading.gif";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const UpdateBlog = () => {
  const editor = useRef(null);
  const { axiosWithToken } = useAxios();
  const [blogData, setBlogData] = useState({ content: "" });
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const { updateBlog } = useDataCall();
  const { blogId } = useParams();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const readBlog = async (id) => {
    setLoading(true)
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_BASE_URL}/blog/${id}`
      );
      setBlogData({ content: data.result.content });
      setTags(data.result.tags || []);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      toast.error("Error fetching blog data!");
    }
    setLoading(false)

  };

  useEffect(() => {
    readBlog(blogId);
  }, [blogId]);

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
      placeholder:""
    }),
    []
  );

  const handleSubmit = async () => {
    setLoading(true);

    if (blogData.content.trim() === "") {
      toast("Blog content cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      await updateBlog(blogId, { ...blogData, tags });
      setBlogData({ content: "" });
      setTags([]);
      toast("Blog successfully updated");
      navigate("/blogs");
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Error updating blog!");
    }
    setLoading(false);
  };

  const handleTags = () => {
    if (tag.trim() !== "" && !tags.includes(tag.trim())) {
      setTags((prevTags) => [...prevTags, tag.trim()]);
      setTag("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((item) => item !== tagToDelete));
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
            style={{ width: "90px", zIndex: 3 }}
            src={spinner}
            alt="Loading"
          />
          
        </Box>
      )}
          <hr style={{ width: "100%", marginBottom: "2rem" }} />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          width: "100%",
          pl: "0.5rem",
          height: "5rem",
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
                    sx={{ color: "black" }}
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
          {tags?.map((item, index) => (
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

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            mt: 4,
            mb: 5,
            textAlign: "center",
            backgroundColor: "#000000",
            color: "white",
            borderRadius: "0.7rem",
            width: "5rem",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "#37a629",
              color: "white",
            },
          }}
          onClick={handleSubmit}
        >
          Update
        </Button>

        <Button
          variant="contained"
          onClick={openWidget}
          sx={{
            mt: 4,
            mb: 5,
            textAlign: "center",
            backgroundColor: "#000000",
            color: "white",
            borderRadius: "0.7rem",
            width: "5rem",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "#0078d4",
              color: "white",
            },
          }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateBlog;
