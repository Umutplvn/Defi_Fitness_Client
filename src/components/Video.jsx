import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import introVideo from "../assets/introVideo.mp4";
import Header from "./Header";

const Video = ({ play, setPlay }) => {
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
    <Box     id="video"
    >
          <Header setPlay={setPlay} play={play} />
          <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap:1,
      }}
    >
      
      <video
        width="90%"
        style={{  maxWidth: "900px",
        marginTop: window.innerWidth < 600 ? "3rem" : "2rem"  }}
        controls
        ref={videoRef}
      >
        <source src={introVideo} type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center",   mt: { xs: '3rem', sm: '-1rem' } }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            textAlign: "center",
            fontWeight: "600",
            mt: "1rem",
            p: "1rem",
            color:"black"
          }}
        >         <span
            style={{
              background:
                "linear-gradient(90deg, rgba(0,36,23,1) 5%, rgba(121,9,84,1) 57%, rgba(255,0,0,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
           STEP ONE
 TO YOUR DREAM BODY
          </span>
          &nbsp;
        </Typography>
        <Typography>YOUR JOURNEY STARTS NOW</Typography>
      </Box>
    </Box>
    </Box>
  
  );
};

export default Video;
