import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { InputLabel, Avatar } from "@mui/material";


export default function BasicModal({ setOpen, open, avatar }) {
  const handleClose = () => setOpen(false);

//   const { update } = useAuthCall();



  const handleYes = async () => {
    handleClose();
  };

  const handleNo = () => {
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "14rem",
    height: "14rem",
  };

  const styleSecondModal = {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    width: "20rem",
    height: "8.5rem",
    backgroundColor:"#f4fffe",
    padding:"1rem",
    borderRadius:"1rem"
  };


  const iconStyle = {
    color: "#449eb7",
    position: "absolute",
    bottom: "-1.2rem",
    right: "3rem",
    transform: "translate(50%, -50%)",
    zIndex: 3,
    backgroundColor: "white",
    width: "4rem",
    height: "4rem",
    padding: "0.6rem",
    borderRadius: "50%",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form flexDirection={"column"}>
          <InputLabel htmlFor="file-upload" sx={style}>
            <Avatar
              style={{
                backgroundColor: "#fff",
                width: "80%",
                height: "80%",
                position: "relative",
                borderRadius: "50%",
              }}
            />
          </InputLabel>


        </form>
      </Modal>


    </>
  );
}
