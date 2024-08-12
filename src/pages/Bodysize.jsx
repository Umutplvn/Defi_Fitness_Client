import { Box, Button, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuthCall from "../hooks/useAuthCall";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const Bodysize = () => {
  const { readProfile, createProfileInfo } = useAuthCall();
  const [info, setInfo] = useState({
    chest: "",
    waist: "",
    arms: "",
    thighs: "",
  });

  const { userId, profile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      readProfile(userId);
    }
  }, [userId, readProfile]);

  const addBodyMeasurements = () => {
    if (!info.chest || !info.waist || !info.arms || !info.thighs) {
      return toast.error("Please enter all required measurements!");
    } else {
      createProfileInfo({ size: info });
      setInfo({ chest: "", waist: "", arms: "", thighs: "" });
    }
  };

  const sizeData =
    profile?.flatMap((item) => {
      if (item.size) {
        return {
          date: new Date(item.createdAt).toLocaleDateString(),
          chest: item.size.chest,
          waist: item.size.waist,
          arms: item.size.arms,
          thighs: item.size.thighs,
        };
      }
      return [];
    }) || [];

  const data = sizeData?.map((entry) => ({
    date: entry.date,
    chest: parseFloat(entry.chest) || 0,
    waist: parseFloat(entry.waist) || 0,
    arms: parseFloat(entry.arms) || 0,
    thighs: parseFloat(entry.thighs) || 0,
  }));

  return (
    <Box
      sx={{
        pl: { xs: "0", sm: "4.5rem", md: "10rem" },
        pt: "1rem",
        mb: "7rem",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "1.1rem",
            textAlign: "center",
            fontWeight: "600",
            fontFamily: "Montserrat",
            mt: "1rem",
            mb: "1rem",
          }}
        >
          Body Measurements Tracker
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            p: "2rem",
            gap: "2rem",
          }}
        >
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
              minHeight: "18rem",
              height: "14rem",
              minWidth: "16rem",
              alignItems: "center",
              borderRadius: "1rem",
              mb:"1rem"
            }}
          >
            <Input
              onChange={(e) => setInfo({ ...info, chest: e.target.value })}
              value={info.chest}
              sx={{
                width: "8rem",
                pt: "1rem",
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
              }}
              placeholder="Chest"
              type="number"
              required
            />
            <Input
              onChange={(e) => setInfo({ ...info, waist: e.target.value })}
              value={info.waist}
              sx={{
                width: "8rem",
                pt: "1rem",
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
              }}
              placeholder="Waist"
              type="number"
              required
            />
            <Input
              onChange={(e) => setInfo({ ...info, arms: e.target.value })}
              value={info.arms}
              sx={{
                width: "8rem",
                pt: "1rem",
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
              }}
              placeholder="Arms"
              type="number"
              required
            />
            <Input
              onChange={(e) => setInfo({ ...info, thighs: e.target.value })}
              value={info.thighs}
              sx={{
                width: "8rem",
                pt: "1rem",
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
              }}
              placeholder="Thighs"
              type="number"
              required
            />

            <Button
              onClick={addBodyMeasurements}
              type="submit"
              variant="contained"
              sx={{
                mt: 5,
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
            <Box sx={{ minWidth: "100%", mt: "0.2rem" }}>
              <Typography
                sx={{
                  color: "red",
                  fontSize: "0.7rem",
                  p: "1rem",
                  textAlign: "center",
                }}
              >
                Please enter all body measurements.*
              </Typography>
            </Box>
          </Box>

          {/* Chart */}
          <Box
            sx={{
              minWidth: "22rem",
              width: "50rem",
              minHeight: "20rem",
              height: "16rem",
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="chest"
                  stroke="#8884d8"
                  name="Chest"
                />
                <Line
                  type="monotone"
                  dataKey="waist"
                  stroke="#82ca9d"
                  name="Waist"
                />
                <Line
                  type="monotone"
                  dataKey="arms"
                  stroke="#ffc658"
                  name="Arms"
                />
                <Line
                  type="monotone"
                  dataKey="thighs"
                  stroke="#ff7300"
                  name="Thighs"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Bodysize;
