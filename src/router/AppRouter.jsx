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
import Contact from "../components/Contact";
import Blogs from "../pages/Blogs";
import PrivateRouter from "../pages/PrivateRouter";

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/verification" element={<EmailVerification />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route
          path="/reset-password/:userId"
          element={<ResetForgottenPass />}
        />
        {/*PIRVATE ROUTER */}
        <Route path="/" element={<PrivateRouter />}>
          <Route path="/blogs" element={<Blogs />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
