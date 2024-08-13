import { Box, Button, Input, Typography, Menu, MenuItem, IconButton  } from "@mui/material";
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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const SizeTracker = () => {
  const { createSize, listSize, deleteSize } = useAuthCall();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [info, setInfo] = useState({
    chest: "",
    waist: "",
    arm: "",
    thigh: "",
  });
  const { userId, size } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      listSize();
    }
  }, []);

  const addSize = () => {
    if (!info.chest || !info.waist || !info.arm || !info.thigh) {
      return toast.error("Please enter all required data!");
    } else {
      createSize({
        chest: info.chest,
        waist: info.waist,
        arm: info.arm,
        thigh: info.thigh,
      });
      setInfo({ chest: "", waist: "", arm: "", thigh: "" });
    }
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteSize()
      setSelectedItem(null);
      handleClose();
  };

  const chartData = size?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString(),
    chest: item.chest,
    waist: item.waist,
    arm: item.arm,
    thigh: item.thigh,
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
            mt: "1rem",
          }}
        >
          BODY SIZE TRACKER{" "}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            p: "2rem",
            gap: "2rem",
            mt: { xs: "0", lg: "1rem" },
          }}
        >
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
              height: "18rem",
              minWidth: "16rem",
              alignItems: "center",
              borderRadius: "1rem",
              mr: { xs: "0", lg: "2rem" },
            }}
          >
            <Input
              onChange={(e) => setInfo({ ...info, chest: e.target.value })}
              value={info.chest}
              sx={{
                width: "8rem",
                pt: "2.5rem",
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                    margin: 0,
                  },
              }}
              placeholder="Chest (cm)"
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
              placeholder="Waist (cm)"
              type="number"
              required
            />
            <Input
              onChange={(e) => setInfo({ ...info, arm: e.target.value })}
              value={info.arm}
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
              placeholder="Arm (cm)"
              type="number"
              required
            />
            <Input
              onChange={(e) => setInfo({ ...info, thigh: e.target.value })}
              value={info.thigh}
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
              placeholder="Thigh (cm)"
              type="number"
              required
            />

            <Button
              onClick={addSize}
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
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
            <Box sx={{ minWidth: "100%", mt: "1.2rem" }}>
              <Typography
                sx={{ color: "red", fontSize: "0.7rem", textAlign: "center" }}
              >
                Please enter all required measurements.*
              </Typography>
            </Box>
          </Box>

          {/* Chart */}
          <Box
            sx={{
              minWidth: "22rem",
              width: "50rem",
              minHeight: "22rem",
              height: "16rem",
              overflow: "scroll",
            }}
          >
             <IconButton onClick={handleMenuClick} >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <MenuItem
                onClick={handleDelete}
                sx={{
                  fontSize: "0.85rem",
                  fontFamily: "Montserrat",
                  padding: '-12px -20px',
                  borderBottom: '1px solid #f0f0f0',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                  '&:hover': {
                    backgroundColor: '#f7f7f7',
                  },
                }}
              >
                Delete Data
              </MenuItem>
            </Menu>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[0, "auto"]} 
                  tickCount={6}
                  tickFormatter={(value) => value.toFixed(0)}
                  label={{
                    value: "Size (cm)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="chest"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Chest"
                />
                <Line
                  type="monotone"
                  dataKey="waist"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Waist"
                />
                <Line
                  type="monotone"
                  dataKey="arm"
                  stroke="#ffc658"
                  strokeWidth={2}
                  name="Arm"
                />
                <Line
                  type="monotone"
                  dataKey="thigh"
                  stroke="#ff7300"
                  strokeWidth={2}
                  name="Thigh"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SizeTracker;
