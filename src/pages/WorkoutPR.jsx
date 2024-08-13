import { Box, Button, Input, Typography, Menu, MenuItem, IconButton  } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuthCall from '../hooks/useAuthCall';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const PRTracker = () => {
  const { createPR, listPR, deletePR } = useAuthCall();
  const [info, setInfo] = useState({ bench: "", deadlift: "", squat: "" });
  const { userId, PR } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    if (userId) {
      listPR();
    }
  }, []);

  const addPR = () => {
    if (!info.bench || !info.deadlift || !info.squat) {
      return toast.error("Please enter all required data!");
    } else {
      createPR({ bench: info.bench, deadlift: info.deadlift, squat: info.squat });
      setInfo({ bench: "", deadlift: "", squat: "" });
    }
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deletePR()
      setSelectedItem(null);
      handleClose();
  };

  const chartData = PR?.map(item => ({
    date: new Date(item.createdAt).toLocaleDateString(),
    bench: item.bench,
    deadlift: item.deadlift,
    squat: item.squat,
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
          PR TRACKER
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: 'center', p: {xs:"2rem", xl:"4rem"}, gap: "2rem", mt: { xs: "0", lg: "1rem" } }}>
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
              onChange={(e) => setInfo({ ...info, bench: e.target.value })}
              value={info.bench}
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
              placeholder="Bench (kg)"
              type="number"
              required
            />
            <Input
              onChange={(e) => setInfo({ ...info, deadlift: e.target.value })}
              value={info.deadlift}
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
              placeholder="Deadlift (kg)"
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
              placeholder="Squat (kg)"
              type="number"
              required
            />

            <Button
              onClick={addPR}
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
            <Box sx={{ minWidth: "100%", mt: "1.5rem" }}>
              <Typography sx={{ color: "red", fontSize: "0.7rem", textAlign: "center" }}>
                Please enter all required lifts.*
              </Typography>
            </Box>
          </Box>

          {/* Chart */}
          <Box sx={{ minWidth: "22rem", width: "50rem", minHeight: "22rem", height: "16rem", overflow: "scroll" }}>
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
                  domain={[0, 'auto']}
                  tickCount={6}
                  tickFormatter={(value) => value.toFixed(0)}
                  label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bench" stroke="#8884d8" strokeWidth={2} name="Bench" />
                <Line type="monotone" dataKey="deadlift" stroke="#82ca9d" strokeWidth={2} name="Deadlift" />
                <Line type="monotone" dataKey="squat" stroke="#ff7300" strokeWidth={2} name="Squat" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PRTracker;
