import React, { useState } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Box, Typography, Button } from "@mui/material";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-hot-toast";
import useAuthCall from "../hooks/useAuthCall";

const ChangePass = ({ handleToggle, openIndex }) => {
  const [passCheck1, setPassCheck1] = useState("");
  const [passCheck2, setPassCheck2] = useState("");
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);

  const { passwordUpdate } = useAuthCall();

  const setPass = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const setPass2 = (e) => {
    e.preventDefault();
    setVisible2(!visible2);
  };

  const handleSubmit = () => {
    if (!(passCheck1 == passCheck2)) {
      toast.error("Passwords do not match!");
    } else if (passCheck1 == passCheck2 && passCheck1.length < 8) {
      toast.error("At least 8 characters.");
    } else {
      passwordUpdate({ password: passCheck1 });
      setPassCheck1("")
      setPassCheck2("")
      setTimeout(() => {
        handleToggle(3)
      }, 1500);
      
    }
  };

  const toggle=()=>{
   handleToggle(3)
   setPassCheck1("")
   setPassCheck2("")
   setVisible(true)
   setVisible2(true)
  }

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
              <KeyRoundedIcon sx={{ fontSize: "1.9rem", color: "black" }} />
              <Typography sx={{ fontSize: "1rem" }}>
                Change Password
              </Typography>
            </Box>
          </React.Fragment>
        }
        action={
          <IconButton
            onClick={toggle}
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
          backgroundColor: "rgba(211,211,211,0.4)",
        }}
      >
        <Collapse in={openIndex === 3} timeout="auto" unmountOnExit>
          <CardContent>
            <Container
              sx={{
                height: 150,
                lineHeight: 2,
              }}
            >
              <Box
                type="form"
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {visible ? (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                    >
                      <TextField
                        variant="standard"
                        id="new_password1"
                        label="Password"
                        name="new_password1"
                        type="password"
                        sx={{ width: "100%" }}
                        onChange={(e) => setPassCheck1(e.target.value)}
                        autoFocus
                        value={passCheck1}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          height: "30px",
                          justifyContent: "center",
                          alignItems: "start",
                        }}
                      >
                        <VisibilityOffIcon onClick={setPass} />
                      </Box>
                    </Box>
             
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                    >
                      <TextField
                        variant="standard"
                        id="new_password1"
                        label="Password"
                        name="new_password1"
                        type="text"
                        sx={{ width: "100%" }}
                        onChange={(e) => setPassCheck1(e.target.value)}
                        value={passCheck1}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          height: "30px",
                          justifyContent: "center",
                          alignItems: "start",
                        }}
                      >
                        <VisibilityIcon onClick={setPass} />
                      </Box>
                    </Box>
                   
                  </Box>
                )}

                {visible2 ? (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                    >
                      <TextField
                        variant="standard"
                        id="new_password1"
                        label="Password"
                        name="new_password1"
                        type="password"
                        sx={{ width: "100%" }}
                        onChange={(e) => setPassCheck2(e.target.value)}
                        value={passCheck2}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          height: "30px",
                          justifyContent: "center",
                          alignItems: "start",
                        }}
                      >
                        <VisibilityOffIcon onClick={setPass2} />
                      </Box>
                    </Box>
                  
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                    >
                      <TextField
                        variant="standard"
                        id="new_password1"
                        label="Password"
                        name="new_password1"
                        type="text"
                        sx={{ width: "100%" }}
                        onChange={(e) => setPassCheck2(e.target.value)}
                        value={passCheck2}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          height: "30px",
                          justifyContent: "center",
                          alignItems: "start",
                        }}
                      >
                        <VisibilityIcon onClick={setPass2} />
                      </Box>
                    </Box>
                   
                  </Box>
                )}
                <Button type="submit" 
                 sx={{
                  backgroundColor: "#9fa0a0",
                  color: "white",
                  borderRadius: "1rem",
                  width: "5rem",
                  transition: "0.4s",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                onClick={handleSubmit}>
                  SAVE
                </Button>
              </Box>
            </Container>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
};

export default ChangePass;
