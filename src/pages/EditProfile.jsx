import { Box, Typography, TextField, Button, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditIcon from "@mui/icons-material/Edit";
import useAuthCall from '../hooks/useAuthCall';
import formatDateTime from "../helper/formatDateTime";

const EditProfile = () => {
  const { name, surname, dateOfBirth, gender, sportBranch, userId } = useSelector((state) => state.auth);
  const { update } = useAuthCall();

  const formatName = (name) => {
    if (typeof name !== 'string' || !name) return ""; // Eğer name bir string değilse veya boşsa, boş string döndür.
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const [info, setInfo] = useState({
    name: formatName(String(name)),
    surname: formatName(String(surname)),
    sportBranch: formatName(String(sportBranch)),
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
      [editingField]: formatName(e.target.value), // Format Name uygulanıyor
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
          backgroundColor: "#fbfbfb",
          padding: "2rem",
          borderRadius: "1rem",
          border:"1px solid #f2f2f2"
        }}
      >
        <Typography sx={{  fontWeight: "600", fontFamily:"Montserrat", fontSize: "1.2rem", mb: "0.5rem" }}>
          Edit Profile
        </Typography>

        {["name", "surname", "sportBranch"].map((field) => (
          <Box key={field} sx={{ display: "flex", gap: "0.3rem", alignItems: 'center', mt: "0.2rem" }}>
            <EditIcon
              sx={{ fontSize: "1.2rem", cursor: 'pointer' }}
              onClick={() => handleEditClick(field)}
            />

            <Box sx={{ fontWeight: "500", fontFamily:"Montserrat", width: "8.2rem", display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{  height: "1.8rem", fontWeight: "500",fontFamily:"Montserrat" }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Typography>
              <Typography>:</Typography>
            </Box>

            {editingField === field ? (
              <TextField
                variant="standard"
                size="small"
                value={info[field]}
                onChange={handleChange}
                onBlur={() => setEditingField('')}
                sx={{ height: "1.7rem", }}
                InputProps={{
                  disableUnderline: false,
                  sx: {
                    '&:before': {  }, 
                    '&:hover:not(.Mui-disabled):before': {  },
                    '&:after': {  }, 
                    input: {  },
                  },
                }}
              />
            ) : (
              <Typography >{info[field]}</Typography>
            )}
          </Box>
        ))}

        {/* Gender Field */}
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: 'center', mt: "0.2rem" }}>
          <EditIcon
            sx={{ fontSize: "1.2rem", cursor: 'pointer' }}
            onClick={() => handleEditClick("gender")}
          />

          <Box sx={{ display: "flex", width: "8rem", justifyContent: "space-between" }}>
            <Typography sx={{  fontWeight: "500",fontFamily:"Montserrat", height: "1.7rem" }}>Gender</Typography>
            <Typography >:</Typography>
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
                height: "1.5rem"
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          ) : (
            <Typography>{info.gender}</Typography>
          )}
        </Box>

        {/* Date of Birth Field */}
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: 'center', mt: "0.2rem" }}>
          <EditIcon
            sx={{ fontSize: "1.2rem", cursor: 'pointer'}}
            onClick={() => handleEditClick("dateOfBirth")}
          />

          <Box sx={{ display: "flex", width: "8rem", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: "500",fontFamily:"Montserrat" }}>Date of Birth</Typography>
            <Typography>:</Typography>
          </Box>

          {editingField === "dateOfBirth" ? (
            <TextField
              type="date"
              variant="standard"
              size="small"
              value={info.dateOfBirth}
              onChange={handleChange}
              onBlur={() => setEditingField('')}
              sx={{ height: "1.5rem" }}
              InputProps={{
                disableUnderline: false,
              }}
            />
          ) : (
            <Typography>{formatDateTime(info.dateOfBirth)}</Typography>
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
              color: "#292929",
              borderRadius: "0.7rem",
              width: "8rem",
              transition: "0.4s",
              "&:hover": {
                backgroundColor: "#383838",
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
