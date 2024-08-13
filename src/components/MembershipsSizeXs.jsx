import React, { useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Box, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTrail } from "@react-spring/web";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";
import { useMediaQuery, createTheme } from "@mui/material";

const CustomCarouselPrev = styled("button")({
  position: "relative",
  left: "1.5rem",
  backgroundColor: "transparent",
  border: "black",
  padding: "0",
  zIndex: 10,
  cursor: "pointer",
});

const CustomCarouselNext = styled("button")({
  position: "relative",
  right: "1rem",
  backgroundColor: "transparent",
  border: "none",
  padding: "0",
  zIndex: 10,
  cursor: "pointer",
});

function MembbershipsSizeXs() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const theme = createTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("lg"));
  const cards = [
    {
      title: "Standard",
      subtitle: "Basic",
      price: "Free",
      features: [
        "Access to exclusive blogs",
        "Development monitoring in profiles",
        "Cancel anytime",
      ],
      variant: "outlined",
      color: "neutral",
    },

    {
      title: "PRO",
      subtitle: "Premium",
      price: "19.99$ / month",
      features: [
        "Access to exclusive blogs",
        "Monthly workout plans",
        "Development monitoring in profiles",
        "Cancel anytime",
      ],
      variant: "solid",
      color: "black",
      invertedColors: true,
    },
  ];

  const trail = useTrail(cards.length, {
    from: { opacity: 0, transform: "translate3d(0,40px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    config: { mass: 5, tension: 200, friction: 300 },
  });

  return (
    <Box id="membership" sx={{ width: "100wh", height: "100vh" }}>
      <Carousel
        ref={carouselRef}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          top: "10%",
        }}
        wrap={true}
      >
        {trail.map((props, index) => {
          const card = cards[index];
          return (
            <Carousel.Item key={index} style={{ height: "100%" }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Card
                  variant={card.variant}
                  invertedColors={card.invertedColors}
                  sx={{
                    height: "30rem",
                    width: "20rem",
                    backgroundColor: card.color,
                  }}
                >
                  <Chip size="sm" variant="outlined" color="neutral">
                    {card.title}
                  </Chip>
                  <Typography level="h2">{card.subtitle}</Typography>
                  <Divider inset="none" />
                  <List
                    size="sm"
                    sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}
                  >
                    {card.features.map((feature, idx) => (
                      <ListItem key={idx}>
                        <ListItemDecorator>
                          <Check />
                        </ListItemDecorator>
                        {feature}
                      </ListItem>
                    ))}
                  </List>
                  <Divider inset="none" />
                  <CardActions>
                    <Typography
                      level="title-lg"
                      sx={{ mr: "auto", display: "flex" }}
                    >
                      {card.price}
                  
                    </Typography>
                    <Button
                      variant="soft"
                      color="neutral"
                      endDecorator={<KeyboardArrowRight />}
                      onClick={() => navigate("/register")}
                    >
                      Start now
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100wh",
          height: "100vh",
        }}
      >
        <CustomCarouselPrev
          sx={{ bottom: { xs: "15rem", sm: "60%" } }}
          onClick={() => carouselRef.current.prev()}
        >
          <ArrowBackIosIcon
            style={{ fill: "black", width: "2rem", height: "2rem" }}
          />
        </CustomCarouselPrev>

        <CustomCarouselNext
          sx={{ bottom: { xs: "15rem", sm: "60%" } }}
          onClick={() => carouselRef.current.next()}
        >
          <ArrowForwardIosIcon
            style={{ fill: "black", width: "2rem", height: "2rem" }}
          />
        </CustomCarouselNext>
      </Box>
    </Box>
  );
}

export default MembbershipsSizeXs;
