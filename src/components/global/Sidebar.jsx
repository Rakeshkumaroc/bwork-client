import {
  LayoutDashboard,
  Building,
  Users,
  Briefcase,
  UserCheck,
  Palette,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import NavItem from "../common/NavItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
    icon: <Palette size={20} />,
    label: "Manage Theme",
    path: "./manage-theme",
    roles: ["admin"], // Admin only
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
  const [userRole, setUserRole] = useState(null);
  const [filteredNavItems, setFilteredNavItems] = useState([]);

  // Fetch user role from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authToken")); // Adjust key as per your storage
    const role = userData?.role   // Default to jobProvider if no role
    setUserRole(role);
    console.log('role',role);

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
      className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-cream flex flex-col overflow-y-auto justify-between py-6 px-4 shadow-[3px_3px_20.5px_2px_#FF6F2080] md:rounded-3xl rounded-r-3xl transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 h-full`}
    >
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-orange-global">BWork</h1>
          <p className="text-xs text-gray-500 -mt-1">Business made easy</p>
        </div>

        <nav className="space-y-4">
          {filteredNavItems.map((item, index) => (
            <div key={index}>
              {item.path ? (
                <Link to={item.path} onClick={toggleSidebar}>
                  <NavItem
                    icon={item.icon}
                    label={item.label}
                    active={isActive(item.path)}
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
                          <ChevronDown size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )
                      }
                    />
                  </div>
                  {item.children && openSections[item.label] && (
                    <div className="ml-8 space-y-2">
                      {item.children.map((child, i) => (
                        <Link key={i} to={child.path} onClick={toggleSidebar}>
                          <NavItem
                            icon={
                              <div className="w-2 h-2 bg-orange-global rounded-full" />
                            }
                            label={child.label}
                            active={isActive(child.path)}
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

      <div className="pt-6 border-t border-orange-100">
        <button onClick={handleLogout}>
          <NavItem icon={<LogOut size={20} />} label="Logout" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
