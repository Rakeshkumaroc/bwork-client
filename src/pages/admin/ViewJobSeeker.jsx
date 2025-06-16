import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
import { toast } from "react-toastify";
import { fetchData } from "../../utils/api"; 

const baseUrl = import.meta.env.VITE_APP_URL;

const ViewJobSeeker = () => {
  const { id } = useParams();
  const [seekerData, setSeekerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch seeker data
  const fetchSeekerData = () => {
    if (!id) {
      toast.error("Invalid job seeker ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
      return;
    }

    fetchData(
      `${baseUrl}/job-seekers/job-seeker-get-by-id/${id}`,
      (data) => {
        if (data) {
          setSeekerData(data);
        } else {
          throw new Error("Job seeker data not found.");
        }
      },
      setLoading,
      setError
    );
  };

  useEffect(() => {
    fetchSeekerData();
  }, [id]);

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

  if (!seekerData) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
        <p className="text-gray-600">No job seeker data available.</p>
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
                seekerData.userProfilePic ||
                "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              }
              alt="Job Seeker Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 capitalize">
                {seekerData.userName || "N/A"}
              </h2>
              <p className="text-sm text-gray-600">Job Seeker</p>
            </div>
          </div>
          <Link
            to="/dashboard/manage-job-seekers/list"
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
              value={seekerData._id || "N/A"}
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
              value={seekerData.email || "N/A"}
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
              value={seekerData.phone || "N/A"}
              readOnly
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={seekerData.userName || "N/A"}
              readOnly
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={seekerData.jobTitle || "N/A"}
              readOnly
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={
                seekerData.dob
                  ? new Date(seekerData.dob).toLocaleDateString()
                  : "N/A"
              }
              readOnly
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fresher
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={seekerData.isFresher ? "Yes" : "No"}
              readOnly
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={
                seekerData.experience
                  ? `${seekerData.experience} years`
                  : "N/A"
              }
              readOnly
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Active
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={seekerData.isActive ? "Yes" : "No"}
              readOnly
              aria-readonly="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJobSeeker;