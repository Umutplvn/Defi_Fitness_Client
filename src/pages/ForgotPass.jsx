import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "../components/logo";
import { Link, useNavigate } from "react-router-dom";
import { logoStyle, textFieldStyle, linkStyle } from "../styles/registerStyle";
import { toast } from "react-hot-toast";
import loadingGif from "../assets/loading.gif";
import useAuthCall from "../hooks/useAuthCall";

const ForgotPass = () => {
  const { forgotPass } = useAuthCall();
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    email: "",
  });

  const customErrorStyle = {
    backgroundColor: '#FCD8DC',
    color: '#A94442',
    textAlign: 'center',
    borderRadius: '8px',
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
       forgotPass({email:info.email});
      navigate("/")
    } catch (error) {
      toast("Request failed. Please try again.", {
        style: customErrorStyle, 
      })
    } finally {
      setLoading(false);
    }
  };

  const frameStyle = {
    filter: loading ? `blur(5px)` : `blur(0px)`,
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  };

  return (
    <Box>
      <Box
        display={{ position: "relative" }}
        sx={{ width: "%100", display: "flex", justifyContent: "center" }}
      >
        {loading && (
          <img
            src={loadingGif}
            alt="loading"
            style={{
              width: "5rem",
              position: "absolute",
              zIndex: "3",
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
            DEFI RESET PASSWORD
          </Typography>
          <Typography sx={{m:"1rem",   color: '#545665'}}>
          Enter your email address below and we'll email you a link that will allow you to change your password.

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
            Back to{" "}
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
            Back to{" "}
            <Link
              to="/login"
              style={{ textDecoration: "underline", color: "#044985" }}
            >
              Login
            </Link>{" "}
          </Link>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPass;
