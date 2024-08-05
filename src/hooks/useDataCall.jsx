import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import { fetchStart, fetchFail, getBlogsSuccess } from "../features/dataSlice";

const useDataCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithToken } = useAxios();

  //CREATE BLOG
  const createBlog = async (blogData) => {
    dispatch(fetchStart());
    try {
  
      const { data } = await axiosWithToken.post(
        `${process.env.REACT_APP_BASE_URL}/blog/create`,
        blogData
        );
        getBlogs()
      } catch (error) {
      toast("Error!");
      dispatch(fetchFail());
    }
  };

    //UPDATE BLOG
    const updateBlog = async (blogId, blogData) => {
      dispatch(fetchStart());
      try {
        await axiosWithToken.put(
          `${process.env.REACT_APP_BASE_URL}/blog/update/${blogId}`,
          blogData
        );
        getBlogs();
      } catch (error) {
        toast.error("Error!");
        dispatch(fetchFail());
      }
    };


  // GET BLOGS
  const getBlogs = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/blog/list`
      );
      dispatch(getBlogsSuccess(data));
    } catch (error) {
      toast("Error!");
      dispatch(fetchFail());
    }
  };

  // LIKE BLOG
  const likeBlog = async (blogId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(
        `${process.env.REACT_APP_BASE_URL}/blog/like`,
        blogId
      );
      getBlogs();
    } catch (error) {
      toast("Error!");
      dispatch(fetchFail());
    }
  };

//DELETE BLOG
const deleteBlog = async (blogId) => {
  dispatch(fetchStart());
  try {
    const { data } = await axiosWithToken.delete(
      `${process.env.REACT_APP_BASE_URL}/blog/delete/${blogId}`
    );
    getBlogs();
  } catch (error) {
    toast("Error!");
    dispatch(fetchFail());
  }
};   



  return {
    getBlogs,
    likeBlog,
    deleteBlog,
    createBlog,
    updateBlog
  };
};

export default useDataCall;
