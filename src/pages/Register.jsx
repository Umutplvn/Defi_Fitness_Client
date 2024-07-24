import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "../components/logo";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { logoStyle, textFieldStyle, linkStyle } from "../styles/registerStyle";
import useAuthCall from "../hooks/useAuthCall";
import { toast } from "react-hot-toast";
import loadingGif from "../assets/loading.gif";

const Register = () => {
  const { register } = useAuthCall();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const customErrorStyle = {
    backgroundColor: "#FCD8DC",
    color: "#A94442",
    textAlign: "center",
    borderRadius: "8px",
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitFunc = async () => {
    setLoading(true);
    try {
      await register(info);
    } catch (error) {
      toast("Registration failed. Please try again.", {
        style: customErrorStyle,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      info.password.length < 8
        ? toast("Password must be at least 8 character.", {
            style: customErrorStyle,
          })
        : submitFunc();
    }
  };

  const frameStyle = {
    filter: loading ? `blur(5px)` : `blur(0px)`,
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  };


  return (

    <Box sx={
      loading? {height: "100vh",
      color: "white",
      display: "flex",
      justifyContent:"center",
      position:"relative"} 
      :
      { height: "100vh",
    color: "white",
    display: "flex",
    justifyContent:"center",
    position:"relative",
    borderWidth: "0 4px 0 0",
    borderStyle: "solid",
    borderColor: "white",
    borderTopRightRadius: "1rem",
    overflow: "hidden",
    "&::after": {
      content: '""',
      width: "2px",
      position:"fixed",
      right:{ xs: "1rem", md: "10rem", xl: "15rem"},
      backgroundColor:"linear-gradient(to bottom, #fec6a6 0%, #FE5E00 50%,#FE5E00) 100%)",
      height: "100%",
      background:
        "linear-gradient(to bottom, #fec6a6 0%, #FE5E00 50%,#FE5E00) 100%)",
      animation: "shine 4s infinite",
      borderRadius: "0 1rem 1rem 0",
      boxShadow: "0 0 4px #FE5E00",
    },
    "@keyframes shine": {
      "0%": {
        transform: "translateY(-100%)",
        
      },
      "100%": {
        transform: "translateY(100%)",
      },
    }}
  
  }
    
    >
      <Box
                sx={{position:"fixed", display: "flex", justifyContent: "center", alignItems:"center", height:"100vh", zIndex:"3" }}

      >
         {loading && (
          <img
            src={loadingGif}
            alt="loading"
            style={{
              width: "5rem",
              position: "absolute",
              top: "50%",
            }}
          />
        )}
      </Box>
      <Box sx={frameStyle}>
        <Box sx={logoStyle}>
          <Link to="/" disabled={loading}>
            <Logo />
          </Link>
        </Box>
        <Box>
          <Typography
            sx={{ color: "#494b56", fontSize: "1.2rem", fontWeight: "580" }}
          >
            LET'S GET STARTED
          </Typography>
        </Box>

        <Box
          onSubmit={(e) => handleSubmit(e)}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            disabled={loading}
            name="name"
            required
            fullWidth
            id="name"
            autoFocus
            placeholder="NAME *"
            onChange={(e) => handleChange(e)}
            sx={textFieldStyle}
          />

          <TextField
            disabled={loading}
            name="email"
            type="email"
            required
            fullWidth
            id="email"
            autoFocus
            placeholder="EMAIL ADDRESS *"
            sx={textFieldStyle}
            onChange={(e) => handleChange(e)}
          />
          <Box sx={{ minHeight: "6rem" }}>
            <TextField
              disabled={loading}
              name="password"
              required
              type={showPassword ? "text" : "password"}
              fullWidth
              id="password"
              placeholder="PASSWORD *"
              value={info?.password}
              onChange={handleChange}
              sx={textFieldStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {info?.password.length !== 0 ? (
              <Box sx={{ width: "20rem", pl: "1rem" }}>
                {info?.password.length < 8 ? (
                  <Typography
                    sx={{
                      color: "red",
                      textAlign: "start",
                      fontSize: "0.7rem",
                    }}
                  >
                    * At least 8 characters long.
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "green",
                      textAlign: "start",
                      fontSize: "0.7rem",
                    }}
                  >
                    * At least 8 characters long.
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography sx={{ mb: "0.7rem" }}></Typography>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 4,
              mb: 5,
              textAlign: "center",
              backgroundColor: "#F2F2F2",
              color: "#494b56",
              borderRadius: "0.7rem",
              width: "8rem",
              transition: "0.4s",
              "&:hover": {
                backgroundColor: "#000000",
                color: "white",
              },
            }}
          >
            SUBMIT
          </Button>
        </Box>
        {loading ? (
          <Link style={linkStyle}>
            {" "}
            Already a member?{" "}
            <Link
              to="/forgotpass"
              style={{ textDecoration: "underline", color: "#044985" }}
            >
              Login Here
            </Link>{" "}
          </Link>
        ) : (
          <Link style={linkStyle}>
            {" "}
            Already a member?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "underline", color: "#044985" }}
            >
              Login Here
            </Link>{" "}
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default Register;
