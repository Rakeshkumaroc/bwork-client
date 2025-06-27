import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const JobPosterInfo = () => {
  return (
    <div className="bg-jobcard rounded-md text-black w-full max-w-full">
      {/* Company Name */}
      <h3 className="text-lg md:text-xl px-4 py-3 md:p-6 font-bold border-b-2 border-yellow-100">
        Bloom Solutions
      </h3>

      {/* Details Grid - Vertical on mobile, grid on larger */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 text-sm px-4 py-4 md:p-6">
        <div className="flex items-start gap-2">
          <FaUser className="text-md mt-0.5" />
          <span>Rakesh</span>
        </div>

        <div className="flex items-start gap-2">
          <FaCalendarAlt className="text-md mt-1" />
          <div>
            <p>Posted On 17 June, 2025</p>
            <p className="text-xs text-gray-800">(322 Days Left to End)</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <FaPhone className="text-md mt-0.5" />
          <span>+91 9316695997</span>
        </div>

        <div className="flex items-start gap-2">
          <FaEnvelope className="text-md mt-0.5" />
          <span>rakesh0212@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default JobPosterInfo;
