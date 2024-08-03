import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAdmin:false,
    isPremium:false,
    loading: false,
    error: false,
    token: null,
    userId: null,
    email:null,
    verified:null,
    avatar:"",
    name:"",
    password:"",
    passcode:"",
    sportBranch:[],
    savedBlog:[],
    membership:"Basic",
    users:[]
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
      state.passcode = payload?.passcode;
      state.token = payload?.Token;
      state.userId = payload?.result?._id;
      state.email=payload?.result?.email;
      state.name=payload?.result?.name;
      state.verified=payload?.result?.verified
      state.password=payload?.result?.password
      state.isAdmin=false
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.token = payload?.Token;
      state.currentUser = payload?.result?.name;
      state.userId = payload?.result?._id;
      state.email = payload?.result?.email;
      state.avatar=payload?.result?.avatar;
      state.name=payload?.result?.name;
      state.verified = payload?.result?.verified;
      state.password=payload?.result?.password
      state.isAdmin=payload?.result?.isAdmin
      state.isPremium=payload?.result?.isPremium
      state.sportBranch=payload?.result?.sportBranch
      state.savedBlog=payload?.result?.savedBlog
      state.membership=payload?.result?.membership
    },

    usersSuccess:(state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.users=payload.result
    },

    passwordUpdateSuccess:(state, { payload }) => {
      state.password=payload?.data?.result?.password
    },


    saveBlogSuccess:(state, { payload }) => {
      state.savedBlog=payload.result.savedBlog
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
  // logoutSuccess,
  registerSuccess,
  passwordUpdateSuccess,
  saveBlogSuccess,
  usersSuccess

} = authSlice.actions;

export default authSlice.reducer;
