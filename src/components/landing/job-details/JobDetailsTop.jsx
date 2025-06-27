import { FaCircleCheck } from "react-icons/fa6";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWhatsapp,
  FaRegHeart,
} from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";

const JobDetailsTop = ({
  title = "Delivery Boys",
  company = "Bloom Solutions",
  location = "Bangalore, India",
  postedOn = "17 June 2025",
}) => {
  return (
    <div className="bg-jobcard p-4 md:p-6 rounded-md border border-cream w-full max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <h3 className="text-lg md:text-xl font-bold text-black flex-1 min-w-0">
          {title}
        </h3>
      </div>

      {/* Job Info */}
      <div className="space-y-2 text-sm text-gray-800">
        <p className="flex items-center gap-2">
          <FaBuilding /> {company}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt />
          {location}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt />
          <span>Posted On:</span> {postedOn}
        </p>
      </div>

      {/* Buttons (Responsive) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start sm:justify-between mt-5 gap-3 sm:gap-4">
        <button className="bg-apply text-light-cream px-4 py-1 font-[700] text-md rounded-[4px] flex items-center justify-center gap-2 hover:bg-[#306142] w-full sm:w-auto">
          <FaCircleCheck className="text-sm sm:text-md" />
          <span>APPLY HERE</span>
        </button>
        <button className="border border-black text-black px-4 py-1 font-[400] text-md rounded-[4px] flex items-center justify-center gap-2 w-full sm:w-auto">
          <IoCallOutline className="text-lg" />
          <span>Call Recruiter</span>
        </button>
        <button className="border border-black text-black px-4 py-1 font-[400] text-md rounded-[4px] flex items-center justify-center gap-2 w-full sm:w-auto">
          <FaWhatsapp className="text-lg" />
          <span>Whatsapp</span>
        </button>
        <button className="border border-black text-black px-4 py-1 font-[400] text-md rounded-[4px] flex items-center justify-center gap-2 w-full sm:w-auto">
          <FaRegHeart className="text-lg" />
          <span>Favorite</span>
        </button>
      </div>
    </div>
  );
};

export default JobDetailsTop;
