import { Box } from '@mui/material';
import React, { useState } from 'react';
import Video from '../components/Video';
import Header from '../components/Header';
import AboutPage from '../components/AboutPage';
import TabBar from "../components/TabBar"
import Services from '../components/Services';
import MembershipPlans from '../components/MembershipPlans';
import ManageProfile from '../components/ManageProfile';
const Index = () => {
  const [play, setPlay] = useState(true);

  return (
    <Box>
    <TabBar/>
      <Video play={play} setPlay={setPlay} />
      <AboutPage/>
      <MembershipPlans/>
      <Services/>
      <ManageProfile/>
    </Box>
  );
};

export default Index;
