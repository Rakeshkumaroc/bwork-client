import { FaCircleCheck } from "react-icons/fa6";
import {
  FaBuilding,
  FaUserTie,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaEye,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const JobListingCard = ({
  title = "Food Delivery Boy",
  company = "Nels Foods",
  category = "Delivery Boy",
  location = "Delhi",
  postedOn = "25 June 2025",
  daysAgo = 60,
  salary = "Rs. 30,000–Rs. 40,000",
  description = "Nel's Food is looking for reliable and energetic delivery executives to join our team as a Delivery Boy.",
}) => {
  return (
    <div className="bg-jobcard p-4 md:p-6 rounded-md border border-cream w-full max-w-full">
      {/* Header Section - Responsive flex layout */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <h3 className="text-lg md:text-xl font-bold text-black flex-1 min-w-0">
          {title}
        </h3>

        {/* Action buttons - Stack on mobile, inline on larger screens */}
        <div className="md:flex hidden items-center justify-end sm:justify-between gap-3 sm:gap-4 flex-shrink-0">
          <Link to={"/job-details"}>
            <FaEye className="cursor-pointer hover:text-apply text-lg sm:text-base" />
          </Link>
          <FaHeart className="cursor-pointer hover:text-apply text-lg sm:text-base" />
          <button className="bg-apply text-light-cream px-3 py-2 sm:px-4 sm:py-1 font-[700] text-sm rounded-[8px] flex items-center gap-2 hover:bg-[#306142] whitespace-nowrap">
            <FaCircleCheck className="text-xs sm:text-sm" />
            <span className="">APPLY HERE</span>
          </button>
        </div>
      </div>

      {/* Job Details Section - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-3 text-sm text-gray-800 mb-6">
        <p className="flex items-center gap-2">
          <FaBuilding className="flex-shrink-0" />
          <span className="font-[500]">Company:</span>
          <span className="truncate">{company}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaUserTie className="flex-shrink-0" />
          <span className="font-[500]">Category:</span>
          <span className="truncate">{category}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="flex-shrink-0" />
          <span className="font-[500]">Location:</span>
          <span className="truncate">{location}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="flex-shrink-0" />
          <span className="font-[500]">Posted On:</span>
          <span className="truncate">
            {postedOn} ({daysAgo} Days Ago)
          </span>
        </p>
        <p className="flex items-center gap-2 sm:col-span-2 lg:col-span-1 xl:col-span-2">
          <FaMoneyBillWave className="flex-shrink-0" />
          <span className="font-[500]">Salary Range:</span>
          <span className="truncate">{salary}</span>
        </p>
      </div>

      {/* Description Section */}
      <div className="mt-4 sm:mt-6">
        <p className="text-sm font-[500] text-black leading-relaxed">
          <span className="font-bold">Job Description: </span>
          {description}
        </p>
      </div>
      <div className="flex md:hidden items-center justify-end sm:justify-between mt-5 gap-5 sm:gap-4 flex-shrink-0">
        <Link to={"/job-details"}>
          <FaEye className="cursor-pointer hover:text-apply text-lg sm:text-base" />
        </Link>
        <FaHeart className="cursor-pointer hover:text-apply text-lg sm:text-base" />
        <button className="bg-apply text-light-cream px-3 py-2 sm:px-4 sm:py-1 font-[700] text-sm rounded-[8px] flex items-center gap-2 hover:bg-[#306142] whitespace-nowrap">
          <FaCircleCheck className="text-xs sm:text-sm" />
          <span className="hidden xs:inline">APPLY HERE</span>
          <span className="xs:hidden">APPLY</span>
        </button>
      </div>
    </div>
  );
};

export default JobListingCard;
