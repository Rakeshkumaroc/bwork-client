import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiBriefcase,
  FiSearch,
  FiBookOpen,
  FiSettings,
  FiEdit,
  FiStar,
  FiInfo,
  FiLogOut,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import ProfileSidebarSkel from "../skeleton/jobseeker/ProfileSidebarSkel";

const externalTabs = [
  {
    label: "Search History",
    icon: <FiSearch />,
    path: "/profile/search-history",
  },
  { label: "My Job", icon: <FiBriefcase />, path: "/profile/my-jobs" },
  { label: "My Review", icon: <FiInfo />, path: "/profile/my-reviews" },
  { label: "Settings", icon: <FiSettings />, path: "/profile/settings" },
];

const internalTabs = [
  { label: "Resume", icon: <FiEdit />, action: "Update", id: "resume" },
  { label: "Key Skills", icon: <FiStar />, id: "key-skills" },
  {
    label: "Employment",
    icon: <FiBriefcase />,
    action: "Add",
    id: "employment",
  },
  { label: "Education", icon: <FiBookOpen />, action: "Add", id: "education" },
  { label: "Personal Details", icon: <FiUser />, id: "personal-details" },
];

const ProfileSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeRef, keySkillsRef, employmentRef, educationRef, personalRef } =
    useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [activeInternalTab, setActiveInternalTab] = useState(null);

  // Map refs to internal tab IDs
  const refMap = {
    resume: resumeRef,
    "key-skills": keySkillsRef,
    employment: employmentRef,
    education: educationRef,
    "personal-details": personalRef,
  };

  // Simulate data fetching (replace with actual API/auth check if needed)
  useEffect(() => {
    const fetchUserData = async () => {
      // Simulate a delay for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust delay as needed
    };

    fetchUserData();
  }, []);

  // Scroll to section
  const scrollPage = (refElement) => {
    const topSpace = 80;
    window.scrollTo({
      top: refElement.current.offsetTop - topSpace,
      behavior: "smooth",
    });
  };

  // Track scroll position to highlight internal tabs
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Adjust for offset
      let activeTab = null;

      internalTabs.forEach((tab) => {
        const ref = refMap[tab.id];
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (
            scrollPosition >= offsetTop - 80 &&
            scrollPosition < offsetTop + offsetHeight - 80
          ) {
            activeTab = tab.id;
          }
        }
      });

      setActiveInternalTab(activeTab);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [refMap]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (isLoading) {
    return <ProfileSidebarSkel />;
  }

  return (
    <div className="w-64 h-screen sticky top-0 bg-white rounded-md shadow-md p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-6 px-4">
          Quick Links
        </h2>

        {/* Internal Tabs */}
        <ul className="space-y-3">
          {internalTabs.map((item, index) => (
            <li
              key={index}
              className={`flex justify-between items-center py-2 px-4 ${
                activeInternalTab === item.id &&
                location.pathname === "/profile"
                  ? "text-yellow-400 font-semibold bg-yellow-50"
                  : "text-gray-800 hover:bg-gray-100"
              } rounded-md transition`}
            >
              <Link
                to="/profile"
                onClick={() => scrollPage(refMap[item.id])}
                className="flex items-center space-x-2 w-full text-sm"
                title={`Go to ${item.label}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
              {item.action && (
                <button
                  onClick={() => scrollPage(refMap[item.id])}
                  className="text-sm text-yellow-400 hover:text-yellow-600 font-medium"
                  title={`${item.action} ${item.label}`}
                >
                  {item.action}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* External Tabs */}
        <ul className="space-y-3">
          {externalTabs.map((item, index) => (
            <li
              key={index}
              className={`flex items-center py-2 px-4 ${
                location.pathname === item.path
                  ? "text-yellow-400 font-semibold bg-yellow-50"
                  : "text-gray-800 hover:bg-gray-100"
              } rounded-md transition`}
            >
              <Link
                to={item.path}
                className="flex items-center space-x-2 text-sm w-full"
                title={`Go to ${item.label}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm py-2 hover:bg-gray-100 rounded-md transition"
          title="Log Out"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
