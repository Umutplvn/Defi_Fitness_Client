import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Avatar, Box, Select, MenuItem, Typography, Button } from "@mui/material";
import { avatarList } from "../helper/AvatarList";
import { useSelector } from "react-redux";
import useAuthCall from "../hooks/useAuthCall";

export default function BasicModal({ setOpen, open }) {
  const handleClose = () => setOpen(false);
  const {update}=useAuthCall()
  const { avatar, userId } = useSelector((state) => state.auth);
  const [avatarimg, setAvatarimg] = useState(avatar);

const handleSubmit=()=>{
  update(userId, {avatar:avatarimg})
  handleClose()
}


  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    padding: "2rem",
    width: "22rem",
    height: "20rem",
    bgcolor: "background.paper",
    borderRadius: "1rem",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Avatar
          src={avatarimg}
          style={{
            width: "7rem",
            height: "7rem",
            position: "relative",
          
          }}
        />

        <Select
          sx={{ height: "2rem", width: "20rem" }}
          value={avatarimg}
          onChange={(e)=> setAvatarimg(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Select Avatar" }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 10 * 16,
                width: 250,
              },
            },
          }}
          renderValue={(selected) => {
            if (!selected) {
              return <Typography style={{ color: "gray" }}>Select Avatar</Typography>;
            }
            return avatarList.find((item) => item.img === selected)?.name || selected;
          }}
        >
          {avatarList.map((item) => (
            <MenuItem
              key={item.img}
              sx={{ height: "2rem", minHeight: "2rem", padding: "0.5rem 1rem" }}
              value={item.img}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>

        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            mb: 5,
            textAlign: "center",
            backgroundColor: "#F2F2F2",
            color: "#494b56",
            borderRadius: "0.7rem",
            width: "6rem",
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
    </Modal>
  );
}
