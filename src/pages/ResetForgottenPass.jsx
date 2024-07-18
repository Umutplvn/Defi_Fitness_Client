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
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { logoStyle, textFieldStyle, linkStyle } from "../styles/registerStyle";
import useAuthCall from "../hooks/useAuthCall";
import { toast } from "react-hot-toast";
import loadingGif from "../assets/loading.gif";

const ResetForgottenPass = () => {
  const { passwordUpdate } = useAuthCall();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState("")
  const navigate=useNavigate()
  const [info, setInfo] = useState({
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const handleMouseDownConfirm = (event) => {
    event.preventDefault();
  };

  const customErrorStyle = {
    backgroundColor: '#FCD8DC',
    color: '#A94442',
    textAlign: 'center',
    borderRadius: '8px',
  };

  const submitFunc = async () => {
    setLoading(true);
    try {
      await passwordUpdate({password:info.password});
      navigate('/')
    } catch (error) {
      toast("Registration failed. Please try again.", {
        style: customErrorStyle, 
      })
    } finally {
      setLoading(false);
    }
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
RESET PASSWORD </Typography>
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
          <Box sx={{ minHeight: "6rem" }}>
            <TextField
              disabled={loading}
              name="password"
              required
              type={showConfirm ? "text" : "password"}
              fullWidth
              id="password"
              placeholder="CONFIRM PASSWORD *"
              value={confirm}
              onChange={(e)=>setConfirm(e.target.value)}
              sx={textFieldStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirm}
                      onMouseDown={handleMouseDownConfirm}
                    >
                      {showConfirm ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ width: "20rem", pl: "1rem" }}>

            {(confirm !==info?.password && confirm?.length>0) && 
            <Typography    sx={{
              color: "red",
              textAlign: "start",
              fontSize: "0.7rem",
            }}>Passwords must match.</Typography>
            }
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={(info.password>=8 && confirm !==info.password)}
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
    
      </Box>
    </Box>
  );
};

export default ResetForgottenPass;
