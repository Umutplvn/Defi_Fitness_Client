import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { Box, Button, TextField, Typography } from "@mui/material";
import useAuthCall from "../hooks/useAuthCall";
import { useState } from "react";
import ReactStars from 'react-stars';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';

export default function EditModalUnstyled({
  handleClose,
  open,
  userId,
  name,
  level,
  membership,
  email,
}) {
  const { updateUser } = useAuthCall();
  const [info, setInfo] = useState({ name, level, email, membership });

  const ratingChanged = (newRating) => {
    setInfo({...info, level:newRating})
  }
  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const updateFunc =  () => {
       updateUser(userId, info);
      handleClose();
  };
  


  return (
    <Box>
      <Modal
        sx={{ maxWidth: "350px", width: "90%", margin: "auto" }}
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400, maxHeight: "16.5rem" }}>
<Box sx={{display:"flex", alignItems:"center", gap:"0.5rem"}}>
  <Typography sx={{fontWeight:"700",  minWidth:"130px"}}>Name:</Typography>
  <TextField
            variant="outlined"
            sx={{
              width: { xs: "15rem", md: "20rem" },
              "& .MuiOutlinedInput-root": {
                height: "1.7rem",
                "& fieldset": {
                  borderColor: "transparent",
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
    onChange={(e)=>setInfo({...info, name:e.target.value})}
          />
</Box>

<Box sx={{display:"flex", alignItems:"center", gap:"0.5rem"}}>
  <Typography sx={{fontWeight:"700", minWidth:"130px"}}>Email:</Typography>
  <TextField
            variant="outlined"
            sx={{
              width: { xs: "15rem", md: "20rem" },
              "& .MuiOutlinedInput-root": {
                height: "1.7rem",
                "& fieldset": {
                  borderColor: "transparent",
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
    onChange={(e)=>setInfo({...info, email:e.target.value})}
          />
</Box>


<Box sx={{display:"flex", alignItems:"center", gap:"0.5rem"}}>
  <Typography sx={{fontWeight:"700",  minWidth:"140px"}}>Membership:</Typography>
  <FormControl sx={{width:"60%"}}>

  <NativeSelect
    defaultValue={info.membership}
    inputProps={{
      id: 'uncontrolled-native',
    }}
    onChange={(e)=>setInfo({...info, membership:e.target.value})}
  >
    <option value={"Bronze"}>Bronze</option>
    <option value={"Silver"}>Silver</option>
    <option value={"Gold"}>Gold</option>
  </NativeSelect>
</FormControl>
</Box>

<Box sx={{display:"flex", alignItems:"center", gap:"0.5rem"}}>
<Typography sx={{fontWeight:"700",  width:"138px"}}>Level:</Typography>
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
              onClick={updateFunc}
            >
              submit
            </Button>

            <Button
              type="submit"
              variant="contained"
              onClick={handleClose}
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
    font-family: "IBM Plex Sans", sans-serif;
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
    font-family: "IBM Plex Sans", sans-serif;
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
