import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";
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
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!providerData) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
        <p className="text-gray-600">No job provider data available.</p>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className="w-full mx-auto bg-white rounded-md shadow-md p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={
              providerData.jobProviderPic ||
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            }
            alt="Job Provider Profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 capitalize">
              {providerData.providerName || "N/A"}
            </h2>
            <p className="text-sm text-gray-600">Job Provider</p>
          </div>
        </div>
          <Link
            to="/dashboard/manage-job-providers/list"
            className="px-4 py-2 bg-gray-300 rounded-md text-sm font-semibold hover:bg-gray-400"
          >
            Back
          </Link>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
            type="text"
            value={providerData._id || "N/A"}
            readOnly
            aria-readonly="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
            type="text"
            value={providerData.email || "N/A"}
            readOnly
            aria-readonly="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
            type="text"
            value={providerData.phone || "N/A"}
            readOnly
            aria-readonly="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provider Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
            type="text"
            value={providerData.providerName || "N/A"}
            readOnly
            aria-readonly="true"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <div className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50 text-sm text-gray-800">
            {providerData.website ? (
              <a
                href={providerData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {providerData.website}
              </a>
            ) : (
              "N/A"
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <div className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50 text-sm">
            <span
              className={`font-medium ${
                providerData.status === "Approved"
                  ? "text-green-600"
                  : providerData.status === "Reject"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {providerData.status || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Status Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => handleStatusUpdate("Approved")}
          disabled={updateLoading || providerData.status === "Approved"}
          className={`flex items-center gap-2 px-6 py-2 rounded-md font-semibold text-sm text-white ${
            providerData.status === "Approved"
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          title="Approve Provider"
        >
          <FaCheckCircle className="text-base" />
          {updateLoading ? "Updating..." : "Approve"}
        </button>
        <button
          onClick={() => handleStatusUpdate("Reject")}
          disabled={updateLoading || providerData.status === "Reject"}
          className={`flex items-center gap-2 px-6 py-2 rounded-md font-semibold text-sm text-white ${
            providerData.status === "Reject"
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          title="Reject Provider"
        >
          <FaTimesCircle className="text-base" />
          {updateLoading ? "Updating..." : "Reject"}
        </button>
      </div>
    </div>
  </div>
);
};

export default ViewJobProvider;