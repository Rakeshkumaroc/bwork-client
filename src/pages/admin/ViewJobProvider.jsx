import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useEffect } from "react";
const baseUrl = import.meta.env.VITE_APP_URL;

// Dummy data mimicking the API response structure
const dummyProviderData = {
  _id: "6846a4dab0168356feca16ef",
  email: "rakeshkumar74855844@gmail.com",
  phone: "7091506905",
  role: "jobProvider",
  providerName: "Job Provider 1",
  website: "https://example.com",
};

const ViewJobProvider = () => {
  const { id } = useParams(); 

  const [providerData, setProviderData] = useState([]);
  // Validate ID and use dummy data

  useEffect(() => {
    const getData = async () => {
      let res = await fetch(
        `${baseUrl}/job-providers/job-provider-data-by-id/${id}`
      );
      res = await res.json();
      console.log(res);
      if (res.success) {
        setProviderData(res.resData);
      }
    };
    getData();
  });

  return (
    <div className="min-h-screen bg-light-cream p-4 sm:p-6 lg:p-8">
      <Topbar />
      <div className="w-full mx-auto   p-4 sm:p-6 bg-cream rounded-lg shadow-md space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-wrap gap-3 sm:gap-5 items-center justify-between">
          <div className="flex gap-2 sm:gap-4 items-center">
            <img
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt="Profile"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 sm:border-4 border-orange-400"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold capitalize">
                {providerData.providerName || "N/A"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">Job Provider</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-semibold text-orange-600">
              User ID
            </label>
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100 text-xs sm:text-sm"
              type="text"
              value={providerData._id}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-orange-600">
              Email
            </label>
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100 text-xs sm:text-sm"
              type="text"
              value={providerData.email}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-orange-600">
              Phone
            </label>
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100 text-xs sm:text-sm"
              type="text"
              value={providerData.phone}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-orange-600">
              Provider Name
            </label>
            <input
              className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100 text-xs sm:text-sm"
              type="text"
              value={providerData.providerName || "N/A"}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-orange-600">
              Website
            </label>
            <div className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100 text-xs sm:text-sm">
              {providerData.website ? (
                <a
                  href={providerData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:underline break-all"
                >
                  {providerData.website}
                </a>
              ) : (
                "N/A"
              )}
            </div>
          </div>
        </div>

        {/* Status Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          <button className="flex items-center gap-1.5 sm:gap-2 bg-green-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium text-xs sm:text-sm hover:bg-green-700">
            <FaCheckCircle className="text-sm sm:text-base" /> Approved
          </button>
          <button className="flex items-center gap-1.5 sm:gap-2 bg-red-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium text-xs sm:text-sm hover:bg-red-700">
            <FaTimesCircle className="text-sm sm:text-base" /> Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewJobProvider;
