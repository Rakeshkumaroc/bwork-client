import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Topbar from "../../components/admin/Topbar";
import { fetchData } from "../../utils/api";
import { updateForm } from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const ViewJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Function to fetch job data
  const fetchJobData = () => {
    if (!id) {
      toast.error("Invalid job ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      setFetchLoading(false);
      return;
    }

    fetchData(
      `${baseUrl}/job-posts/get-job-post-by-id/${id}`,
      (data) => {
        if (data) {
          setJobData(data);
        } else {
          throw new Error("Job data not found.");
        }
      },
      setFetchLoading,
      setFetchError
    );
  };

  useEffect(() => {
    fetchJobData();
  }, [id]);

  const handleEdit = () => {
    navigate(`/dashboard/manage-job/${id}`);
  };

  // Function to handle status update
  const handleStatusUpdate = async (status) => {
    try {
      const response = await updateForm({
        url: `${baseUrl}/job-posts/update-job-post-status/${id}`,
        payload: { status },
        setIsLoading: setUpdateLoading,
        successMessage: `Job status updated to ${status}.`,
      });

      // Check if response.data contains valid job data
      if (response?.data && Object.keys(response.data).length > 0) {
        setJobData(response.data); // Update with new data if available
      } else {
        // Refetch job data if response.data is incomplete
        fetchJobData();
      }
    } catch (error) {
      console.error("Status update failed:", error);
      // Error is handled by updateForm via toast
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-light-cream p-4 sm:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-global"></div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-light-cream p-4 sm:p-8 flex items-center justify-center">
        <p className="text-red-600">Error: {fetchError}</p>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-light-cream p-4 sm:p-8 flex items-center justify-center">
        <p className="text-gray-600">No job data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-cream p-4 sm:p-8">
      <ToastContainer />
      <Topbar />
      <div className="bg-cream rounded-xl shadow-lg p-6 w-full mx-auto flex items-start space-x-6">
        {/* Right Section - Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold capitalize">
                {jobData.title}
              </h2>
              <p className="text-sm text-gray-500">{jobData.description}</p>
            </div>
            <button
              onClick={handleEdit}
              className="flex items-center bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
            >
              <img
                src="https://img.icons8.com/ios-glyphs/20/ffffff/edit.png"
                alt="Edit"
                className="mr-2"
              />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Job ID
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={jobData._id}
                readOnly
                aria-label="Job ID"
              />
            </div>
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Work Mode
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={jobData.workMode}
                readOnly
                aria-label="Work Mode"
              />
            </div>
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Job Type
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={jobData.jobType}
                readOnly
                aria-label="Job Type"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm text-orange-600 font-semibold">
                Description
              </label>
              <textarea
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                value={jobData.description}
                readOnly
                aria-label="Description"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Created At
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={new Date(jobData.createdAt).toLocaleDateString()}
                readOnly
                aria-label="Created At"
              />
            </div>
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Updated At
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={new Date(jobData.updatedAt).toLocaleDateString()}
                readOnly
                aria-label="Updated At"
              />
            </div>
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Status
              </label>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm font-semibold ${
                    jobData.status === "Approved"
                      ? "text-green-600"
                      : jobData.status === "Reject"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {jobData.status}
                </span>
              </div>
            </div>
            <div className="md:col-span-3 flex space-x-4 mt-4">
              <button
                onClick={() => handleStatusUpdate("Approved")}
                disabled={updateLoading || jobData.status === "Approved"}
                className={`flex items-center px-4 py-2 rounded text-white ${
                  jobData.status === "Approved"
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {updateLoading ? "Updating..." : "Approve"}
              </button>
              <button
                onClick={() => handleStatusUpdate("Reject")}
                disabled={updateLoading || jobData.status === "Reject"}
                className={`flex items-center px-4 py-2 rounded text-white ${
                  jobData.status === "Reject"
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {updateLoading ? "Updating..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;