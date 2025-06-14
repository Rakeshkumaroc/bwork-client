import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa"; 
import Logo from "../../assets/logo.png";
import { fetchData } from "../../utils/api";

const baseUrl = import.meta.env.VITE_APP_URL;

const Navbar = ({ isActive }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // 'hire' | 'jobs' | null
  const [profileData, setProfileData] = useState({
    userName: "Job Seeker",
    jobTitle: "Not provided",
    userProfilePic:
      "https://www.shareicon.net/data/128x128/2016/09/15/829466_man_512x512.png",
  }); 
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLoggedIn = userData && userData._id;

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchProfileData = async () => {
      try {
        const { _id } = userData;
        await fetchData(
          `${baseUrl}/job-seekers-basic-details/get-job-seeker-basic-by-id/${_id}`,
          (data) => {
            const resData = Array.isArray(data) ? data[0] : data;
            if (resData) {
              setProfileData({
                userName: resData.userName || "Job Seeker",
                jobTitle: resData.jobTitle || "Not provided",
                userProfilePic:
                  resData.userProfilePic ||
                  "https://www.shareicon.net/data/128x128/2016/09/15/829466_man_512x512.png",
              });
            }
          },
      
          setError
        );

        if (error) {
          throw new Error(error);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        
      }
    };

    fetchProfileData();
  }, [isLoggedIn, error]);

  const toggleDropdown = (type) => {
    setDropdownOpen(dropdownOpen === type ? null : type);
  };

  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center md:px-[50px] px-4 py-3 bg-black text-white relative z-50">
      <img src={Logo} alt="bwork logo" className="md:w-[70px] w-[50px]" />

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-6">
        <Link
          to="/"
          className={`text-sm ${
            isActive === "Home"
              ? "text-yellow-400 font-semibold"
              : "hover:text-yellow-400"
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`text-sm ${
            isActive === "About Us"
              ? "text-yellow-400 font-semibold"
              : "hover:text-yellow-400"
          }`}
        >
          About Us
        </Link>
        <Link
          to="/help"
          className={`text-sm ${
            isActive === "Help"
              ? "text-yellow-400 font-semibold"
              : "hover:text-yellow-400"
          }`}
        >
          Help
        </Link>

        {/* Hire Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("hire")}
            className="flex items-center px-3 py-1.5 bg-yellow-400 text-black rounded-md font-semibold text-sm hover:bg-yellow-500"
          >
            <FaBuilding className="mr-2" />
            Hire
            {dropdownOpen === "hire" ? (
              <FaChevronUp className="ml-1 text-xs" />
            ) : (
              <FaChevronDown className="ml-1 text-xs" />
            )}
          </button>
          {dropdownOpen === "hire" && (
            <div className="absolute top-full mt-2 w-44 bg-white text-black shadow-md rounded-md z-20">
              <Link
                to="/employers-signup"
                onClick={closeAll}
                className="block px-4 py-2 hover:bg-yellow-100 text-sm"
              >
                New account
              </Link>
              <Link
                to="/employers-login"
                onClick={closeAll}
                className="block px-4 py-2 hover:bg-yellow-100 text-sm"
              >
                Existing account
              </Link>
            </div>
          )}
        </div>

        {/* Jobs/User Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("jobs")}
            className="flex items-center px-4 py-2 bg-yellow-400 text-black rounded-md font-semibold text-sm hover:bg-yellow-500"
          >
            <FaBriefcase className="mr-2" />
            {isLoggedIn ? `Hi ${profileData.userName}` : "Look for Jobs"}
            {dropdownOpen === "jobs" ? (
              <FaChevronUp className="ml-2 text-xs" />
            ) : (
              <FaChevronDown className="ml-2 text-xs" />
            )}
          </button>
          {dropdownOpen === "jobs" && (
            <div className="absolute top-full mt-2 right-0 w-56 bg-white text-black shadow-md rounded-md z-20">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center px-4 py-3 border-b">
                    <img
                      src={profileData.userProfilePic}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-semibold">{`Hi ${profileData.userName}`}</div>
                      <div className="text-sm text-gray-500">{profileData.jobTitle}</div>
                    </div>
                  </div>
                  <Link to="/profile" onClick={closeAll} className="block px-4 py-2 hover:bg-yellow-100 text-sm">Profile</Link>
                  <Link to="/profile/search-history" onClick={closeAll} className="block px-4 py-2 hover:bg-yellow-100 text-sm">Search History</Link>
                  <Link to="/profile/my-jobs" onClick={closeAll} className="block px-4 py-2 hover:bg-yellow-100 text-sm">My Jobs</Link>
                  <Link to="/profile/my-reviews" onClick={closeAll} className="block px-4 py-2 hover:bg-yellow-100 text-sm">My Reviews</Link>
                  <Link to="/profile/settings" onClick={closeAll} className="block px-4 py-2 hover:bg-yellow-100 text-sm">Settings</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-yellow-100 text-sm">Log out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeAll} className="block px-4 py-2 hover:bg-yellow-100 text-sm">Job Seeker Login</Link>
                  <Link to="/signup" onClick={closeAll} className="block px-4 py-2 hover:bg-yellow-100 text-sm">Job Seeker Register</Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Toggle */}
      <div
        className="lg:hidden text-yellow-400 text-xl cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-start px-4 py-4 gap-3 z-40 lg:hidden">
          <Link to="/" onClick={closeAll} className="text-sm hover:text-yellow-400">Home</Link>
          <Link to="/about" onClick={closeAll} className="text-sm hover:text-yellow-400">About Us</Link>
          <Link to="/help" onClick={closeAll} className="text-sm hover:text-yellow-400">Help</Link>

          {/* Hire - Mobile */}
          <div className="w-full">
            <button
              onClick={() => toggleDropdown("hire")}
              className="flex items-center w-full text-sm mt-2 hover:text-yellow-400"
            >
              <FaBuilding className="mr-2" />
              Hire
              {dropdownOpen === "hire" ? (
                <FaChevronUp className="ml-1 text-xs" />
              ) : (
                <FaChevronDown className="ml-1 text-xs" />
              )}
            </button>
            {dropdownOpen === "hire" && (
              <div className="flex flex-col mt-2 text-sm pl-4">
                <Link to="/employers-signup" onClick={closeAll} className="py-1 hover:text-yellow-400">New account</Link>
                <Link to="/employers-login" onClick={closeAll} className="py-1 hover:text-yellow-400">Existing account</Link>
              </div>
            )}
          </div>

          {/* Jobs - Mobile */}
          <div className="w-full">
            <button
              onClick={() => toggleDropdown("jobs")}
              className="flex items-center w-full text-sm mt-2 hover:text-yellow-400"
            >
              <FaBriefcase className="mr-2" />
              {isLoggedIn ? `Hi ${profileData.userName}` : "Look for Jobs"}
              {dropdownOpen === "jobs" ? (
                <FaChevronUp className="ml-1 text-xs" />
              ) : (
                <FaChevronDown className="ml-1 text-xs" />
              )}
            </button>
            {dropdownOpen === "jobs" && (
              <div className="flex flex-col mt-2 text-sm pl-4">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center px-4 py-3 border-b">
                      <img
                        src={profileData.userProfilePic}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="font-semibold">{`Hi ${profileData.userName}`}</div>
                        <div className="text-sm text-gray-500">{profileData.jobTitle}</div>
                      </div>
                    </div>
                    <Link to="/profile" onClick={closeAll} className="py-1 hover:text-yellow-400">Profile</Link>
                    <Link to="/profile/search-history" onClick={closeAll} className="py-1 hover:text-yellow-400">Search History</Link>
                    <Link to="/profile/my-jobs" onClick={closeAll} className="py-1 hover:text-yellow-400">My Jobs</Link>
                    <Link to="/profile/my-reviews" onClick={closeAll} className="py-1 hover:text-yellow-400">My Reviews</Link>
                    <Link to="/profile/settings" onClick={closeAll} className="py-1 hover:text-yellow-400">Settings</Link>
                    <button onClick={handleLogout} className="text-left py-1 text-red-400 hover:text-yellow-400">Log out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={closeAll} className="py-1 hover:text-yellow-400">Job Seeker Login</Link>
                    <Link to="/signup" onClick={closeAll} className="py-1 hover:text-yellow-400">Job Seeker Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;