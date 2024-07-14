import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Logo from "../components/logo";
import { Link } from "react-router-dom";
import {
  logoStyle,
  textFieldStyle,
  linkStyle,
  frameStyle,
} from "../styles/registerStyle";
const Register = () => {
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
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField required placeholder="NAME *" sx={textFieldStyle} />
        <TextField required placeholder="EMAIL ADDRESS *" sx={textFieldStyle} />
        <TextField required placeholder="PASSWORD *" sx={textFieldStyle} />

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
