import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useAuthCall from '../hooks/useAuthCall';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:"1rem",
  height:"12rem"
};

export default function BasicModal({open, setOpen}) {

  const handleClose = () => setOpen(false);
  const {deleteAccount}=useAuthCall()
  const navigate=useNavigate()
  const {userId}=useSelector((state)=>state.auth)

const accDeleteFunc=()=>{
    deleteAccount(userId)
    handleClose()
    navigate("/register")

}
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
      
          <Typography id="modal-modal-description" sx={{fontFamily:"Montserrat", textAlign:"center"}}>
          Are you sure you want to delete your account? This action cannot be undone.          </Typography>

          <Box sx={{ margin: "auto", display: "flex", gap: "1rem", justifyContent:"center" }}>
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
              onClick={()=>accDeleteFunc()}
            >
              Yes
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
        </Box>
      </Modal>
    </div>
  );
}
