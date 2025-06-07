import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const pageRoutes = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "Features", to: "/features" },
];

const Navbar = ({ isActive }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if authToken exists in localStorage
  const authToken = localStorage.getItem("authToken");
  const isAuthenticated = !!authToken; // Convert to boolean: true if authToken exists, false otherwise

  return (
    <header className="flex justify-between items-center mb-12 py-4 relative">
      <div className="text-2xl font-bold text-orange-global">OPMIZE</div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex text-gray-700 font-medium text-lg items-center gap-10">
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

        <div className="space-x-5">
          {isAuthenticated ? (
            <Link to="/dashboard" className="px-4 py-2 bg-orange-global text-white rounded-md">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-orange-global text-white rounded-md">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-orange-global text-white rounded-md">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hamburger Icon */}
      <div className="md:hidden text-2xl text-orange-global cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 z-10 md:hidden">
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
          <div className="flex flex-col gap-3 mt-4 w-full">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="w-full px-4 py-2 bg-orange-global text-white rounded-md"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-4 py-2 bg-orange-global text-white rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-4 py-2 bg-orange-global text-white rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;