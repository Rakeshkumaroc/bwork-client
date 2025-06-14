import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-yellow-400"></div>
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
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className="max-w-5xl mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {jobData.title}
            </h2>
            <p className="text-sm text-gray-600">{jobData.description}</p>
          </div>
          <button
            onClick={handleEdit}
            className="flex items-center bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            title="Edit Job"
          >
            <Pencil className="w-5 h-5 mr-2" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job ID
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={jobData._id}
              readOnly
              aria-label="Job ID"
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Work Mode
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={jobData.workMode}
              readOnly
              aria-label="Work Mode"
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={jobData.jobType}
              readOnly
              aria-label="Job Type"
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={`$${jobData.salary.toLocaleString()}`}
              readOnly
              aria-label="Salary"
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={jobData.yearsOfExperience}
              readOnly
              aria-label="Years of Experience"
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={jobData.location}
              readOnly
              aria-label="Location"
              aria-readonly="true"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              value={jobData.description}
              readOnly
              aria-label="Description"
              rows={4}
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={new Date(jobData.createdAt).toLocaleDateString()}
              readOnly
              aria-label="Created At"
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Updated At
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={new Date(jobData.updatedAt).toLocaleDateString()}
              readOnly
              aria-label="Updated At"
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  jobData.status === "Approved"
                    ? "text-green-600"
                    : jobData.status === "Reject"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {jobData.status}
              </span>
            </div>
          </div>
          <div className="sm:col-span-3 flex gap-4 mt-4">
            <button
              onClick={() => handleStatusUpdate("Approved")}
              disabled={updateLoading || jobData.status === "Approved"}
              className={`flex items-center px-6 py-2 rounded-md font-semibold text-sm text-white ${
                jobData.status === "Approved"
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              title="Approve Job"
            >
              {updateLoading ? "Updating..." : "Approve"}
            </button>
            <button
              onClick={() => handleStatusUpdate("Reject")}
              disabled={updateLoading || jobData.status === "Reject"}
              className={`flex items-center px-6 py-2 rounded-md font-semibold text-sm text-white ${
                jobData.status === "Reject"
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              title="Reject Job"
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