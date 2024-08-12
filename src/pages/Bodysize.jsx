import { Box, Button, Input, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuthCall from '../hooks/useAuthCall';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Bodysize = () => {
const {readProfile,createProfileInfo}=useAuthCall()
const [info, setInfo] = useState({weight:"", height:""})

const{userId}=useSelector((state)=>state.auth)
useEffect(() => {
readProfile(userId)
}, [])


const addFMIFunc=()=>{
  if(!info.weight || !info.height){
    return toast.error("Please enter required data!")
  }else
  createProfileInfo({FMI:info})
}

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  ];

  return (
    <Box sx={{ pl: { xs: "0", sm: "4.5rem", md: "10rem" }, pt: "1rem" }}>
      <Box>
        <Typography
          sx={{
            fontSize: "1.1rem",
            textAlign: "center",
            fontWeight: "600",
            fontFamily: "Montserrat",
          }}
        >
          Fat Mass Tracker
        </Typography>

        <Box sx={{ display: "flex", flexWrap:"wrap", justifyContent:'center', p:"2rem", gap:"2rem"}}>
          {/* Calculator */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "2px solid black",
              transition: "0.3s",
              "&:hover": {
                border: "2px solid #FE5E00",
                color: "white",
              },
              minHeight: "16rem",
              height:"14rem",
              minWidth: "16rem",
              alignItems: "center",
              borderRadius: "1rem",
            }}
          >
           
            <Input
            onChange={(e)=>setInfo({...info, weight:e.target.value})}
            value={info.weight}
              sx={{
                width: "8rem",
                pt: "2rem",
                "& input[type=number]": {
                  MozAppearance: "textfield", 
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none", 
                  margin: 0,
                },
              }}
              placeholder="Weight"
              type="number"
              required
            />
            <Input
             onChange={(e)=>setInfo({...info, height:e.target.value})}
             value={info.height}
              sx={{
                width: "8rem",
                pt: "1rem",
                "& input[type=number]": {
                  MozAppearance: "textfield", 
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none", 
                  margin: 0,
                },
              }}
              placeholder="Height"
              type="number"
              required
            />

            <Button
            onClick={addFMIFunc}
              type="submit"
              variant="contained"
              sx={{
                mt: 4,
                textAlign: "center",
                backgroundColor: "#F2F2F2",
                color: "#494b56",
                borderRadius: "0.7rem",
                width: "6rem",
                transition: "0.4s",
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "white",
                },
              }}
            >
              ADD
            </Button>
            <Box sx={{minWidth:"100%", mt:"1rem"}}>

            <Typography sx={{color:"red", fontSize:"0.7rem", p:"1rem"}}> Please enter your height and weight.*</Typography>
            </Box>
          </Box>
          {/* Chart */}
          <Box sx={{minWidth:"22rem", width:"50rem" ,minHeight:"20rem", height:"16rem"}}>
          <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>

          </Box>


        </Box>
      </Box>
    </Box>
  );
};

export default Bodysize;
