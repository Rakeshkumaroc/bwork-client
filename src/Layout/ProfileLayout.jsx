import Navbar from "../components/global/Navbar";
import ProfileSidebar from "../components/global/ProfileSidebar";
import ProfileHeader from "../components/jobseekerprofile/ProfileHeader"; 
 

const ProfileLayout = ({ children }) => {
  return (
    <div className="px-4 sm:px-10 lg:px-24 bg-light-cream min-h-screen">
      <Navbar />
      <ProfileHeader />
      <div className="flex gap-6 bg-light-cream min-h-screen py-6">
        <ProfileSidebar />
        <div className="flex-1 space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
