import { Box, Typography, TextField, Button, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from "@mui/icons-material/Edit";
import useAuthCall from '../hooks/useAuthCall';
import formatDateTime from "../helper/formatDateTime";

const EditProfile = () => {
  const { name, surname, dateOfBirth, gender, sportBranch,userId } = useSelector((state) => state.auth);

const {update}=useAuthCall()
  const [info, setInfo] = useState({
    name: name,
    surname: surname,
    sportBranch: sportBranch,
    dateOfBirth: dateOfBirth,
    gender: gender
  });

  const [editingField, setEditingField] = useState('');

  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [editingField]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const updateData = {
      name: info.name,
      surname: info.surname,
      sportBranch: info.sportBranch,
      dateOfBirth: info.dateOfBirth,
      gender: info.gender
    };
    update(userId, updateData); 
    setEditingField(''); 
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.5rem",
        pl: { xs: "1rem", sm: "5.5rem", md: "11rem" },
        flexDirection: "column",
        pt: "3rem",
        mb: "10rem",
      }}
    >
      <Box
        sx={{
          width: "25rem",
          height: "22rem",
          border: "2px solid black",
          padding: "2rem",
          borderRadius: "1rem",
          backgroundColor: "#121212",
        }}
      >
        <Typography sx={{ color: "white", fontWeight: "600", fontFamily:"Montserrat", fontSize: "1.2rem", mb: "0.5rem" }}>
          Edit Profile
        </Typography>

        {["name", "surname", "sportBranch"].map((field) => (
          <Box key={field} sx={{ display: "flex", gap: "0.3rem", alignItems: 'center', mt: "0.2rem" }}>
            <EditIcon
              sx={{ fontSize: "1.2rem", cursor: 'pointer', color: "white" }}
              onClick={() => handleEditClick(field)}
            />

            <Box sx={{ fontWeight: "500", fontFamily:"Montserrat", width: "8rem", display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ color: "white", height: "1.8rem", fontWeight: "500",fontFamily:"Montserrat" }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Typography>
              <Typography sx={{ color: "white" }}>:</Typography>
            </Box>

            {editingField === field ? (
              <TextField
                variant="standard"
                size="small"
                value={info[field]}
                onChange={handleChange}
                onBlur={() => setEditingField('')}
                sx={{ height: "1.7rem", color: "white" }}
                InputProps={{
                  disableUnderline: false,
                  sx: {
                    '&:before': { borderBottomColor: 'white' }, 
                    '&:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' },
                    '&:after': { borderBottomColor: 'white' }, 
                    input: { color: 'white' },
                  },
                }}
              />
            ) : (
              <Typography sx={{ color: "white" }}>{info[field]}</Typography>
            )}
          </Box>
        ))}

        {/* Gender Field */}
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: 'center', mt: "0.2rem" }}>
          <EditIcon
            sx={{ fontSize: "1.2rem", cursor: 'pointer', color: "white" }}
            onClick={() => handleEditClick("gender")}
          />

          <Box sx={{ display: "flex", width: "8rem", justifyContent: "space-between" }}>
            <Typography sx={{ color: "white", fontWeight: "500",fontFamily:"Montserrat", height: "1.7rem" }}>Gender</Typography>
            <Typography sx={{ color: "white" }}>:</Typography>
          </Box>

          {editingField === "gender" ? (
            <Select
              value={info.gender}
              onChange={handleChange}
              onBlur={() => setEditingField('')}
              variant="standard"
              size="small"
              sx={{
                width: "5rem",
                height: "1.5rem",
                color: "white",
                '&:before': { borderBottomColor: 'white' }, // Normal durum
                '&:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' }, // Hover durum
                '&:after': { borderBottomColor: 'white' }, // Seçili durum
              }}
              inputProps={{ sx: { color: 'white' } }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          ) : (
            <Typography sx={{ color: "white" }}>{info.gender}</Typography>
          )}
        </Box>

        {/* Date of Birth Field */}
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: 'center', mt: "0.2rem" }}>
          <EditIcon
            sx={{ fontSize: "1.2rem", cursor: 'pointer', color: "white" }}
            onClick={() => handleEditClick("dateOfBirth")}
          />

          <Box sx={{ display: "flex", width: "8rem", justifyContent: "space-between" }}>
            <Typography sx={{ color: "white", fontWeight: "500",fontFamily:"Montserrat" }}>Date of Birth</Typography>
            <Typography sx={{ color: "white" }}>:</Typography>
          </Box>

          {editingField === "dateOfBirth" ? (
            <TextField
              type="date"
              variant="standard"
              size="small"
              value={info.dateOfBirth}
              onChange={handleChange}
              onBlur={() => setEditingField('')}
              sx={{ height: "1.5rem", color: "white" }}
              InputProps={{
                disableUnderline: false,
                sx: {
                  '&:before': { borderBottomColor: 'white' }, 
                  '&:hover:not(.Mui-disabled):before': { borderBottomColor: 'white' }, 
                  '&:after': { borderBottomColor: 'white' }, 
                  input: { color: 'white' },
                },
              }}
            />
          ) : (
            <Typography sx={{ color: "white" }}>{formatDateTime(info.dateOfBirth)}</Typography>
          )}
        </Box>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: "1rem" }}>
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
                backgroundColor: "#909090",
                color: "white",
              },
            }}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
