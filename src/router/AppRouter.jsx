import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import EmailVerification from "../pages/EmailVerification";
import ForgotPass from "../pages/ForgotPass";
import ResetForgottenPass from "../pages/ResetForgottenPass";
import Index from "../pages/Index";
import Video from "../components/Video";
import AboutPage from "../components/AboutPage";
import MembershipPlans from "../components/MembershipPlans";
import Services from "../components/Services";
import ManageProfile from "../components/ManageProfile";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/index" index element={<Index />} />
        <Route path="/video" element={<Video />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/membership" element={<MembershipPlans />} />
        <Route path="/services" element={<Services />} />
        <Route path="/manageprofile" element={<ManageProfile />} />
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
