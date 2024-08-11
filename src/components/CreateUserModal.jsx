import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import useAuthCall from "../hooks/useAuthCall";
import { useState } from "react";
import ReactStars from "react-stars";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-hot-toast";

export default function CreateModalUnstyled({ handleCreateClose, createOpen }) {
  const { createNewUser } = useAuthCall();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    surname: "",
    level: "",
    email: "",
    membership: "Basic",
    gender: "Male",
    password: ""
  });

  console.log(info);

  const ratingChanged = (newRating) => {
    setInfo({ ...info, level: newRating });
  };

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const createUserFunc = () => {
    if (!validateEmail(info.email)) {
      setEmailError(true);
      toast("Invalid e-mail address!")
      return;
    }
    createNewUser(info);
    handleCreateClose();
    setInfo({
      name: "",
      surname: "",
      level: "",
      email: "",
      membership: "Basic",
      gender: "Male",
      password: ""
    });
    setEmailError(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <Box>
      <Modal
        sx={{ maxWidth: "350px", width: "90%", margin: "auto" }}
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={createOpen}
        onClose={handleCreateClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400, maxHeight: "23.5rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography sx={{ fontWeight: "700", minWidth: "130px" }}>
              Name:
            </Typography>
            <TextField
              variant="outlined"
              autoFocus
              sx={{
                width: { xs: "15rem", md: "20rem" },
                "& .MuiOutlinedInput-root": {
                  height: "1.7rem",
                  "& fieldset": {
                    borderRadius: "0.5rem",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "& input": {
                    height: "auto",
                    padding: "0.75rem",
                  },
                },
              }}
              value={formatName(info.name)}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography sx={{ fontWeight: "700", minWidth: "130px" }}>
              Surname:
            </Typography>
            <TextField
              variant="outlined"
              sx={{
                width: { xs: "15rem", md: "20rem" },
                "& .MuiOutlinedInput-root": {
                  height: "1.7rem",
                  "& fieldset": {
                    borderRadius: "0.5rem",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "& input": {
                    height: "auto",
                    padding: "0.75rem",
                  },
                },
              }}
              value={formatName(info.surname)}
              onChange={(e) => setInfo({ ...info, surname: e.target.value })}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography sx={{ fontWeight: "700", minWidth: "130px" }}>
              Email:
            </Typography>
            <TextField
              type="email"
              variant="outlined"
              sx={{
                width: { xs: "15rem", md: "20rem" },
                "& .MuiOutlinedInput-root": {
                  height: "1.7rem",
                  "& fieldset": {
                    borderRadius: "0.5rem",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "& input": {
                    height: "auto",
                    padding: "0.75rem",
                  },
                },
              }}
              value={info.email}
              onChange={(e) => {
                setInfo({ ...info, email: e.target.value });
                setEmailError(!validateEmail(e.target.value));
              }}
              error={emailError}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography sx={{ fontWeight: "700", minWidth: "130px" }}>
              Password:
            </Typography>
            <TextField
              name="password"
              required
              type={showPassword ? "text" : "password"}
              fullWidth
              id="password"
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
              sx={{
                width: { xs: "15rem", md: "20rem" },
                "& .MuiOutlinedInput-root": {
                  height: "1.7rem",
                  "& fieldset": {
                    borderRadius: "0.5rem",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FE5E00",
                  },
                  "& input": {
                    height: "auto",
                    padding: "0.75rem",
                  },
                },
              }}
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

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography sx={{ fontWeight: "700", minWidth: "140px" }}>
              Gender:
            </Typography>
            <FormControl sx={{ width: "60%" }}>
              <NativeSelect
                defaultValue={info.gender}
                inputProps={{
                  id: "uncontrolled-native",
                }}
                onChange={(e) =>
                  setInfo({ ...info, gender: e.target.value })
                }
              >
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </NativeSelect>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography sx={{ fontWeight: "700", minWidth: "140px" }}>
              Membership:
            </Typography>
            <FormControl sx={{ width: "60%" }}>
              <NativeSelect
                inputProps={{
                  id: "uncontrolled-native",
                }}
                onChange={(e) =>
                  setInfo({ ...info, membership: e.target.value })
                }
              >
                <option value={"Basic"}>Basic</option>
                <option value={"Premium"}>Premium</option>
              </NativeSelect>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Typography sx={{ fontWeight: "700", width: "138px" }}>
              Level:
            </Typography>
            <ReactStars
              count={5}
              value={info.level}
              size={20}
              color2={"#ffd700"}
              onChange={ratingChanged}
            />
          </Box>

          <Box sx={{ margin: "auto", display: "flex", gap: "1rem" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 4,
                mb: 5,
                textAlign: "center",
                backgroundColor: "#000000",
                color: "white",
                borderRadius: "0.7rem",
                width: "5rem",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#37a629",
                  color: "white",
                },
              }}
              onClick={createUserFunc}
            >
              Submit
            </Button>

            <Button
              type="submit"
              variant="contained"
              onClick={handleCreateClose}
              sx={{
                mt: 4,
                mb: 5,
                textAlign: "center",
                backgroundColor: "#000000",
                color: "white",
                borderRadius: "0.7rem",
                width: "5rem",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#bc3a3a",
                  color: "white",
                },
              }}
            >
              No
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#000000",
  300: "#000000",
  400: "#000000",
  500: "#000000",
  600: "#000000",
  700: "#000000",
};

const grey = {
  50: "#000000",
  100: "#000000",

  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "Montserrat";
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const TriggerButton = styled("button")(
  ({ theme }) => css`
    font-family: "Montserrat";
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);
