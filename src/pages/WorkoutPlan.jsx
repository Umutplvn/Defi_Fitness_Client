import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import useAuthCall from "../hooks/useAuthCall";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40rem",
  height: "35rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "1rem",
  p: 4,
};

export default function BasicModal({ handleClose, open }) {
  const [info, setInfo] = useState({ workoutplan: "", userId: "", level: "" });
  const { users } = useSelector((state) => state?.auth);
const {updateWorkoutPlan}=useAuthCall()
  const userInfo = [
    { name: "Select User or Level", _id: "" }, // Placeholder option with an empty _id
    ...users,
    { name: "Level 1", _id: 1 },
    { name: "Level 2", _id: 2 },
    { name: "Level 3", _id: 3 },
    { name: "Level 4", _id: 4 },
    { name: "Level 5", _id: 5 },
  ];

  const handleChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue <= 5) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        userId: "",
        level: selectedValue,
      }));
    } else {
      setInfo((prevInfo) => ({
        ...prevInfo,
        userId: selectedValue,
        level: "",
      }));
    }
  };

  const handleSubmit = () => {
    const { workoutplan, userId, level } = info;

    if (!workoutplan) {
      toast.error("Please enter a link!");
      return;
    }

    if (!userId && !level) {
      toast.error("Select a user or level!");
      return;
    }
    updateWorkoutPlan(info);
    handleClose()
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
   
          <Typography id="modal-modal-title" sx={{ fontFamily: "Montserrat" }}>
            Hey there, <br />
            <br /> Your new workout plan is ready! <br />
            This month, we’re stepping it up to help you reach your goals.{" "}
            <br />
            <br />
            <a
              href={info.workoutplan}
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here
            </a>{" "}
            to get started. <br />
            <br /> Remember, every workout counts. Let’s make this month your
            best one yet! <br />
            <br />
            Best regards, <br />
            Your Fitness Coach
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FormControl sx={{ width: "100%", marginTop: "1.5rem" }} >
              <TextField
                placeholder="Pdf link..."
                fullWidth
                onChange={(e) =>
                  setInfo({ ...info, workoutplan: e.target.value })
                }
                InputProps={{
                  style: {
                    height: "2rem",
                    marginTop: "1rem",
                  },
                }}
              />
              <Select
                sx={{ height: "2rem", mt: "1rem" }}
                value={info.userId || info.level || ""}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Select User or Level" }}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography style={{ color: "gray" }}>
                        Select User or Level
                      </Typography>
                    );
                  }
                  return (
                    userInfo.find((item) => item._id === selected)?.name ||
                    selected
                  );
                }}
              >
                {userInfo.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    mt: 3,
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
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
