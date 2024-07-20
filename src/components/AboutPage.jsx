import { Box, Typography } from '@mui/material'
import React from 'react'

const AboutPage = () => {
  return (
    <Box id="about" sx={{ width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    p:"0.5rem"
    }}>
      <Typography sx={{fontSize:"1.2rem"}}>
      Kişiye özel DEFI güç, dayanıklılık ve mobilite antrenman programları. 
      </Typography>

      <Typography sx={{fontSize:"1.2rem"}}>

    Uygulama, çeşitli makaleler ve videolarla antrenmanlarınızı destekler. Ayrıca, uzmanlarımızla doğrudan iletişim kurabilirsiniz.
    </Typography>

    <Typography sx={{fontSize:"1.2rem"}}>

    Kişisel gelişiminizi takip edebileceğiniz özel sayfalarımız sayesinde ilerlemenizi izleyebilir ve motivasyonunuzu artırabilirsiniz.
    </Typography>

    <Typography sx={{fontSize:"1.2rem"}}>

    DEFI ile hedeflerinize ulaşmak ve performansınızı yükseltmek artık çok daha kolay!
    </Typography>

    </Box>
  )
}

export default AboutPage