import React from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Box, Button, Typography } from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";

const AccountPage = ({ handleToggle, openIndex }) => {
  const { membership } = useSelector((state) => state.auth);
  const navigate=useNavigate()
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
              <KeyIcon sx={{ fontSize: "1.5rem", color: "#2A75D1" }} />
              <Typography sx={{ fontSize: "1rem" }}>Account</Typography>
            </Box>
          </React.Fragment>
        }
        action={
          <IconButton
            onClick={() => handleToggle(4)}
            aria-label="expand"
            size="small"
          >
            {openIndex === 3 ? (
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
                height: 80,
                lineHeight: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "1.5rem",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "28rem",
                      mt: "-1.5rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "0.5rem" }}>
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontFamily: "Montserrat",
                          fontSize: "0.9rem",
                        }}
                      >
                        Current Plan:
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "0.9rem" }}
                        className="shiny-gold"
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: membership }}
                        />
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        type="submit"
                        onClick={()=>navigate('/profile/changeplan')}
                        sx={{
                          textAlign: "center",
                          transition: "0.2s",
                          color: "black",
                          width: "4rem",

                          fontWeight: "600",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          "&:hover": {
                            color: "#FE5E00",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <EditIcon sx={{ fontSize: "1rem", mr: "0.2rem" }} />
                        EDIT
                      </Button>
                    </Box>
                  </Box>
                  <hr style={{ width: "28rem" }} />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "28rem",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                      }}
                    >
                      Delete your account?
                    </Typography>

                    <Button
                      type="submit"
                      sx={{
                        textAlign: "center",
                        transition: "0.2s",
                        color: "black",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        display: "flex",
                        width: "4rem",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                          color: "red",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <HighlightOffIcon
                        sx={{ fontSize: "1rem", mr: "0.2rem" }}
                      />
                      yes
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
};

export default AccountPage;
