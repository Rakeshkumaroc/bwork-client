import { createContext, useRef } from "react";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import ProfileSidebar from "../components/global/ProfileSidebar";
import ProfileHeader from "../components/jobseekerprofile/ProfileHeader";
export const MyContext = createContext();

const ProfileLayout = ({ children }) => {
  const resumeRef = useRef(null);
  const keySkillsRef = useRef(null);
  const employmentRef = useRef(null);
  const educationRef = useRef(null);
  const personalRef = useRef(null);
  return (
    <MyContext.Provider
      value={{
        resumeRef,
        keySkillsRef,
        employmentRef,
        educationRef,
        personalRef,
      }}
    >
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
    </MyContext.Provider>
  );
};

export default ProfileLayout;
