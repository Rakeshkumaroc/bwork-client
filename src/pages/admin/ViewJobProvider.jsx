import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { updateForm } from "../../utils/form"; // Import updateForm utility
import { fetchData } from "../../utils/api"; // Import fetchData utility

const baseUrl = import.meta.env.VITE_APP_URL;

const ViewJobProvider = () => {
  const { id } = useParams();
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Function to fetch provider data
  const fetchProviderData = () => {
    if (!id) {
      toast.error("Invalid provider ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }

    fetchData(
      `${baseUrl}/job-providers/job-provider-get-by-id/${id}`,
      (data) => {
        if (data) {
          setProviderData(data);
        } else {
          throw new Error("Job provider data not found.");
        }
      },
      setLoading,
      setError
    );
  };

  useEffect(() => {
    fetchProviderData();
  }, [id]);

  // Function to handle status update
  const handleStatusUpdate = async (status) => {
    try {
      const response = await updateForm({
        url: `${baseUrl}/job-providers/update-account-status/${
          providerData?.providerId || id
        }`,
        payload: { status },
        setIsLoading: setUpdateLoading,
        successMessage: `Job provider status updated to ${status}.`,
      });

      // Check if response.data contains the full provider data
      if (response?.data && Object.keys(response.data).length > 0) {
        setProviderData(response.data); // Update with new data if available
      } else {
        // Refetch provider data if response.data is incomplete
        fetchProviderData();
      }
    } catch (error) {
      console.error("Status update failed:", error);
      // Error is handled by updateForm via toast
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-cream p-4 sm:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-global"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light-cream p-4 sm:p-8 flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!providerData) {
    return (
      <div className="min-h-screen bg-light-cream p-4 sm:p-8 flex items-center justify-center">
        <p className="text-gray-600">No job provider data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-cream p-4 sm:p-6 lg:p-8">
      <ToastContainer />
      <Topbar />
      <div className="w-full mx-auto p-4 sm:p-6 bg-cream rounded-lg shadow-md space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-wrap gap-3 sm:gap-5 items-center justify-between">
          <div className="flex gap-2 sm:gap-4 items-center">
            <img
              src={
                providerData.jobProviderPic ||
                "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              }
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
              value={providerData._id || "N/A"}
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
              value={providerData.email || "N/A"}
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
              value={providerData.phone || "N/A"}
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
          <div>
            <label className="block text-sm font-semibold text-orange-600">
              Status
            </label>
            <div className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100 text-xs sm:text-sm">
              <span
                className={`font-semibold ${
                  providerData.status === "Approved"
                    ? "text-green-600"
                    : providerData.status === "Reject"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {providerData.status || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Status Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          <button
            onClick={() => handleStatusUpdate("Approved")}
            disabled={updateLoading || providerData.status === "Approved"}
            className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium text-xs sm:text-sm text-white ${
              providerData.status === "Approved"
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <FaCheckCircle className="text-sm sm:text-base" />
            {updateLoading ? "Updating..." : "Approve"}
          </button>
          <button
            onClick={() => handleStatusUpdate("Reject")}
            disabled={updateLoading || providerData.status === "Reject"}
            className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-md font-medium text-xs sm:text-sm text-white ${
              providerData.status === "Reject"
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <FaTimesCircle className="text-sm sm:text-base" />
            {updateLoading ? "Updating..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewJobProvider;