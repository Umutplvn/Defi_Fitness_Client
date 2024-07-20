import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import introVideo from "../assets/introVideo.mp4";

const Video = ({ play }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (play) {
        videoRef.current.muted = true; // Videoyu sessiz yap
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [play]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <video
        width="90%"
        style={{ maxWidth: "900px", marginTop: "2rem", marginBottom: "2rem" }}
        controls
        ref={videoRef}
      >
        <source src={introVideo} type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            textAlign: "center",
            fontWeight: "600",
            mt: 2,
            p: "1rem",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(90deg, rgba(0,36,23,1) 5%, rgba(121,9,84,1) 57%, rgba(255,0,0,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SUCCESS
          </span>
          &nbsp;ISN'T FOR EVERYONE
        </Typography>
        <Typography>It’s for those who do whatever it takes.</Typography>
      </Box>
    </Box>
  );
};

export default Video;
