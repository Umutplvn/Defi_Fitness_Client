import React, { useState } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { Box, Input, Typography, OutlinedInput } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import useAuthCall from "../hooks/useAuthCall";
import formatDateTime from "../helper/formatDateTime";

const UpdateUserInfo = ({ handleToggle, openIndex }) => {
  const { name, surname, dateOfBirth, gender, sportBranch, userId } =
    useSelector((state) => state.auth);
  const { update } = useAuthCall();
  const [editingField, setEditingField] = useState("");

  const [newName, setNewName] = useState(name);
  const [newSurname, setNewSurname] = useState(surname);
  const [newDateOfBirth, setNewDateOfBirth] = useState(dateOfBirth);
  const [newGender, setNewGender] = useState(gender);
  const [newSportBranch, setNewSportBranch] = useState(sportBranch);

  const handleSubmit = (field) => {
    const updateData = {
      name: newName,
      surname: newSurname,
      dateOfBirth: newDateOfBirth,
      gender: newGender,
      sportBranch: newSportBranch,
    };
    update(userId, updateData);
    setEditingField("");
  };

  const toggle = () => {
    handleToggle(1);
    setEditingField("");
  };

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <Card
      sx={{
        minWidth: 300,
        border: "1px solid rgba(211,211,211,0.6)",
        fontFamily: "Montserrat",
        fontWeight:"500"

      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccountCircleIcon sx={{ fontSize: "1.5rem", color: "#616161" }} />
            <Typography sx={{ fontSize: "1rem" }}>Profile</Typography>
          </Box>
        }
        action={
          <IconButton onClick={toggle} aria-label="expand" size="small">
            {openIndex === 1 ? (
              <Box
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#d1cccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "2rem",
                  height: "2rem",
                }}
              >
                <KeyboardArrowUpIcon />
              </Box>
            ) : (
              <Box
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#d1cccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "2rem",
                  height: "2rem",
                }}
              >
                <KeyboardArrowDownIcon />
              </Box>
            )}
          </IconButton>
        }
      />
      <Box sx={{ backgroundColor: "rgba(211,211,211,0.4)" }}>
        <Collapse in={openIndex === 1} timeout="auto" unmountOnExit>
          <CardContent>
            <Container sx={{ lineHeight: 2 }}>
              {/* Name */}
              <Box sx={inputBoxStyle}>
                <Typography
                  sx={{
                    ...labelStyle,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Name</span>
                  <span>:</span>
                </Typography>
                {editingField !== "name" ? (
                  <DisplayField
                    value={formatName(name)}
                    onClick={() => setEditingField("name")}
                  />
                ) : (
                  <EditField
                    value={formatName(newName)}
                    setValue={setNewName}
                    onSave={() => handleSubmit("name")}
                    onCancel={() => setEditingField("")}
                  />
                )}
              </Box>
              {/* Surname */}
              <Box sx={inputBoxStyle}>
                <Typography
                  sx={{
                    ...labelStyle,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Surname</span>
                  <span>:</span>
                </Typography>
                {editingField !== "surname" ? (
                  <DisplayField
                    value={formatName(surname)}
                    onClick={() => setEditingField("surname")}
                  />
                ) : (
                  <EditField
                    value={formatName(newSurname)}
                    setValue={setNewSurname}
                    onSave={() => handleSubmit("surname")}
                    onCancel={() => setEditingField("")}
                  />
                )}
              </Box>
              {/* Date of Birth */}
              <Box sx={inputBoxStyle}>
                <Typography
                  sx={{
                    ...labelStyle,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Date of Birth</span>
                  <span>:</span>
                </Typography>
                {editingField !== "dateOfBirth" ? (
                  <DisplayField
                    value={formatDateTime(dateOfBirth)}
                    onClick={() => setEditingField("dateOfBirth")}
                  />
                ) : (
                  <EditField
                    value={formatDateTime(newDateOfBirth)}
                    setValue={setNewDateOfBirth}
                    onSave={() => handleSubmit("dateOfBirth")}
                    onCancel={() => setEditingField("")}
                  />
                )}
              </Box>
              {/* Gender */}
              <Box sx={inputBoxStyle}>
                <Typography
                  sx={{
                    ...labelStyle,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Gender</span>
                  <span>:</span>
                </Typography>
                {editingField !== "gender" ? (
                  <DisplayField
                    value={formatName(gender)}
                    onClick={() => setEditingField("gender")}
                  />
                ) : (
                  <EditGenderField
                    value={newGender}
                    setValue={setNewGender}
                    onSave={() => handleSubmit("gender")}
                    onCancel={() => setEditingField("")}
                  />
                )}
              </Box>
              {/* Sport Branch */}
              <Box sx={inputBoxStyle}>
                <Typography
                  sx={{
                    ...labelStyle,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Sport Branch</span>
                  <span>:</span>
                </Typography>
                {editingField !== "sportBranch" ? (
                  <DisplayField
                    value={sportBranch}
                    onClick={() => setEditingField("sportBranch")}
                  />
                ) : (
                  <EditField
                    value={newSportBranch}
                    setValue={setNewSportBranch}
                    onSave={() => handleSubmit("sportBranch")}
                    onCancel={() => setEditingField("")}
                  />
                )}
              </Box>
            </Container>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
};

// Helper Components

const DisplayField = ({ value, onClick }) => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
    onClick={onClick}
  >
    <Typography
      sx={{
        fontSize: "1rem",
        height: "2rem",
        display: "flex",
        alignItems: "center",
        fontFamily: "Montserrat",
        fontWeight:"500"

      }}
    >
      {typeof value === "string"
        ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        : value}
    </Typography>
    <EditIcon sx={{ fontSize: "1.2rem", color: "#FE5E00" }} />
  </Box>
);

const EditField = ({ value, setValue, onSave, onCancel }) => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Input
      disableUnderline
      autoFocus
      placeholder={typeof value === "string" ? value : ""}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      sx={{ fontFamily: "Montserrat" ,        fontWeight:"500"
    }}
    />
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <ThumbUpAltRoundedIcon
        sx={{ fontSize: "1.2rem", color: "#29a544", ml: "1rem" }}
        onClick={onSave}
      />
      <ThumbDownAltRoundedIcon
        sx={{ fontSize: "1.2rem", color: "#9b2525", ml: "1rem" }}
        onClick={onCancel}
      />
    </Box>
  </Box>
);

const EditGenderField = ({ value, setValue, onSave, onCancel }) => (
  <Box
    sx={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{
        width: "100%",
        height: "2rem",
        fontSize: "1rem",
        border: "none",
        borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
        backgroundColor: "transparent",
        fontFamily: "Montserrat",
        fontWeight:"500"
      }}
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <ThumbUpAltRoundedIcon
        sx={{ fontSize: "1.2rem", color: "#29a544", ml: "1rem" }}
        onClick={onSave}
      />
      <ThumbDownAltRoundedIcon
        sx={{ fontSize: "1.2rem", color: "#9b2525", ml: "1rem" }}
        onClick={onCancel}
      />
    </Box>
  </Box>
);

const inputBoxStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.3rem",
};

const labelStyle = {
  fontWeight: 600,
  color: "#000000",
  height: "2rem",
  display: "flex",
  alignItems: "center",
  width: "11rem",
  fontFamily: "Montserrat",

};

export default UpdateUserInfo;
