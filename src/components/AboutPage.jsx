import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Box, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function AboutPage() {
  return (
    <Carousel
      id='about'
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      interval={null} 
    >
      <Carousel.Item style={{ height: "90%" }}>
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#282c34",
            color: "white", // Text color
            textAlign: "center",
            padding: "1rem"
          }}
        >
          <Typography variant="h3">First Slide</Typography>
          <Typography variant="body1">
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </Typography>
        </Box>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={{ height: "90%" }}>
        <Box
            sx={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#282c34",
              color: "white", // Text color
              textAlign: "center",
              padding: "1rem"
            }}
        >
          <Typography variant="h3">Second Slide</Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Box>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item style={{ height: "90%" }}>
        <Box
             sx={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#282c34",
              color: "white", // Text color
              textAlign: "center",
              padding: "1rem"
            }}
        >
          <Typography variant="h3">Third Slide</Typography>
          <Typography variant="body1">
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </Typography>
        </Box>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default AboutPage;
