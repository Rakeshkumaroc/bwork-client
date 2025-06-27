import {
  FaTruck,
  FaClock,
  FaUsers,
  FaMoneyBill,
  FaVenusMars,
  FaLanguage,
  FaSun,
  FaPhone,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

const JobDetailsCard = () => {
  return (
    <div className="bg-jobcard  rounded-md border border-cream w-full max-w-full">
      {/* Job Details */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 pb-3  border-b-2 border-yellow-100 p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-black flex-1 min-w-0">
            Job Details
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm p-4 md:p-6">
          <div className="flex items-start gap-2 flex-col">
            <span>Category:</span>
            <span className="flex items-center gap-1">
              <FaTruck /> Delivery
            </span>
          </div>
          <div className="flex items-start gap-2 flex-col">
            <span>Job Type:</span>
            <span className="flex items-center gap-1">
              <FaClock /> Full Time
            </span>
          </div>
          <div className="flex items-start gap-2 flex-col">
            <span>No. Of Vacancy:</span>
            <span className="flex items-center gap-1">
              <FaUsers /> 5
            </span>
          </div>
          <div className="flex items-start gap-2 flex-col">
            <span>Salary Range:</span>
            <span className="flex items-center gap-1">
              <FaMoneyBill /> Rs. 20,000 - Rs. 30,000
            </span>
          </div>
          <div className="flex items-start gap-2 flex-col">
            <span>Gender:</span>
            <span className="flex items-center gap-1">
              <FaVenusMars /> Any
            </span>
          </div>
          <div className="flex items-start gap-2 flex-col">
            <span>Experience:</span>
            <span className="flex items-center gap-1">
              <MdWork /> Doesn’t Matter
            </span>
          </div>
          <div className="flex items-start gap-2 flex-col">
            <span>Language:</span>
            <span className="flex items-center gap-1">
              <FaLanguage /> Hindi, English
            </span>
          </div>
          <div className="flex items-start gap-2 flex-col">
            <span>Timings:</span>
            <span className="flex items-center gap-1">
              <FaSun /> Day Shift
            </span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-bold mb-2 border-b-2 border-yellow-100 pb-5 pt-4">
          Job Description
        </h2>
        <p className="text-sm">
          We are Hiring for Delivery Boys in Bangalore Location
        </p>
      </div>

      {/* Benefits */}
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-bold mb-4 border-b-2 border-yellow-100 pb-5   pt-4">
          Benefits for the Employee
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <FaPhone /> <span>Verified Mobile Number</span>
          </div>
          <div className="flex items-center gap-2">
            <FaChartLine /> <span>Good Growth</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt /> <span>Weekly 2 Leaves</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock /> <span>7 Hours Work a Day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsCard;
