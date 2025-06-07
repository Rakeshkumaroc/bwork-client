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

const externalTabs = [
  { label: "Search History", icon: <FiSearch />, path: "/profile/search-history" },
  { label: "My Job", icon: <FiBriefcase />, path: "/profile/my-job" },
  { label: "My Review", icon: <FiInfo />, path: "/profile/my-review" },
  { label: "Settings", icon: <FiSettings />, path: "/profile/settings" },
];

const internalTabs = [
  { label: "Resume", icon: <FiEdit />, action: "Update", id: "resume" },
  { label: "Key Skills", icon: <FiStar />, id: "key-skills" },
  { label: "Employment", icon: <FiBriefcase />, action: "Add", id: "employment" },
  { label: "Education", icon: <FiBookOpen />, action: "Add", id: "education" },
  { label: "Personal Details", icon: <FiUser />, id: "personal-details" },
];

const ProfileSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeRef, keySkillsRef, employmentRef, educationRef, personalRef } =
    useContext(MyContext);
  const [activeInternalTab, setActiveInternalTab] = useState(null);

  // Map refs to internal tab IDs
  const refMap = {
    resume: resumeRef,
    "key-skills": keySkillsRef,
    employment: employmentRef,
    education: educationRef,
    "personal-details": personalRef,
  };

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

  return (
    <div className="w-64 h-screen sticky top-0 py-6 rounded-lg bg-cream shadow border flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-6 text-gray-900 px-6">
          Quick Links
        </h2>

        {/* Internal Tabs */}
        <ul className="space-y-3">
          {internalTabs.map((item, index) => (
            <li
              key={index}
              className={`flex justify-between items-center py-2 px-6 ${
                activeInternalTab === item.id && location.pathname === "/profile"
                  ? "text-orange-global font-semibold"
                  : "text-gray-800"
              }`}
            >
              <Link
                to="/profile"
                onClick={() => scrollPage(refMap[item.id])}
                className="flex items-center space-x-2 hover:underline w-full text-left"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
              {item.action && (
                <button
                  onClick={() => scrollPage(refMap[item.id])}
                  className="text-blue-600 hover:underline text-sm font-medium"
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
              className={`flex items-center py-2 px-6 ${
                location.pathname === item.path ||
                (location.pathname === "/profile" &&
                  activeInternalTab &&
                  item.path === "/profile")
                  ? "text-orange-global font-semibold"
                  : "text-gray-800"
              }`}
            >
              <Link
                to={item.path}
                className="flex items-center space-x-2 hover:underline"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="px-6 mt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 text-red-600 hover:underline py-2"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;