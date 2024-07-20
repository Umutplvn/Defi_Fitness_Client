import { Box } from '@mui/material';
import React, { useState } from 'react';
import Video from '../components/Video';
import Header from '../components/Header';

const Index = () => {
  const [play, setPlay] = useState(true);

  return (
    <Box>
      <Header setPlay={setPlay} play={play} />
      <Video play={play} />
    </Box>
  );
};

export default Index;
