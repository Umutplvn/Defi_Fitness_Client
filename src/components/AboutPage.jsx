import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Box, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTrail, a } from "@react-spring/web";
import "../styles/aboutCarousel.css"; // Make sure to import the CSS file

function AboutPage() {
  const items = [
    {
      title: "Personalized Training Programs"
    },
    {
      title: "Access Expert Articles and Videos"
    },
    {
      title: "Track Your Personal Growth"
    },
    {
      title: "Achieve Your Goals with <span class='shiny-gold'>DEFI</span>"
    }
  ];

  const trail = useTrail(items.length, {
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    config: { mass: 5, tension: 200, friction: 300 }
  });

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
      {trail.map((props, index) => (
        <Carousel.Item key={index} style={{ height: "90%" }}>
          <Box
            sx={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              justifyContent: "center",
              backgroundColor:"black",
              color: "white",
              textAlign: "center",
              padding: "1rem"
            }}
          >
            <a.div style={props}>
              <Typography variant="h3" className="shiny-text">
                {index === items.length - 1 ? (
                  <span dangerouslySetInnerHTML={{ __html: items[index].title }} />
                ) : (
                  items[index].title
                )}
              </Typography>
            </a.div>
            <a.div style={props}>
              <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                {items[index].content}
              </Typography>
            </a.div>
          </Box>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default AboutPage;
