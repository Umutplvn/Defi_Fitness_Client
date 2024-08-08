import { Box, Button, NativeSelect, Select } from "@mui/material";
import React, { useRef, useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import useDataCall from "../hooks/useDataCall";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";

const WorkoutPlan = () => {
  const { createBlog } = useDataCall();
  const [workoutData, setWorkoutData] = useState({ content: "" });
  const { users } = useSelector((state) => state.auth);
  const userInfo = [
    ...users,
    { name: "Level 1", _id: 1 },
    { name: "Level 2", _id: 2 },
    { name: "Level 3", _id: 3 },
    { name: "Level 4", _id: 4 },
    { name: "Level 5", _id: 5 },
  ];
  const [to, setTo] = useState("");
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const editor = useRef(null);

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
            setWorkoutData((prevBlogData) => ({
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

  console.log("userInfo", workoutData);

  const config = useMemo(
    () => ({
      height: "100vh",
      readonly: false,
    }),
    []
  );

  const handleSubmit = async () => {
    if (workoutData?.content?.trim() === "") {
      toast("Blog content cannot be empty.");
      return;
    }

    try {
      await createBlog(workoutData);
      setWorkoutData({ content: "" });
      toast("Blog successfully created");
      navigate("/blogs");
    } catch (error) {
      console.error("Error posting content:", error);
    }
  };

  return (
    <Box
      sx={{
        pl: { xs: "0", sm: "4.4rem", md: "9.9rem" },
        display: "flex",
        flexDirection: "column",
        maxWidth: "1536px",
        width: "100%",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <Box sx={{ height: "100vh", overflow: "hidden" }}>
        <JoditEditor
          ref={editor}
          value={workoutData.content}
          config={config}
          tabIndex={1}
          onChange={(newContent) => setWorkoutData({ content: newContent })}
        />
      </Box>
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "rem",
          width: "100%",
          justifyContent: "center",
          bottom: "0",
          backgroundColor: "white",
          pb: { xs: "4rem", md: "3rem" },
        }}
      >
        <FormControl sx={{ width: "90%", pl: "2rem", pr: "2rem" }}>
          <NativeSelect
            onChange={(e) => setInfo({ ...info, info: e.target.value })}
            defaultValue=""
          >
            <option style={{ color: "red" }} value="" disabled hidden>
              To:
            </option>
            {userInfo.map((item) => (
              <option value={item._id}>{item.name}</option>
            ))}
          </NativeSelect>
        </FormControl>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center",
          }}
        >
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
  );
};

export default WorkoutPlan;