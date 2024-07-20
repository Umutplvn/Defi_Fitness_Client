import { Box } from "@mui/material";
import React, { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import PersonIcon from '@mui/icons-material/Person';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../assets/defi-icon.jpeg";
const Header = () => {
  const [isOpen, setOpen] = useState(false);
    
  const styles = {
    container: {
      position: "relative",
      width: "3rem",
      height: "3rem"
    },
    rotatingBorder: {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1.5px solid white", 
      borderTopColor: "transparent",
      borderBottomColor:"transparent",
      animation: "rotate 4s linear infinite",
      color:"white"
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: "50%"
    },
    "@keyframes rotate": {
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(360deg)"
      }
    }
  };


  return (
    <Box>
        <Box sx={{width:"100wh", backgroundColor:"black", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <Hamburger
          direction="right"
          size="22"
          toggled={isOpen}
          toggle={setOpen}
        />
        <Box style={styles.container}>
      <img src={Logo} alt="Rotating Logo" style={styles.image} />
      <div style={styles.rotatingBorder}></div>
      <style>
        {`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Box>
<PersonIcon/>
        </Box>
      
        <Menu>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
    </Box>
  );
};

export default Header;
