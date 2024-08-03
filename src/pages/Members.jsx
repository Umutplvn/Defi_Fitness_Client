import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import ModalUnstyled from "../components/DeleteUserModel"
import { useEffect } from "react";
import useAuthCall from "../hooks/useAuthCall";
import ReactStars from 'react-stars'
import { render } from 'react-dom'
 


const Members = () => {
  const { users, userId } = useSelector((state) => state.auth);
  const {listUsers}=useAuthCall()
  const [search, setSearch] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    listUsers()
  }, [])
  
  console.log(users);

  const ratingChanged = (newRating) => {
    console.log(newRating)
  }

  
  const filterUsers = users?.filter(
    (item) =>
    item._id!==userId && item.verified &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.membership.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) )
  );


  return (
    <Box sx={{ ml: { xs: "0", sm: "6rem", md: "12rem" }, padding: "1rem" }}>
      <Box
        sx={{
          width: "100wh",
          display: "flex",
          justifyContent: "center",
          pt: "2rem",
          mb:"2rem",
          ml: { sm: "4.5rem", md: "10rem" },
        }}
      >
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          variant="outlined"
          sx={{
            width: { xs: "15rem", md: "20rem" },
            borderRadius: "2rem",
            "& .MuiOutlinedInput-root": {
              height: "2.2rem",
              "& fieldset": {
                borderColor: "black",
                borderRadius: "2rem",
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
        />
      </Box>
     
      <TableContainer component={Paper} sx={{ borderRadius: "1rem" }}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell> </TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Membership</TableCell>
              <TableCell align="left">Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterUsers?.map((row) => (
                <>
                <ModalUnstyled handleClose={handleClose}  open={open} userId={row._id} name={row.name}/>
              <TableRow
                key={row._id} 
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
              
              


                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", gap: "0.5rem" }}>
                    <EditIcon
                      sx={{
                        color: "#4b4b4b",
                        ":hover": {
                          cursor: "pointer",
                          transform: "scale(1.04)",
                          color: "black",
                          transition:
                            "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                        },
                      }}
                    />
                    <CancelIcon
                    onClick={()=>setOpen(true)}
                      sx={{
                        color: "#4b4b4b",
                        ":hover": {
                          cursor: "pointer",
                          transform: "scale(1.04)",
                          color: "#c72525",
                          transition:
                            "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                        },
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell sx={{ minWidth: "150px" }} align="left">
                  {row.name}
                </TableCell>
                <TableCell sx={{ minWidth: "150px" }} align="left">
                  {row.email}
                </TableCell>
                <TableCell  align="left">
                  {row.membership}
                </TableCell>
                <TableCell  align="left" sx={{minWidth:"95px"}}>
                  
                <ReactStars 
  count={5}
  value={row.level}
edit={false}
  size={12}
  color2={'#ffd700'} />

                </TableCell>
              </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Members;
