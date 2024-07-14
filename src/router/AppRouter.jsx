import { Route, Routes } from "react-router";
import Home from "../pages/Home"
import Register from "../pages/Register";
import { useState } from "react";
import Login from "../pages/Login";
const AppRouter = () => {
  
  
  return (
    <>
      <Routes>
     <Route path="/" index element={<Home />} /> 
      <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         {/* <Route path="/" element={<PrivateRouter />}> */}
          {/* <Route path="/verification" element={<EmailVerification />} />  */}
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default AppRouter;
