import React from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { Link } from "react-router-dom";

const ContactMe = ({ handleToggle, openIndex }) => {
  return (
    <Card
      sx={{
        minWidth: 300,
        border: "1px solid rgba(211,211,211,0.6)",
      }}
    >
      <CardHeader
        title={
          <React.Fragment>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailRoundedIcon sx={{ fontSize: "1.9rem", color: "#979797" }} />
              <Typography sx={{ fontSize: "1rem" }}>Contact Me </Typography>
            </Box>
          </React.Fragment>
        }
        action={
          <IconButton
            onClick={() => handleToggle(4)}
            aria-label="expand"
            size="small"
          >
            {openIndex === 4 ? (
              <Box
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#d1cccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "2rem",
                  height: "2rem",
                }}
              >
                <KeyboardArrowUpIcon />
              </Box>
            ) : (
              <Box
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#d1cccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "2rem",
                  height: "2rem",
                }}
              >
                <KeyboardArrowDownIcon />
              </Box>
            )}
          </IconButton>
        }
      ></CardHeader>
      <Box
        sx={{
          backgroundColor: "white",
        }}
      >
        <Collapse in={openIndex === 4} timeout="auto" unmountOnExit>
          <CardContent>
            <Container
              sx={{
                height: 30,
                lineHeight: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "1.5rem",
                  justifyContent: "center",
                }}
              >
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  to={"https://github.com/Umutplvn"}
                >
                  <i
                    style={{
                      fontSize: "2rem",
                      color: "#000000",
                      marginBottom: "1rem",
                      boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px; ",
                    }}
                    class="fa-brands fa-github"
                  ></i>
                </Link>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  to={"https://www.linkedin.com/in/umut-pehlivan-817b28174/"}
                >
                  <i
                    style={{
                      fontSize: "2rem",
                      color: "#2777B5",
                      marginBottom: "1rem",
                    }}
                    className="fa-brands fa-linkedin"
                  ></i>
                </Link>
              </Box>
            </Container>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
};

export default ContactMe;
