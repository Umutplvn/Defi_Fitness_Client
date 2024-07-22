import { Route, Routes } from "react-router";
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
import Profile from "../pages/Profile";
import Videos from "../pages/Videos";
import Mails from "../pages/Mails";
import PaidContent from "../pages/PaidContent";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/index" index element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
        <Route>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/videos" element={<Videos/>} />
          <Route path="/emails" element={<Mails/>} />
          <Route path="/paidcontent" element={<PaidContent/>} />
        </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
