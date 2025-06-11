import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const pageRoutes = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "Features", to: "/features" },
];

const Navbar = ({ isActive }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close both dropdown and mobile menu
  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="flex justify-between items-center mb-12 py-4 relative">
      <div className="text-2xl font-bold text-orange-global">BWork</div>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex text-gray-700 font-medium lg:text-lg items-center gap-10">
        {pageRoutes.map(({ name, to }, index) => (
          <Link
            to={to}
            key={index}
            className={`${
              isActive === name ? "text-orange-global" : "hover:text-orange-global"
            } transition-colors duration-300`}
          >
            {name}
          </Link>
        ))}

        <div className="space-x-5 flex items-center">
          <Link
            to="/login"
            className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300"
          >
            Register
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-800 hover:text-gray-600 transition-colors duration-300 focus:outline-none"
            >
              For employers
              <span className="ml-1">
                {dropdownOpen ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                )}
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-md rounded-md z-20">
                <Link
                  to="/employers-signup"
                  onClick={closeAll}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-global transition-colors duration-300"
                >
                  New account
                </Link>
                <Link
                  to="/employers-login"
                  onClick={closeAll}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-global transition-colors duration-300"
                >
                  Existing account
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hamburger Icon */}
      <div
        className="lg:hidden text-2xl text-orange-global cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col  items-center justify-center text-center px-6 py-4 z-10 lg:hidden">
          {pageRoutes.map(({ name, to }, index) => (
            <Link
              to={to}
              key={index}
              onClick={() => setMenuOpen(false)}
              className={`py-2 w-full ${
                isActive === name ? "text-orange-global font-semibold" : "text-gray-700"
              } hover:text-orange-global transition-colors duration-300`}
            >
              {name}
            </Link>
          ))}
          <div className="flex flex-col   gap-3 mt-4 md:w-fit w-full">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full px-4 py-2 bg-orange-global text-white rounded-full hover:bg-orange-600 transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full px-4 py-2 bg-orange-global text-white rounded-full hover:bg-orange-600 transition-colors duration-300"
            >
              Register
            </Link>
            <div className="relative ">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-center  py-2 text-gray-800 hover:text-gray-600 transition-colors duration-300 w-full text-center"
              >
                For employers
                <span className="ml-2">
                  {dropdownOpen ? (
                    <FaChevronUp className="text-sm" />
                  ) : (
                    <FaChevronDown className="text-sm" />
                  )}
                </span>
              </button>
              {dropdownOpen && (
                <div className="flex flex-col w-full bg-white pl-4">
                  <Link
                    to="/employers-signup"
                    onClick={closeAll}
                    className="py-2 text-gray-700 hover:text-orange-global transition-colors duration-300"
                  >
                    New account
                  </Link>
                  <Link
                    to="/employers-login"
                    onClick={closeAll}
                    className="py-2 text-gray-700 hover:text-orange-global transition-colors duration-300"
                  >
                    Existing account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;