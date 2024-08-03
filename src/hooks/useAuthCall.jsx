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
  // logoutSuccess,
  passwordUpdateSuccess,
  saveBlogSuccess,
  usersSuccess
  // updateContactSuccess,
  // getMyContactsSuccess,
} from "../features/authSlice";

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
      toast(error?.response?.data?.message)
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
        toast("No such account found!")
      } else {
        dispatch(loginSuccess(data));
        toast("Welcome to the DEFI.")
        navigate("/blogs");
      }
    } catch (error) {
      dispatch(fetchFail());
      toast("Invalid login. Please check your details and try again.")
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
      toast(error?.response?.data?.message)
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
      toast("Password Changed Successfully")
    } catch (error) {
      dispatch(fetchFail());
  toast("Failed to change password")
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
      toast("User delete failed!")
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
      dispatch(registerSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //! UPDATE A USER
  const updateUser = async (userId,updateData) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
        updateData
      );
        listUsers()
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  //! LIST USERS
  const listUsers = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(
        `${process.env.REACT_APP_BASE_URL}/users/`
      );
      console.log("data", data);
      dispatch(usersSuccess(data));
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
      toast("Error!");
      dispatch(fetchFail());
    }
  };

  // const logout = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     localStorage.clear();
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/auth/logout/`
  //     );
  //     dispatch(logoutSuccess());
  //     dispatch(logoutDataSuccess());
  //     toast("Logout successfull");
  //     navigate("/login");
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     toast(error);
  //   }
  // };

  // const getMyContacts = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axiosWithToken.get(`auth/users/getmycontacts`);
  //     dispatch(getMyContactsSuccess({ data }));
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //   }
  // };

  // const passwordUpdate = async (data) => {
  //   try {
  //     const res = await axiosWithToken.put(
  //       `${process.env.REACT_APP_BASE_URL}/auth/changepassword`,
  //       data
  //     );
  //     dispatch(passwordUpdateSuccess(res));
  //     toast("Password Changed Successfully");
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     toast("Failed to change password");
  //     toast(error);
  //   }
  // };

  return {
    login,
    register,
    // logout,
    forgotPass,
    deleteUser,
    update,
    listUsers,
    // addContact,
    // removeContact,
    // getMyContacts,
    passwordUpdate,
    saveBlog,
    updateUser
    // syncContacts,
  };
};

export default useAuthCall;
