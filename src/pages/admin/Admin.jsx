import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/global/Sidebar';
import { useState } from 'react';

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-light-cream flex w-full  h-screen lg:px-5 lg:py-3 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs bg-opacity-50 z-40 lg:hidden"
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