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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import useDataCall from "../hooks/useDataCall";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import defiIcon from "../assets/defi-icon.jpeg";
import { useEffect } from "react";
import { useState } from "react";
import formatDateTime from "../helper/formatDateTime";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import useAuthCall from "../hooks/useAuthCall";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const { getBlogs, likeBlog } = useDataCall();
  const { saveBlog } = useAuthCall();
  const navigate=useNavigate()
  const { blogs } = useSelector((state) => state?.appData);
  const { userId, savedBlog } = useSelector((state) => state?.auth);
  const [search, setSearch] = useState("");
  const publicBlogs = blogs?.filter((item) => item.status == "public");
  const filteredBlogs = publicBlogs.filter(
    (item) =>
      item.category_name.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Box sx={{ marginBottom: "10rem" }}>
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
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
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
          gap: 4,
        }}
      >
        {filteredBlogs?.map((item) => {
          return (
            <Card
            onClick={()=>navigate(`/blogs/${item._id}`)}
              variant="outlined"
              sx={{
                maxWidth: "310px",
                "--Card-radius": (theme) => theme.vars.radius.xs,
                "&:hover": {
                  boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
                  scale: "1.001",
                  transform: "ease in out",
                  transition: "0.5s",
                  cursor: "pointer",
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
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "0.75rem",
                  }}
                >
                  <Box>
                    <IconButton
                      variant="plain"
                      color="neutral"
                      size="sm"
                      onClick={() => likeBlog({ blogId: item?._id })}
                    >
                      {/* LIKES */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width:"2.4rem"
                        }}
                      >
                        {item.likes.some((like) => like == userId) ? (
                          <FavoriteIcon
                          style={{ fontSize: "1.5rem", marginRight: "0.1rem", color:"red"}}
                          />
                        ) : (
                          <FavoriteBorderIcon                         style={{ fontSize: "1.5rem", marginRight: "0.1rem" }}
                          />
                        )}
                        <Typography sx={{ fontSize: "1rem", color: "#535353" }}>
                          {item?.likes_n}
                        </Typography>
                      </Box>
                    </IconButton>
                    {/* COMMENTS */}
                    <IconButton
                      variant="plain"
                      color="neutral"
                      size="sm"
                      
                      sx={{ width:"2.6rem", textAlign:"start"          
                    }}
                    >
                      <MessageOutlinedIcon
                        style={{ fontSize: "1.5rem", marginRight: "0.2rem" }}
                        />
                      <Typography sx={{ fontSize: "1rem", color: "#535353" }}>
                        {item?.comments.length}
                      </Typography>
                    </IconButton>
                    {/* POST VIEWS */}
                    <IconButton variant="plain" color="neutral" size="sm">
                      <VisibilityOutlinedIcon
                        style={{ fontSize: "1.5rem", marginRight: "0.2rem" }}
                      />
                      <Typography sx={{ color: "black", fontSize: "0.9rem" }}>
                        {item?.post_views?.length}
                      </Typography>
                    </IconButton>
                  </Box>
                  {/*BOOK MARK  */}
                  <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    onClick={() => saveBlog({ blogId: item?._id })}
                  >
                    {savedBlog.some((save) => save._id === item._id) ? (
                      <BookmarkIcon style={{ fontSize: "1.5rem" }} />
                    ) : (
                      <BookmarkBorderIcon style={{ fontSize: "1.5rem" }} />
                    )}
                  </IconButton>
                </Box>
              </CardContent>
              <Typography sx={{ color: "#898989", fontSize: "0.7rem" }}>
                # {item?.category_name}
              </Typography>
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
                  {formatDateTime(item.createdAt)}
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
          );
        })}
      </Box>
    </Box>
  );
};

export default Blogs;
