import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import ModalUnstyled from "../components/DeleteUserModel";
import useAuthCall from "../hooks/useAuthCall";
import ReactStars from 'react-stars';
import EditModalUnstyled from "../components/EditUserModal";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import CreateModalUnstyled from "../components/CreateUserModal";

const Members = () => {
  const { users, userId } = useSelector((state) => state.auth);
  const { listUsers } = useAuthCall();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [createOpen, setCreateOpen] = useState(false)

  useEffect(() => {
    listUsers();
  }, []);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true)
  };

  const handleCreateClose = () => {
    setCreateOpen(false)

  };

  const handleEditOpen = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setEditUser(null);
  };


  console.log(createOpen);


  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const filterUsers = users?.filter(
    (item) =>
      item._id !== userId &&
      item.verified &&
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.membership.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleExport = () => {
    const data = filterUsers.map(user => ({
      Name: formatName(user.name),
      Email: user.email,
      Membership: user.membership,
      Level: user.level
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

    XLSX.writeFile(workbook, "members.xlsx");
  };

  return (
    <Box sx={{ ml: { xs: "0", sm: "4.5rem", md: "10rem" }, padding: "1rem", mb:"10rem" }}>
      <Box
        sx={{
          width: "100wh",
          display: "flex",
          justifyContent: "center",
          pt: "2rem",
          mb: "2rem",
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
   
   <Box sx={{maxWidth:"850px", overflow:"scroll", m:"auto", maxHeight:"28rem"}}>
      <TableContainer component={Paper} sx={{ borderRadius: "1rem", maxWidth:"850px", overflow:"scroll", m:"auto", maxHeight:"23rem" }}>
     
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Membership</TableCell>
              <TableCell align="left">Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterUsers?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", gap: "0.5rem" }}>
                    <EditIcon
                      onClick={() => handleEditOpen(row)}
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
                      onClick={() => handleOpen(row)}
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
                  {formatName(row.name)}
                </TableCell>
                <TableCell sx={{ minWidth: "150px" }} align="left">
                  {row.email}
                </TableCell>
                <TableCell align="left">{row.membership}</TableCell>
                <TableCell align="left" sx={{ minWidth: "95px" }}>
                  <ReactStars
                    count={5}
                    value={row.level}
                    edit={false}
                    size={12}
                    color2={"#ffd700"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{width:"100%", display:"flex", justifyContent:"flex-end", gap:"1rem"}}>
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
            onClick={handleExport}

          >
            <CloudDownloadIcon sx={{mr:"0.5rem"}}/>
            EXPORT
          </Button>

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
            onClick={handleCreateOpen}

          >
            <PersonAddAlt1RoundedIcon sx={{mr:"0.5rem"}}/>
            CREATE
          </Button>

      </Box>
   </Box>

   
      {selectedUser && (
        <ModalUnstyled
          handleClose={handleClose}
          open={open}
          userId={selectedUser._id}
          name={selectedUser.name}
        />
      )}

      <CreateModalUnstyled handleCreateOpen={handleCreateOpen} handleCreateClose={handleCreateClose} createOpen={createOpen}/>

      {editUser && (
        <EditModalUnstyled
        handleClose={handleClose}
        open={open}
        userId={editUser._id}
        name={editUser.name}
        email={editUser.email}
        membership={editUser.membership}
        level={editUser.level}
        />
      )}
    </Box>
  );
};

export default Members;
