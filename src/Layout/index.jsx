import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/global/ScrollToTop";
import Home from "../pages/landing/Home";
import About from "../pages/landing/About";
import Contact from "../pages/landing/Contact";
import Features from "../pages/landing/Features";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import OrgSetup from "../pages/admin/OrgSetup";
import Dashboard from "../pages/admin/Dashboard";
import Admin from "../pages/admin/Admin";
import ManageApplicants from "../pages/admin/ManageApplicants";
import ManageBranchesList from "../pages/admin/ManageBranchesList";
import OrgSetup2 from "../pages/admin/OrgSetup2";
import ManageUserList from "../pages/admin/ManageUserList";
import BranchUserAdd from "../pages/admin/BranchUserAdd";
import AddBranchDetails from "../pages/admin/AddBranchDetails";
import ViewBranch from "../pages/admin/ViewBranch";
import ViewBranchUser from "../pages/admin/ViewBranchUser";
import Settings from "../pages/admin/Settings";
import AddJobDetails from "../pages/admin/AddJobDetails";
import ManageJobsList from "../pages/admin/ManageJobsList"; 
import ProfileCard from "../pages/admin/ProfileCard";
import JobProviderSetup from "../pages/admin/JobProviderSetup";
import EmployersSignup from "../pages/auth/EmployersSignup";
import EmployersLogin from "../pages/auth/EmployersLogin";
import Profile from "../pages/jobseekerprofile/Profile"; 
import MyJobs from "../components/jobseekerprofile/MyJobs";
import MyReviews from "../components/jobseekerprofile/MyReviews";
import JobSeekerSettings from "../components/jobseekerprofile/JobSeekerSettings";
import SearchHistory from "../components/jobseekerprofile/SearchHistory";
import ManageProviderList from "../pages/admin/ManageProviderList";
import ViewJob from "../pages/admin/ViewJob";
import JobSeekerSetup from "../pages/admin/JobSeekerSetup";
import ViewJobProvider from "../pages/admin/ViewJobProvider";
import ManageSeekerList from "../pages/admin/ManageSeekerList";
import ViewJobSeeker from "../pages/admin/ViewJobSeeker";

const index = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employers-signup" element={<EmployersSignup />} />
        <Route path="/employers-login" element={<EmployersLogin />} />
        <Route path="/org-setup" element={<OrgSetup />} />
        <Route path="/job-provider-setup" element={<JobProviderSetup />} />
        <Route path="/job-seeker-setup" element={<JobSeekerSetup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/my-jobs" element={<MyJobs />} />
        <Route path="/profile/my-reviews" element={<MyReviews />} />
        <Route path="/profile/search-history" element={<SearchHistory />} />
        <Route path="/profile/settings" element={<JobSeekerSettings />} />


        <Route path="/dashboard" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-branch/list" element={<ManageBranchesList />} />
          <Route path="manage-branch/list/:id" element={<ViewBranch />} />
          <Route path="manage-branch/add" element={<AddBranchDetails />} />
          <Route
            path="manage-branch/:id"
            element={<AddBranchDetails action={"edit"} />}
          />
             <Route path="branch-user/list" element={<ManageUserList />} />
          <Route path="branch-user/list/:id" element={<ViewBranchUser />} />
          <Route path="branch-user/add" element={<BranchUserAdd />} />
          <Route
            path="branch-user/:id"
            element={<BranchUserAdd action={"edit"} />}
          />
           <Route path="manage-job-providers/list" element={<ManageProviderList />} />
          <Route path="manage-job-providers/list/:id" element={<ViewJobProvider />} />
           <Route path="manage-job-seekers/list" element={<ManageSeekerList />} />
           <Route path="manage-job-seekers/list/:id" element={<ViewJobSeeker />} />
          <Route path="manage-job/list" element={<ManageJobsList />} />
          <Route path="manage-job/list/:id" element={<ViewJob />} />
          <Route path="manage-job/add" element={<AddJobDetails />} />
          <Route path="manage-job/:id" element={<AddJobDetails action={"edit"} />} />
         
          <Route path="manage-applicants/list" element={<ManageApplicants />} />
          <Route
            path="manage-applicants/list/:view-profile"
            element={<ProfileCard />}
          />
        
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;
