import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const ProfileHeader = () => {
  return (
    <div className="bg-cream rounded-xl shadow p-6 flex items-center gap-6">
      {/* Profile Image with Progress */}
      <div className="relative w-24 h-24">
        <img
          src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" // Replace with your actual image URL
          alt="Profile"
          className="rounded-full w-full h-full object-cover border-4 border-green-500"
        />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-1 text-xs text-green-600 border border-green-600 rounded-full">
          100%
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Rakesh Kumar</h2>
            <p className="text-sm text-gray-600">MERN Full Stack Developer</p>
            <p className="text-sm text-gray-400">at Orange Cap Media, Pune</p>
          </div>
          <p className="text-sm text-gray-400">Profile last updated – <span className="text-blue-600">Yesterday</span></p>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <span>Pune, INDIA</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <span>1 Year 7 Months</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBill className="text-gray-500" />
            <span>₹ 0</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-gray-500" />
            <span>7091506903</span>
            <MdVerified className="text-green-600" />
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            <span>rakeshkumar748844@gmail.com</span>
            <MdVerified className="text-green-600" />
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <span>2 Months notice period</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
