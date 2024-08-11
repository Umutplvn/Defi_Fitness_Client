import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  passwordUpdateSuccess,
  saveBlogSuccess,
  usersSuccess
  // updateContactSuccess,
  // getMyContactsSuccess,
} from "../features/authSlice";
import {logoutDataSuccess} from "../features/dataSlice"
const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { axiosWithToken } = useAxios();


  //! REGISTER FUNCTION
  const register = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register/`,
        userData
      );
      dispatch(registerSuccess(data));
      navigate("/verification");
    } catch (error) {
      console.log('Error during registration:', error?.response?.data?.message);
      dispatch(fetchFail());
      toast.error(error?.response?.data?.message)
    }
  };
  

  //! LOGIN FUNCTION
    const login = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login/`,
        userData
      );
      if (!data?.result?.verified) {
        deleteUser(data?.result?._id);
        toast.error("No such account found!")
      } else {
        dispatch(loginSuccess(data));
        toast.success("Welcome to the DEFI")
        navigate("/blogs");
      }
    } catch (error) {
      dispatch(fetchFail());
      toast.error("Invalid login. Please check your details and try again.")
        }
  };


//! FORGOT PASSWORD (TO GET EMAIL)
  const forgotPass = async (email) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/forgotpass`,
        email
      );
      dispatch(loginSuccess(data));
      navigate("/blogs");
    } catch (error) {
      console.log('Error during registration:', error?.response?.data?.message);
      dispatch(fetchFail());
      toast.error(error?.response?.data?.message)
    }
  };

  //! CREAT A NEW EUSER
  const createNewUser = async (userData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(
        `${process.env.REACT_APP_BASE_URL}/users/createuser/`,
        userData
      );
      listUsers()
    } catch (error) {
      console.log('Error during registration:', error?.response?.data?.message);
      dispatch(fetchFail());
      toast.error(error?.response?.data?.message)
    }
  };


//! DELETE USER
  const deleteUser = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`
      );
      listUsers()
    } catch (error) {
      dispatch(fetchFail());
      toast.error("User delete failed!")
    }
    
  };

//! UPDATE PROFILE
  const update = async (userId,updateData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
        updateData
      );
      dispatch(loginSuccess(data));
      toast.success("Profile updated successfully")
    } catch (error) {
      dispatch(fetchFail());
      toast.error(error)
    }
  };

  //! UPDATE A MEMBER
  const updateUser = async (userId,updateData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
        updateData
      );
        listUsers()
toast.success("Profile updated successfully")
    } catch (error) {
      dispatch(fetchFail());
      toast.error("This email is already taken")
    }
  };

    //! UPDATE A WORKOUT PLAN
    const updateWorkoutPlan = async (info) => {
      dispatch(fetchStart());
      try {
        await axiosWithToken.put(
          `${process.env.REACT_APP_BASE_URL}/users/uploadworkoutplan`,
          info
        );
          listUsers()
          toast.success("Form submitted successfully!");
      } catch (error) {
        dispatch(fetchFail());
        toast.error("Failed!")
      }
    };
  //! LIST USERS
  const listUsers = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_BASE_URL}/users/`
      );
      dispatch(usersSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const readUser = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`
      );
      console.log("read",data);
    } catch (error) {
      dispatch(fetchFail());
    }
  };


  //! SAVE BLOG
  const saveBlog = async (blogId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post(
        `${process.env.REACT_APP_BASE_URL}/users/savedblog`,
        blogId
      );
      dispatch(saveBlogSuccess(data))
    } catch (error) {
      toast.error("Error!");
      dispatch(fetchFail());
    }
  };

  //! UPDATE PASSWORD
  const passwordUpdate = async (password) => {
    try {
      const res = await axiosWithToken.put(
        `${process.env.REACT_APP_BASE_URL}/users/updatepass`,
        password
      );
      dispatch(passwordUpdateSuccess(res));
      toast.success("Password Changed Successfully")
    } catch (error) {
      dispatch(fetchFail());
  toast.error("Failed to change password")
    }
  };

//! LOGOUT FUNCTION
  const logout = async () => {
    dispatch(fetchStart());
    try {
      localStorage.clear();
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/logout/`
      );
      dispatch(logoutSuccess());
      dispatch(logoutDataSuccess());
      toast.success("Logout successfull");
    } catch (error) {
      dispatch(fetchFail());
      toast.error(error);
    }
  };



  return {
    login,
    register,
    createNewUser,
    logout,
    forgotPass,
    deleteUser,
    update,
    listUsers,
    updateWorkoutPlan,
    passwordUpdate,
    saveBlog,
    updateUser,
    readUser
  };
};

export default useAuthCall;
