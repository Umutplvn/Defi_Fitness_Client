import { Box, Button, Input, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuthCall from '../hooks/useAuthCall';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const BMITracker = () => {
  const { createBMI, listBMI } = useAuthCall();
  const [info, setInfo] = useState({ weight: "", height: "" });
  const { userId, BMI } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      listBMI();
    }
  }, [userId, listBMI]);

  const addBMI = () => {
    if (!info.weight || !info.height) {
      return toast.error("Please enter required data!");
    } else {
      createBMI({ weight: info.weight, height: info.height });
      setInfo({ weight: "", height: "" })
    }
  };

  const chartData = BMI?.map(item => ({
    date: new Date(item.createdAt).toLocaleDateString(),
    bmi: item.BMI,
  }));

  return (
    <Box sx={{ pl: { xs: "0", sm: "4.5rem", md: "10rem" }, pt: "1rem" }}>
      <Box>
        <Typography
          sx={{
            fontSize: "1.2rem",
            textAlign: "center",
            fontWeight: "700",
            fontFamily: "Montserrat",
            mt: "1rem"
          }}
        >
          BMI TRACKER
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: 'center', p: "2rem", gap: "2rem", mt: { xs: "0", lg: "1rem" } }}>
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
              height: "14rem",
              minWidth: "16rem",
              alignItems: "center",
              borderRadius: "1rem",
              mr: { xs: "0", lg: "2rem" }
            }}
          >
            <Input
              onChange={(e) => setInfo({ ...info, weight: e.target.value })}
              value={info.weight}
              sx={{
                width: "8rem",
                pt: "2.5rem",
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
              placeholder="Weight (kg)"
              type="number"
              required
            />
            <Input
              onChange={(e) => setInfo({ ...info, height: e.target.value })}
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
              placeholder="Height (cm)"
              type="number"
              required
            />

            <Button
              onClick={addBMI}
              type="submit"
              variant="contained"
              sx={{
                mt: 8,
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
            <Box sx={{ minWidth: "100%", mt: "2.5rem" }}>
              <Typography sx={{ color: "red", fontSize: "0.7rem", textAlign: "center" }}>
                Please enter your height and weight.*
              </Typography>
            </Box>
          </Box>

          {/* Chart */}
          <Box sx={{ minWidth: "22rem", width: "50rem", minHeight: "20rem", height: "16rem", overflow: "scroll" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[20, 'auto']} 
                  tickCount={6} 
                  tickFormatter={(value) => value.toFixed(0)} 
                  label={{ value: 'BMI', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bmi" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BMITracker;
