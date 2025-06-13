import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import ProfileSidebar from "../components/global/ProfileSidebar";
import ProfileHeader from "../components/jobseekerprofile/ProfileHeader";

const ProfileLayout = ({ children }) => {
  return (
    <div className="  bg-gray-100 min-h-screen">
      <Navbar />
      <div className="md:px-[50px] px-4 py-4">
        <ProfileHeader />
        <div className="flex gap-6 bg-gray-100 min-h-screen py-6">
          <ProfileSidebar />
          <div className="flex-1 space-y-6">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileLayout;
