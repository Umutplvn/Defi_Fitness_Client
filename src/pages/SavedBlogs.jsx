import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Link from "@mui/material/Link";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useDataCall from "../hooks/useDataCall";
import { useSelector } from "react-redux";
import { MenuItem, Select, TextField } from "@mui/material";
import defiIcon from "../assets/defi-icon.jpeg";
import { useEffect, useState } from "react";
import formatDateTime from "../helper/formatDateTime";
import useAuthCall from "../hooks/useAuthCall";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useNavigate } from "react-router-dom";
import spinner from "../assets/spinner.svg";
import parse from "html-react-parser";

const SavedBlogs = () => {
  const { getBlogs, likeBlog, deleteBlog } = useDataCall();
  const { saveBlog } = useAuthCall();
  const navigate = useNavigate();
  const {  savedBlog, isAdmin } = useSelector((state) => state?.auth);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const formatTag = (tag) => {
    if (!tag) return "";
    return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
  };
  
  const filteredBlogs = savedBlog.filter((item) => {
    if (!search.trim()) {
      return true;
    }
    return item.tags.some((tag) => formatTag(tag).includes(formatTag(search)));
  });


  useEffect(() => {
    setLoading(true);
    getBlogs().then(() => setLoading(false));
  }, []);

  const handleContent = (content) => {
    return parse(content, {
      replace: (domNode) => {
        if (domNode.name === "img") {
          domNode.attribs.class = `${
            domNode.attribs.class || ""
          } resized-image`;
          domNode.attribs.style =
            "width: 100%; max-height: 150px; object-fit: contain; border-radius:0.3rem";
        }
      },
    });
  };
const likeBlogFunc=(item)=>{
  likeBlog({ blogId: item?._id })
}
  return (
    <Box sx={{ marginBottom: "10rem", height: "100%" }}>
      {/* SEARCH BAR */}
      <Box
        sx={{
          width: "100wh",
          display: "flex",
          justifyContent: "center",
          pt: "2rem",
          pl: { xs: "0", sm: "4.5rem", md: "10rem" },
        }}
      >
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search in tags..."
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
      {loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
          }}
        >
          <Box
            sx={{
              pl: { xs: "0", sm: "4.5rem", md: "10rem" },
              mt: "4rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img style={{ width: "6rem" }} src={spinner} alt="Loading" />
          </Box>
        </Box>
      ) : savedBlog.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            pl: { xs: "0", sm: "4.5rem", md: "12rem" },
            pt: "3rem",
            gap: 4,
            width: "100wh",
          }}
        >
          {filteredBlogs
            ?.slice()
            .reverse()
            .map((item) => (
              <Card
                key={item._id}
                variant="outlined"
                sx={{
                  width: "300px",
                  "--Card-radius": (theme) => theme.vars.radius.xs,
                  position: "relative",
                  "&:hover": {
                    boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
                    scale: "1.001",
                    transform: "ease in out",
                    transition: "0.5s",
                  },
                }}
              >
                {isAdmin && (
                  <Box>
                    <Select
                      IconComponent={(props) => (
                        <MoreHorizIcon
                          {...props}
                          sx={{ width: "100%", backgroundColor: "white" }}
                        />
                      )}
                      sx={{
                        width: "2.5rem",
                        height: "1.7rem",
                        display: "flex",
                        justifyContent: "center",
                        "& fieldset": {
                          border: "none",
                        },
                      }}
                    >
                      <MenuItem
                        sx={{
                          cursor: "pointer",
                          width: "130px",
                          fontSize: "0.8rem",
                          marginRight: "-3rem",
                          pl: "0.4rem",
                          minHeight: "1rem",
                          backgroundColor: "#ffffff !important",
                          "&:hover": {
                            backgroundColor: "#f0f0f0 !important",
                          },
                        }}
                        onClick={() => deleteBlog(item._id)}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem
                        sx={{
                          cursor: "pointer",
                          width: "130px",
                          fontSize: "0.8rem",
                          marginRight: "-3rem",
                          pl: "0.4rem",
                          minHeight: "1rem",
                          marginBottom: "-0.3rem",
                          backgroundColor: "#ffffff !important",
                          "&:hover": {
                            backgroundColor: "#f0f0f0 !important",
                          },
                        }}
                        onClick={() =>
                          navigate(`/adminpanel/updateblog/${item._id}`)
                        }
                      >
                        Update
                      </MenuItem>
                    </Select>

                    <CardContent>
                      <Box
                        sx={{
                          position: "absolute",
                          right: "1rem",
                          top: "1rem",
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
                              "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
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
                    <hr
                      style={{ marginBottom: "-0.3rem", marginTop: "0.7rem" }}
                    />
                  </Box>
                )}

                <CardContent>
                  {!isAdmin && (
                    <Box sx={{ height: "2.4rem" }}>
                      <Box
                        sx={{
                          position: "absolute",
                          right: "1rem",
                          top: "0.6rem",
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
                              "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
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
                      <hr style={{ marginTop: "2rem" }} />
                    </Box>
                  )}

                  <Box
                    sx={{
                      maxWidth: "300px",
                      height: "298px",
                      overflow: "scroll",
                      WebkitBoxOrient: "vertical",
                      lineHeight: "1.2em",
                      "&::-webkit-scrollbar": {
                        width: "0px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "transparent",
                      },
                    }}
                  >
                    {handleContent(item.content)}
                  </Box>
                  <hr/>
                  {
                 <Typography sx={{fontSize:"0.7rem", color:"#565656", mb:"-0.5rem", mt:"-0.7rem"}}>
                 {item.tags.slice(0, 3).map((tag, index) => (
                   <span key={index}>#{tag} </span>
                 ))}
                 {item.tags.length > 3 ? <span>...</span> : <span style={{display:"inline-block"}}></span>}
               </Typography>
                  }
                </CardContent>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
              
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

                <CardContent
                  orientation="horizontal"
                  sx={{
                    gap: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    type="submit"
                    variant="contained"
                    onClick={() => navigate(`/blogs/${item._id}`)}
                    sx={{
                      color: "#ff5100",
                      fontSize: "1rem",
                      cursor: "pointer",
                      fontFamily: "Montserrat",
                      "&:hover": { color: "red" },
                    }}
                  >
                    Read More
                  </Typography>
                  <Link
                    component="button"
                    underline="none"
                    fontSize="10px"
                    sx={{
                      color: "text.tertiary",
                      my: 0.5,
                      fontFamily: "Montserrat",
                    }}
                  >
                    {formatDateTime(item.createdAt)}
                  </Link>
                </CardContent>
              </Card>
            ))}
        </Box>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            mt: "5rem",
            fontSize: "1.3rem",
            fontWeight: "600",
            color: "#FE5E00",
            pl: {
              xs: "0",
              sm: "4.5rem",
              md: "10rem",
              fontFamily: "Montserrat",
            },
          }}
        >
          There is no saved blog to show!
        </Typography>
      )}
    </Box>
  );
};

export default SavedBlogs;
