import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import useDataCall from "../hooks/useDataCall";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import defiIcon from "../assets/defi-icon.jpeg";
import { useEffect } from "react";
const Blogs = () => {


  const { getBlogs } = useDataCall();
  const { blogs } = useSelector((state) => state?.appData);
  useEffect(() => {
    getBlogs();
  }, []);

  console.log(blogs);
  return (
    <Box>
      {/* SEARCH BAR */}
      <Box
        sx={{
          width: "100wh",
          display: "flex",
          justifyContent: "center",
          pt: "2rem",
          ml: { sm: "4.5rem", md: "10rem" },
        }}
      >
        <TextField
          placeholder="Search in Blogs"
          variant="outlined"
          sx={{
            width: { xs: "15rem", md: "20rem" },
            borderRadius: "2rem",
            "& .MuiOutlinedInput-root": {
              height: "2.2rem",
              "& fieldset": {
                borderColor: "black",
                borderRadius: "2rem",
              },
              "&:hover fieldset": {
                borderColor: "#FE5E00",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FE5E00",
              },
              "& input": {
                height: "auto",
                padding: "0.75rem",
              },
            },
          }}
        />
      </Box>

      {/* BLOG CARD COMPONENT */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: { xs: "center" },
          ml: { xs: "0", sm: "6rem", md: "12rem" },
          pt: "3rem",
          width: "100wh",
          gap:4
        }}
      >
{blogs.map((item)=>{
  return(
   <Card
   variant="outlined"
   
   sx={{
     maxWidth: "310px",
     "--Card-radius": (theme) => theme.vars.radius.xs,
     "&:hover": {
       boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
       scale:"1.001",
       transform:"ease in out", 
       transition:"0.5s",
              cursor:"pointer"
     },
   }}
 >
   <CardContent>
   <Typography
  sx={{
    fontSize: "1rem",
    fontWeight: "600",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    textOverflow: "ellipsis",
  }}
>
  {item?.title}
</Typography>
   </CardContent>

   <CardOverflow>
     <AspectRatio>
       <img
         src={item?.image}
         alt=""
         loading="lazy"
         style={{ padding: "0.75rem", backgroundColor: "#FBFCFE" }}
       />
     </AspectRatio>
   </CardOverflow>

   <CardContent
     orientation="horizontal"
     sx={{ alignItems: "center", mx: -1 }}
   >
     <Box sx={{ width: 0, display: "flex", gap: 0.5, pl:"0.75rem" }}>
       <IconButton variant="plain" color="neutral" size="sm">
         <FavoriteBorderIcon />
         <FavoriteIcon  sx={{color:"red"}}/>
       </IconButton>
       <IconButton variant="plain" color="neutral" size="sm">
         <MessageOutlinedIcon  style={{fontSize:"1.5rem"}}/>
       </IconButton>
     </Box>
     <Box
       sx={{
         display: "flex",
         alignItems: "center",
         gap: 0.5,
         mx: "auto",
       }}
     ></Box>
     <Box
       sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}
     >
       <IconButton variant="plain" color="neutral" size="sm">
         <BookmarkBorderIcon style={{fontSize:"1.5rem"}} />
       </IconButton>
     </Box>
   </CardContent>
   <CardContent>
   <Typography
  sx={{
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    textOverflow: "ellipsis",
  }}
>
  {item?.content}
</Typography>
     <Link
       component="button"
       underline="none"
       fontSize="sm"
       startDecorator="…"
       sx={{ color: "text.tertiary" }}
     >
       more
     </Link>
   </CardContent>
   <CardContent
     orientation="horizontal"
     sx={{
       gap: 1,
       width: "100wh",
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
     }}
   >
     <Link
       component="button"
       underline="none"
       fontSize="10px"
       sx={{ color: "text.tertiary", my: 0.5 }}
     >
       2 DAYS AGO
     </Link>
     <Box
       sx={{
         position: "relative",
         "&::before": {
           content: '""',
           position: "absolute",
           top: 0,
           left: 0,
           bottom: 0,
           right: 0,
           m: "-2px",
           borderRadius: "50%",
           background:
             "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
         },
       }}
     >
       <Avatar
         size="sm"
         src={defiIcon}
         sx={{
           border: "2px solid",
           borderColor: "background.body",
         }}
       />
     </Box>
   </CardContent>
 </Card>
  )
})}
       

      </Box>
    </Box>
  );
};

export default Blogs;
