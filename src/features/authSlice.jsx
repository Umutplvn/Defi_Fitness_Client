import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: false,
    currentUser: null,
    token: null,
    userId: null,
    email:null,
    verified:null,
    avatar:"",
    name:"",
    password:""
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },

    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.currentUser = payload?.result?.name;
      state.token = payload?.Token;
      state.userId = payload?.result?._id;
      state.email=payload?.result?.email;
      state.name=payload?.result?.name;
      state.passcode = payload?.passcode;
      state.verified=payload?.result?.verified
      state.password=payload?.result?.password
    },


    deleteSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.currentUser = "";
      state.token = "";
      state.userId ="";
      state.avatar ="";
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.currentUser = payload?.result?.name;
      state.token = payload?.Token;
      state.userId = payload?.result?._id;
      state.email = payload?.result?.email;
      state.username=payload?.result?.username;
      state.avatar=payload?.result?.avatar;
      state.name=payload?.result?.name;
      state.contacts=payload?.result?.contacts;
      state.verified = payload?.result?.verified;
      state.bio=payload?.result?.bio
      state.password=payload?.result?.password
    },



    passwordUpdateSuccess:(state, { payload }) => {
      state.password=payload?.data?.result?.password
    },

    getMyContactsSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.contacts = payload?.data?.contacts;
    },


    updateContactSuccess: (state, { payload }) => {
      // state.loading = false;
      // state.error = true;
      // state.contacts = payload?.data?.contacts;
    },


    logoutSuccess: (state) => {
      state.loading= false;
      state.error= false;
      state.currentUser= null;
      state.username= null;
      state.token= null;
      state.userId= null;
      state.email=null;
      state.verified=null;
      state.contacts=[];
      state.user=[];
      state.avatar="";
      state.name="";
      state.bio= "";
      state.password= "";
    },

  
    //////////

    UpdateSuccess:(state, {payload})=>{
      state.loading = false;
      state.error = false;

    }
  },
});

export const {
  fetchStart,
  fetchFail,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  UpdateSuccess,
  deleteSuccess,
  updateContactSuccess,
  getMyContactsSuccess,
  passwordUpdateSuccess
} = authSlice.actions;

export default authSlice.reducer;
