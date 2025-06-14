import { Bell, UserCircle, Menu } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const Topbar = () => {
  const { toggleSidebar } = useOutletContext();

  return (
  <div className="w-full max-w-7xl mx-auto flex items-center justify-between bg-white rounded-md shadow-md p-4 sm:p-5 mb-6">
    {/* Hamburger Menu (Mobile Only) */}
    <button
      className="lg:hidden mr-3"
      onClick={toggleSidebar}
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
    >
      <Menu size={20} className="text-gray-700 hover:text-yellow-400 transition" />
    </button>

    {/* Search Input */}
    <div className="flex items-center gap-2 flex-1">
      <span className="text-gray-600">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search anything..."
        className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 placeholder-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
      />
    </div>

    {/* Icons */}
    <div className="flex items-center gap-3 ml-3">
      <button
        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
        title="Notifications"
      >
        <Bell size={20} className="text-gray-700 hover:text-yellow-400 transition" />
      </button>
      <button
        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
        title="Profile"
      >
        <UserCircle size={20} className="text-gray-700 hover:text-yellow-400 transition" />
      </button>

      {/* Profile Picture */}
      <img
        src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
        alt="User Avatar"
        className="w-8 h-8 rounded-full object-cover border border-gray-300"
        title="User Profile"
      />
    </div>
  </div>
);
};

export default Topbar;