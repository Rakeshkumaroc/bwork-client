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
      {/* Header Section - Responsive flex layout */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <h3 className="text-lg md:text-xl font-bold text-black flex-1 min-w-0">
          {title}
        </h3>
      </div>

      {/* Job Details Section - Responsive grid */}
      <div className="space-y-2 text-sm text-gray-800">
        <p className="flex items-center gap-2">
          <FaBuilding /> {company}
        </p>

        <p className="flex items-center gap-2">
          <FaMapMarkerAlt />
          {location}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt /> <span className="">Posted On:</span> {postedOn}
        </p>
      </div>

      {/* Description Section */}

      <div className="flex   items-center justify-end sm:justify-between mt-5 gap-5 sm:gap-4 flex-shrink-0">
        <button className="bg-apply text-light-cream px-3 py-2 sm:px-6 sm:py-1 font-[700] text-md rounded-[4px] flex items-center gap-2 hover:bg-[#306142] whitespace-nowrap">
          <FaCircleCheck className="text-xs sm:text-md" />
          <span className="">APPLY HERE</span>
        </button>
        <button className=" border border-black text-black px-3 py-1 sm:px-6 sm:py-1 font-[400] text-md rounded-[4px] flex items-center gap-2   whitespace-nowrap">
          <IoCallOutline className="text-lg" />
          <span className="">Call Recruiter</span>
        </button>
        <button className=" border border-black text-black px-3 py-1 sm:px-6 sm:py-1 font-[400] text-md rounded-[4px] flex items-center gap-2   whitespace-nowrap">
          <FaWhatsapp className="text-lg" />
          <span className="">Whatsapp</span>
        </button>
        <button className=" border border-black text-black px-3 py-1 sm:px-6 sm:py-1 font-[400] text-md rounded-[4px] flex items-center gap-2   whitespace-nowrap">
          <FaRegHeart className="text-lg" />
          <span className="">Favorite</span>
        </button>
        
      </div>
    </div>
  );
};

export default JobDetailsTop; 