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
    deleteBlog
  };
};

export default useDataCall;
