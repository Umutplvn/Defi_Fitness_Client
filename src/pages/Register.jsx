import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Logo from "../components/logo";
import { Link } from "react-router-dom";
import {
  logoStyle,
  textFieldStyle,
  linkStyle,
  frameStyle,
} from "../styles/registerStyle";
import useAuthCall from "../hooks/useAuthCall";

const Register = () => {

  const { register } = useAuthCall();

  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     register(info);
  };

  return (
    <Box sx={frameStyle}>
      <Box sx={logoStyle}>
        <Link to="/">
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
          name="email"
          required
          fullWidth
          id="email"
          autoFocus
          placeholder="EMAIL ADDRESS *"
          sx={textFieldStyle}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="password"
          required
          fullWidth
          id="password"
          autoFocus
          placeholder="PASSWORD *"
          onChange={(e) => handleChange(e)}
          sx={textFieldStyle}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 4,
            mb: 5,
            textAlign: "center",
            backgroundColor: "#F2F2F2",
            color: "#494b56",
            borderRadius: "0.2rem",
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
      <Link to="/login" style={linkStyle}>
        Already a member? Login Here
      </Link>
    </Box>
  );
};

export default Register;
