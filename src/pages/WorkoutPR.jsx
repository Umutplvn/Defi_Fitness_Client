import { Box, Button, Input, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuthCall from '../hooks/useAuthCall';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const WorkoutPR = () => {
  const { readProfile, createProfileInfo } = useAuthCall();
  const [info, setInfo] = useState({ benchPress: "", deadLift: "", squat: "" });

  const { userId, profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      readProfile(userId);
    }
  }, [userId, readProfile]);

  const addWorkoutPR = () => {
    if (!info.benchPress || !info.deadLift || !info.squat) {
      return toast.error("Please enter all required workout PRs!");
    } else {
      createProfileInfo({ PR: info });
      setInfo({ benchPress: "", deadLift: "", squat: "" });
    }
  };

  const prData = profile?.flatMap((item) => {
    if (item.PR) {
      return {
        date: new Date(item.createdAt).toLocaleDateString(),
        benchPress: item.PR.benchPress,
        deadLift: item.PR.deadLift,
        squat: item.PR.squat,
      };
    }
    return [];
  }) || [];

  const data = prData.map((entry) => ({
    date: entry.date,
    benchPress: parseFloat(entry.benchPress) || 0,
    deadLift: parseFloat(entry.deadLift) || 0,
    squat: parseFloat(entry.squat) || 0,
  }));

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
          Workout PR Tracker
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: 'center', p: "2rem", gap: "2rem" }}>
          {/* Input Form */}
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
            }}
          >
            <Input
              onChange={(e) => setInfo({ ...info, benchPress: e.target.value })}
              value={info.benchPress}
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
              placeholder="Bench Press"
              type="number"
              required
            />
            <Input
              onChange={(e) => setInfo({ ...info, deadLift: e.target.value })}
              value={info.deadLift}
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
              placeholder="Dead Lift"
              type="number"
              required
            />
            <Input
              onChange={(e) => setInfo({ ...info, squat: e.target.value })}
              value={info.squat}
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
              placeholder="Squat"
              type="number"
              required
            />

            <Button
              onClick={addWorkoutPR}
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
            <Box sx={{ minWidth: "100%", mt: "1rem" }}>
              <Typography sx={{ color: "red", fontSize: "0.7rem", p: "1rem", textAlign:"center" }}>
                Please enter all workout PRs.*
              </Typography>
            </Box>
          </Box>

          {/* Chart */}
          <Box sx={{ minWidth: "22rem", width: "50rem", minHeight: "20rem", height: "16rem" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="benchPress" stroke="#8884d8" name="Bench Press" />
                <Line type="monotone" dataKey="deadLift" stroke="#82ca9d" name="Dead Lift" />
                <Line type="monotone" dataKey="squat" stroke="#ffc658" name="Squat" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkoutPR;
