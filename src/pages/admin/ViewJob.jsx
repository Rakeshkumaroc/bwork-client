import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Topbar from "../../components/admin/Topbar";
import { fetchData } from "../../utils/api";

const baseUrl = import.meta.env.VITE_APP_URL;

const ViewJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!id) {
      toast.error("Invalid job ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    console.log(`${baseUrl}/job-posts/get-job-post-by-id/${id}`);

    fetchData(
      `${baseUrl}/job-posts/get-job-post-by-id/${id}`,
      (data) => {
        console.log("data.resData", data);
        if (data) {
          setJobData(data);
        } else {
          throw new Error("Job data not found.");
        }
      },
      setFetchLoading,
      setFetchError
    );
  }, [id]);

  const handleEdit = () => {
    navigate(`/dashboard/manage-job/${id}`);
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
      <div className="bg-cream rounded-xl shadow-lg p-6 w-full   mx-auto flex items-start space-x-6">
        {/* Right Section - Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold capitalize">
                {jobData.title}
              </h2>
              <p className="text-sm text-gray-500">{jobData.description}</p>
            </div>
            <button  onClick={handleEdit} className="flex items-center bg-orange-500 text-white px-4 py-1 rounded cursor-default">
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
                    jobData.isActive ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {jobData.isActive ? "Active" : "Inactive"}
                </span>
                <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner relative">
                  <div
                    className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                      jobData.isActive
                        ? "bg-green-500 translate-x-5"
                        : "bg-red-500 translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;
