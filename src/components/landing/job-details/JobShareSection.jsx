import {
  FaWhatsapp,
  FaEnvelope,
  FaCommentDots,
  FaPrint,
  FaExclamationCircle,
} from "react-icons/fa";
import { useState } from "react";

const JobShareSection = () => {
  const [copied, setCopied] = useState(false);
  const jobUrl = "https://www.just.jobs/browse/delivery-boys-488/";

  const handleCopy = () => {
    navigator.clipboard.writeText(jobUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-jobcard py-4 md:py-6 rounded-md text-black space-y-4">
      {/* Header */}
      <h3 className="font-bold px-4 md:px-6 text-lg md:text-xl">Share This Job</h3>

      {/* Share Row */}
      <div className="flex px-4 md:px-6 flex-col sm:flex-row sm:items-center gap-10  ">
        <button className="border border-green-600 text-green-700 text-sm px-4 py-1 rounded-full flex items-center gap-2 hover:bg-green-50 w-fit">
          <FaWhatsapp />
          Whatsapp
        </button>

        <div className=" gap-5 flex items-center justify-between bg-white border rounded-full px-4 py-2 text-sm overflow-x-auto whitespace-nowrap">
          <span className="text-ellipsis overflow-hidden">{jobUrl}</span>
          <button
            onClick={handleCopy}
            className="text-blue-600 font-medium ml-4 hover:underline shrink-0"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* Share by options */}
      <div className="flex flex-col my-12 px-4 md:px-6  gap-4 text-sm  ">
        <p className="flex items-center gap-2 cursor-pointer">
          <FaEnvelope className="text-md" /> Share by E-mail
        </p>
        <p className="flex items-center gap-2 cursor-pointer">
          <FaCommentDots className="text-md" /> Share by SMS
        </p>
      </div>

      {/* Other Options */}
      <div className="space-y-2 ">
        <h3 className="text-lg md:text-xl  pb-4 px-4 md:px-6 font-bold border-b-2 border-yellow-100">
          Other Options
        </h3>
        <div className="flex flex-col px-4 pt-4 md:px-6 sm:flex-row gap-16 text-sm">
          <p className="flex items-center gap-2 cursor-pointer">
            <FaPrint className="text-md" /> Print This Job
          </p>
          <p className="flex items-center gap-2 cursor-pointer">
            <FaExclamationCircle className="text-md" /> Report This Job
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobShareSection;
