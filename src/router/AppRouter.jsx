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
import PaidContent from "../pages/PaidContent";
import AdminPanel from "../pages/AdminPanel";
import BlogRead from "../pages/BlogRead";
import Chats from "../pages/Chats";
import Chat from "../pages/Chat";
import UpdateBlog from "../pages/UpdateBlog";
import CreateBlog from "../pages/CreateBlog";
import CreatePaidPlan from "../pages/CreatePaidPlan";
import Members from "../pages/Members";
import WorkoutPlan from "../pages/WorkoutPlan";
import WorkoutProgram from "../pages/WorkoutProgram";
import SavedBlogs from "../pages/SavedBlogs";
import WorkoutPR from "../pages/WorkoutPR";
import Bodysize from "../pages/Bodysize";
import Settings from "../pages/Settings";
import ChangePlan from "../components/ChangePlan";
import BMITracker from "../pages/BMITracker";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/video" element={<Video />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/membership" element={<MembershipPlans />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/verification" element={<EmailVerification />} />
      <Route path="/forgotpass" element={<ForgotPass />} />
      <Route path="/reset-password/:userId" element={<ResetForgottenPass />} />

      {/* Private Routes */}
      <Route path="/" element={<PrivateRouter />}>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/blogs/:blogId" element={<BlogRead />} />
        <Route path="/adminpanel/updateblog/:blogId" element={<UpdateBlog />} />
        <Route path="/adminpanel/createblog" element={<CreateBlog />} />
        <Route path="/adminpanel/createpaidplan" element={<CreatePaidPlan />} />
        <Route path="/adminpanel/members" element={<Members />} />
        <Route path="/adminpanel/workoutplan" element={<WorkoutPlan />} />
        <Route path="/profile/workoutprogram" element={<WorkoutProgram />} />
        <Route path="/profile/savedblogs" element={<SavedBlogs />} />
        <Route path="/profile/pr" element={<WorkoutPR />} />
        <Route path="/profile/bodysize" element={<Bodysize />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/profile/changeplan" element={<ChangePlan />} />
        <Route path="/profile/bmi" element={<BMITracker />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
