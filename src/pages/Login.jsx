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
const Login = () => {
  const { login } = useAuthCall();
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitFunc = async () => {
    setLoading(true);
    try {
      await login(info);
    } catch (error) {
      toast.error("Login failed. Please try again.");
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
        ? toast("Password must be at least 8 character.")
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
            MEMBERS LOGIN
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
          <Box sx={{ minHeight: "6rem" }}>
            <TextField
              disabled={loading}
              name="password"
              required
              type={showPassword ? "text" : "password"}
              fullWidth
              id="password"
              placeholder="PASSWORD *"
              value={info.password}
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {loading ? (
            <Link style={linkStyle}>
              {" "}
              Not a member yet?{" "}
              <Link style={{ textDecoration: "underline", color: "#044985" }}>
                Please Join Here
              </Link>{" "}
            </Link>
          ) : (
            <Link style={linkStyle}>
              {" "}
              Not a member yet?{" "}
              <Link
                to="/register"
                style={{ textDecoration: "underline", color: "#044985" }}
              >
                Please Join Here
              </Link>{" "}
            </Link>
          )}
          {loading ? (
            <Link style={linkStyle}>
              {" "}
              Forgot your password?{" "}
              <Link style={{ textDecoration: "underline", color: "#044985" }}>
                Click Here
              </Link>{" "}
            </Link>
          ) : (
            <Link style={linkStyle}>
              {" "}
              Forgot your password?{" "}
              <Link
                to="/forgotpass"
                style={{ textDecoration: "underline", color: "#044985" }}
              >
                Click Here
              </Link>{" "}
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
