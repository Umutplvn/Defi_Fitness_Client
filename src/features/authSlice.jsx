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
    surname:"",
    password:"",
    passcode:"",
    sportBranch:"",
    savedBlog:[],
    membership:"Basic",
    users:[],
    level:"",
    workoutplan:"",
    dateOfBirth:"",
    gender:"",
    size:[],
    BMI:[],
    PR:[],
    stripeCustomerId:""
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
      state.level=payload?.result?.level
      state.workoutplan=payload?.result?.workoutplan
      state.surname=payload?.result?.surname
      state.dateOfBirth=payload?.result?.dateOfBirth
      state.gender=payload?.result?.gender
    },

    usersSuccess:(state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.users=payload.result
    },

    sizeSuccess:(state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.size=payload.result
    },

    PRSuccess:(state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.PR=payload.result
    },
    BMISuccess:(state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.BMI=payload.result
    },


    passwordUpdateSuccess:(state, { payload }) => {
      state.password=payload?.data?.result?.password
    },


    saveBlogSuccess:(state, { payload }) => {
      state.savedBlog=payload.result.savedBlog
    },

    readMembershipSuccess:(state, { payload }) => {
      state.membership=payload?.result?.membership
      state.stripeCustomerId=payload?.result?.stripeCustomerId
    },

    logoutSuccess: (state) => {
    state.isAdmin=false;
    state.isPremium=false;
    state.loading= false;
    state.error= false;
    state.token= null;
    state.userId= null;
    state.email=null;
    state.verified=null;
    state.avatar="";
    state.name="";
    state.surname="";
    state.password="";
    state.passcode="";
    state.sportBranch="";
    state.savedBlog=[];
    state.membership="Basic";
    state.users=[];
    state.level="";
    state.workoutplan="";
    state.dateOfBirth="";
    state.gender="";
    state.size=[];
    state.BMI=[];
    state.PR=[];
    state.stripeCustomerId=""
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
  passwordUpdateSuccess,
  saveBlogSuccess,
  usersSuccess,
  BMISuccess,
  sizeSuccess,
  PRSuccess,
  readMembershipSuccess

} = authSlice.actions;

export default authSlice.reducer;
