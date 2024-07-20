import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";
import ForgotPass from "../pages/ForgotPass";
import ResetForgottenPass from "../pages/ResetForgottenPass";
import Index from "../pages/Index";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/index" element={<Index />} />
        {/* <Route path="/" element={<PrivateRouter />}> */}
        <Route path="/verification" element={<EmailVerification />} />
        <Route path="/forgotpass" element={<ForgotPass/>} />
        <Route path="/reset-password/:userId" element={<ResetForgottenPass/>} />
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default AppRouter;
