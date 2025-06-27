import { FaCircleCheck, FaWhatsapp } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";

const ButtonsBar = () => {
  return (
    <div className="bg-jobcard p-4 md:p-6 rounded-md mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <button className="bg-apply text-light-cream px-4 py-1 font-[700] text-md rounded-[4px] flex items-center justify-center gap-2 hover:bg-[#306142] whitespace-nowrap w-full sm:w-auto">
        <FaCircleCheck className="text-sm sm:text-md" />
        <span>APPLY HERE</span>
      </button>

      <button className="border border-black text-black px-4 py-1 font-[400] text-md rounded-[4px] flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
        <IoCallOutline className="text-lg" />
        <span>Call Recruiter</span>
      </button>

      <button className="border border-black text-black px-4 py-1 font-[400] text-md rounded-[4px] flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
        <FaWhatsapp className="text-lg" />
        <span>Whatsapp</span>
      </button>

      <button className="bg-white px-4 py-1 font-[400] text-md rounded-[4px] flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
        <span>Browse All Jobs</span>
      </button>
    </div>
  );
};

export default ButtonsBar;
