import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaArrowRight,
} from "react-icons/fa";
import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#010713] text-bgYellow px-4 lg:px-16 py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Product */}
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-5 text-sm text-white">
            <li>Employee database</li>
            <li>Payroll</li>
            <li>Absences</li>
            <li>Time tracking</li>
            <li>Shift planner</li>
            <li>Recruiting</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-semibold mb-4">Information</h3>
          <ul className="space-y-5 text-sm text-white">
            <li>FAQ</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-5 text-sm text-white">
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-[#1A1A1A] p-16 rounded-md text-white">
            <h3 className="text-bgYellow font-semibold mb-4">Contact Us</h3>
            <div className="flex items-center w-full bg-white rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Enter Mobile No. / Email address"
                className="px-3 py-2 w-full text-black text-sm outline-none"
              />
              <button className="bg-bgtext-bgYellow text-white px-4 py-2 hover:bg-yellow-500">
                <FaArrowRight />
              </button>
            </div>
            <p className="text-sm text-gray-300 mt-4">
              Hello, we are B Work. Our goal is to translate the positive effects
              from revolutionary tech experience merger with their clients & their team.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t-[0.5px] max-w-7xl mx-auto border-white/20  mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
           <img src={Logo} alt="bwork logo" className="md:w-[60px] w-[50px]" />
        </div>
        <div className="flex space-x-16">
          <a href="#" className="hover:text-bgYellow">Terms</a>
          <a href="#" className="hover:text-bgYellow">Privacy</a>
          <a href="#" className="hover:text-bgYellow">Cookies</a>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#"><FaLinkedinIn className="border border-bgYellow rounded-full text-3xl p-2"/></a>
          <a href="#"><FaFacebookF className="border border-bgYellow rounded-full text-3xl p-2"/></a>
          <a href="#"><FaTwitter className="border border-bgYellow rounded-full text-3xl p-2"/></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
