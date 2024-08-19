import { Box, Typography } from "@mui/material";
import React from "react";
import { FaMessage } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube, FaSpotify } from "react-icons/fa";
import { FaGoogleDrive } from "react-icons/fa";

const Contact = () => {
  // Handler for email link
  const handleMailto = () => {
    window.location.href =
      "mailto:defifitnessapp@gmail.com?subject=Contact Form Submission&body=";
  };

  return (
    <Box
      id="contact"
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      <Typography sx={{ width: "100%", color: "white", fontSize: { xs: "1.2rem", sm: "1.7rem" } }}>
        Contact & Follow
        <hr style={{ border: '1px solid white', width: '100%' }} />
      </Typography>

      <Box sx={{ display: "flex", gap: { xs: "1.4rem", sm: "4rem" }, maxWidth: "600px" }}>
        {/* EMAIL */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "0.6rem",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem' },
              color: '#dfdcdc',
              ':hover': {
                cursor: 'pointer',
                transform: 'scale(1.04)',
                color: 'white',
                transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
              },
            }}
            component={FaMessage}
            onClick={handleMailto}
          />
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            Email Us
          </Typography>
        </Box>

        {/* INSTAGRAM */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "0.6rem",
            textAlign: "center",
          }}
        >
          <a
            href="https://www.instagram.com/dersimizfitness?igsh=ejVjMmxrNXFwcWRx" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem' },
                color: '#dfdcdc',
                ':hover': {
                  cursor: 'pointer',
                  transform: 'scale(1.04)',
                  color: 'white',
                  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                },
              }}
              component={AiFillInstagram}
            />
          </a>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            Instagram
          </Typography>
        </Box>

        {/* YOUTUBE */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "0.6rem",
            textAlign: "center",
          }}
        >
          <a
            href="https://www.youtube.com/@dersimizfitness" // Replace with your YouTube URL
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem' },
                color: '#dfdcdc',
                ':hover': {
                  cursor: 'pointer',
                  transform: 'scale(1.04)',
                  color: 'white',
                  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                },
              }}
              component={FaYoutube}
            />
          </a>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            Youtube
          </Typography>
        </Box>

        {/* SPOTIFY */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "0.6rem",
            textAlign: "center",
          }}
        >
          <a
            href="https://open.spotify.com/show/2OjcX3eklEZwtjVC17HZ9S?si=e6e7501ff34b4d2d" // Replace with your Spotify URL
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem' },
                color: '#dfdcdc',
                ':hover': {
                  cursor: 'pointer',
                  transform: 'scale(1.04)',
                  color: 'white',
                  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                },
              }}
              component={FaSpotify}
            />
          </a>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            Spotify
          </Typography>
        </Box>
{/* DRIVE */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "0.6rem",
            textAlign: "center",
          }}
        >
          <a
            href="https://drive.google.com/drive/folders/1V602-_rywhVRQWFPeMG2V5G3GFWXyUtq" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem' },
                color: '#dfdcdc',
                ':hover': {
                  cursor: 'pointer',
                  transform: 'scale(1.04)',
                  color: 'white',
                  transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
                },
              }}
              component={FaGoogleDrive}
            />
          </a>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            Drive
          </Typography>
        </Box>
      </Box>
      <hr style={{ border: '1px solid white', width: '100%' }} />
    </Box>
  );
};

export default Contact;
