import { Box } from '@mui/material';
import React, { useState } from 'react';
import Video from '../components/Video';
import TabBar from "../components/TabBar";
import AboutPage from '../components/AboutPage';
import MembershipPlans from '../components/MembershipPlans';
import Contact from '../components/Contact';

const Index = () => {
  const [play, setPlay] = useState(true);

  return (
    <Box >
      <TabBar />
      <Video play={play} setPlay={setPlay} />
      <AboutPage />
      <MembershipPlans />
      <Contact/>
    </Box>
  );
};

export default Index;
