import { Outlet } from "react-router-dom";
import Sidebar from "../../components/global/Sidebar";
import { useEffect, useState } from "react"; // Added useState
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Check for authToken
    const localData = localStorage.getItem("authToken");
    if (!localData) {
      toast.error("You are not logged in. Please log in to continue.");
      navigate("/employers-login");
      return;
    }
  }, [navigate]);
 return (
  <div className="bg-gray-100 flex w-full h-screen lg:px-4 lg:py-2 overflow-x-hidden">
    {/* Sidebar */}
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

    {/* Overlay for mobile when sidebar is open */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 z-40 lg:hidden"
        onClick={toggleSidebar}
      ></div>
    )}

    {/* Main Content */}
    <div className="flex-1 flex flex-col h-full overflow-auto">
      <Outlet context={{ toggleSidebar }} />
    </div>
  </div>
);
};

export default Admin;
