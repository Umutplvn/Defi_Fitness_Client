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

const Members = () => {
  const { users } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");

  const filterUsers = users?.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.membership.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase())
  );

  console.log(search);

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
              <TableCell></TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Membership</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterUsers?.map((row) => (
              <TableRow
                key={row._id}  // Burada _id kullanıyorum, eğer _id yoksa başka unique bir id kullanmalısınız
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
                            "transform 0.3s ease-in-out, color 0.3s ease-in-out",
                        },
                      }}
                    />
                    <CancelIcon
                      sx={{
                        color: "#4b4b4b",
                        ":hover": {
                          cursor: "pointer",
                          transform: "scale(1.04)",
                          color: "#c72525",
                          transition:
                            "transform 0.3s ease-in-out, color 0.3s ease-in-out",
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
                <TableCell sx={{ minWidth: "150px" }} align="left">
                  {row.membership}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Members;
