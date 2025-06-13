import { Bell, UserCircle, Menu } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const Topbar = () => {
  const { toggleSidebar } = useOutletContext();

  return (
    <div className="w-full flex items-center justify-between bg-cream rounded-full px-6 py-3 shadow-[3px_3px_20.5px_2px_#FF6F2080]   mb-6">
      {/* Hamburger Menu (Mobile Only) */}
      <button
        className="lg:hidden mr-4"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} className="text-yellow-400" />
      </button>

      {/* Search Input */}
      <div className="flex items-center space-x-2 flex-1">
        <span className="text-gray-500">
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
          className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4 ml-4">
        <button className="w-8 h-8 flex items-center justify-center border border-orange-300 rounded-full hover:bg-orange-100 transition">
          <Bell size={16} className="text-yellow-400" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center border border-orange-300 rounded-full hover:bg-orange-100 transition">
          <UserCircle size={16} className="text-yellow-400" />
        </button>

        {/* Profile Picture */}
        <img
          src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          alt="User Avatar"
          className="w-9 h-9 rounded-full object-cover border-2 border-orange-300"
        />
      </div>
    </div>
  );
};

export default Topbar;