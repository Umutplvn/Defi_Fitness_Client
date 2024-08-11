import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { textFieldStyle } from "../styles/registerStyle";
import useAuthCall from "../hooks/useAuthCall";

const EmailVerification = () => {
  const { passcode, userId } = useSelector((state) => state?.auth);
  const { deleteUser, update } = useAuthCall();
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [expired, setExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
 

  useEffect(() => {
    let timer;
    if (!expired) {
      timer = setTimeout(() => {
        deleteUser(userId);
        setExpired(true);
        navigate("/register");
        toast.error("Time is up!")
      }, 60000);
    }

    return () => clearTimeout(timer);
  }, [deleteUser, expired, userId]);

  const handleChange = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode == pass) {
      update(userId, { verified: true });
      navigate("/blogs");

      toast.success("Welcome to DEFI")
    } else {
      toast.error("Passcode is wrong!")
      setPass("");
    }
  };

  const renderTime = ({ remainingTime }) => {
    return (
      <div>
        <div style={{ fontSize: "30px" }}>{remainingTime}</div>
      </div>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          right: "0",
          top: "0",
          padding: "2rem",
          mt: "1rem",
        }}
      >
        {/* //Timer */}

        <CountdownCircleTimer
          size={80}
          strokeWidth={5}
          isPlaying
          duration={remainingTime}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[60, 30, 10, 5]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </Box>
      <Box sx={{ textAlign: "center", mt: "9rem", p: "0.5rem" }}>
        <Typography sx={{ color: "#494b56", fontSize: "1.5rem", mb: "1rem" }}>
          Verify your email address
        </Typography>
        <Typography>
          Thanks for registering. Enter the verification code sent to your email
          to complete your registration.
        </Typography>

        <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 3 }}>
          <Box container spacing={2}>
            <Box sx={{ mb: "1rem" }}>
              <TextField
                sx={textFieldStyle}
                required
                fullWidth
                name="pass"
                label="Passcode"
                type="pass"
                id="pass"
                value={pass}
                autoComplete="pass"
                onChange={handleChange}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
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
            confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EmailVerification;
