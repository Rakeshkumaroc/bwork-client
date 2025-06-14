import {
  LayoutDashboard,
  Building,
  Users,
  Briefcase,
  UserCheck, 
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import NavItem from "../common/NavItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";

const navItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    path: "/dashboard",
    roles: ["admin", "jobProvider"], // Accessible to both roles
  },
  {
    icon: <Building size={20} />,
    label: "Manage Branches",
    children: [
      { label: "Branch List", path: "./manage-branch/list" },
      { label: "Add Branch", path: "./manage-branch/add" },
    ],
    roles: ["admin", "jobProvider"], // Admin only
  },
  {
    icon: <Users size={20} />,
    label: "Manage Internal Users",
    children: [
      { label: "User List", path: "./branch-user/list" },
      { label: "Add User", path: "./branch-user/add" },
    ],
    roles: ["admin", "jobProvider"], // Admin only
  },
  {
    icon: <UserPlus size={20} />,
    label: "Manage Job Providers",
    children: [{ label: "Provider List", path: "./manage-job-providers/list" }],
    roles: ["admin"], // Admin only
  },
  {
    icon: <UserPlus size={20} />,
    label: "Manage Job Seekers",
    children: [{ label: "Seeker List", path: "./manage-job-seekers/list" }],
    roles: ["admin"], // Admin only
  },
  {
    icon: <Briefcase size={20} />,
    label: "Manage Jobs",
    children: [
      { label: "Job List", path: "./manage-job/list" },
      { label: "Create Job", path: "./manage-job/add" },
    ],
    roles: ["admin", "jobProvider"], // Accessible to both roles
  },
  {
    icon: <UserCheck size={20} />,
    label: "Manage Job Applications",
    children: [{ label: "Application List", path: "./manage-applicants/list" }],
    roles: ["admin", "jobProvider"], // Accessible to both roles
  }, 
  {
    icon: <Settings size={20} />,
    label: "Settings",
    path: "./settings",
    roles: ["admin", "jobProvider"], // Admin only
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSections, setOpenSections] = useState({}); 
  const [filteredNavItems, setFilteredNavItems] = useState([]);

  // Fetch user role from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authToken")); // Adjust key as per your storage
    const role = userData?.role   // Default to jobProvider if no role
 

    // Filter navItems based on user role
    const filteredItems = navItems.filter((item) => item.roles.includes(role));
    setFilteredNavItems(filteredItems);
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setOpenSections({});
    navigate("/employers-login");
    toggleSidebar();
  };

 return (
  <div
    className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white flex flex-col overflow-y-auto justify-between p-4 sm:p-6 shadow-md rounded-r-3xl transition-transform duration-300 transform ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0 h-full`}
  >
    <div>
      <div className="mb-6">
  
          <img src={Logo} alt="bwork logo" className="md:w-[70px] w-[50px]" />
        <p className="text-sm text-gray-700 mt-1">Business made easy</p>

      </div>

      <nav className="space-y-2">
        {filteredNavItems.map((item, index) => (
          <div key={index}>
            {item.path ? (
              <Link to={item.path} onClick={toggleSidebar}>
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  active={isActive(item.path)}
                  className="text-gray-700 hover:bg-gray-100 hover:text-yellow-400"
                />
              </Link>
            ) : (
              <>
                <div
                  className="cursor-pointer"
                  onClick={() => toggleSection(item.label)}
                >
                  <NavItem
                    icon={item.icon}
                    label={item.label}
                    rightIcon={
                      openSections[item.label] ? (
                        <ChevronDown size={20} className="text-gray-700" />
                      ) : (
                        <ChevronRight size={20} className="text-gray-700" />
                      )
                    }
                    className="text-gray-700 hover:bg-gray-100 hover:text-yellow-400"
                  />
                </div>
                {item.children && openSections[item.label] && (
                  <div className="ml-8 space-y-1">
                    {item.children.map((child, i) => (
                      <Link key={i} to={child.path} onClick={toggleSidebar}>
                        <NavItem
                          icon={
                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          }
                          label={child.label}
                          active={isActive(child.path)}
                          className="text-gray-700 hover:bg-gray-100 hover:text-yellow-400"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>

    <div className="pt-4 border-t border-gray-200">
      <button onClick={handleLogout}>
        <NavItem
          icon={<LogOut size={20} className="text-gray-700" />}
          label="Logout"
          className="text-gray-700 hover:bg-gray-100 hover:text-yellow-400"
        />
      </button>
    </div>
  </div>
);
};

export default Sidebar;
