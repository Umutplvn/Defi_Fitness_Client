import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import {
  fetchStart,
  fetchFail,
  // loginSuccess,
  registerSuccess,
  // logoutSuccess,
  // passwordUpdateSuccess,
  deleteSuccess,
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
      console.log('Error during registration:', error?.response?.data?.message); // Log error with a descriptive message
      dispatch(fetchFail());
      toast(error?.response?.data?.message)
    }
  };
  


//! DELETE USER
  const deleteUser = async (userId) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`
      );
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
      toast("User delete failed! ✖️");
    }
    
  };

//! UPDATE USER

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

  // const login = async (userData) => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/auth/login/`,
  //       userData
  //     );
  //     if (!data?.result?.verified) {
  //       deleteUser(data?.result?._id);
  //       toast("No such account found!");
  //     } else {
  //       dispatch(loginSuccess(data));
  //       toast("Welcome to the Connectify.");
  //       navigate("/chats");
  //     }
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //     toast("Incorrect login. Double check your details and try again.  ");
  //   }
  // };

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
    // login,
    register,
    // logout,
    deleteUser,
    update,
    // addContact,
    // removeContact,
    // getMyContacts,
    // passwordUpdate,
    // syncContacts,
  };
};

export default useAuthCall;
