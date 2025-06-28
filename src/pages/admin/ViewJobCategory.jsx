// components/admin/ViewJobCategory.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Topbar from "../../components/admin/Topbar";
import { fetchData } from "../../utils/api";
import { Pencil } from "lucide-react";

const baseUrl = import.meta.env.VITE_APP_URL;

const ViewJobCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Function to fetch job category data
  const fetchCategoryData = () => {
    if (!id) {
      toast.error("Invalid category ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      setFetchLoading(false);
      return;
    }

    fetchData(
      `${baseUrl}/job-category/get-job-category-by-id/${id}`,
      (data) => {
        if (data) {
          setCategoryData(data);
        } else {
          throw new Error("Job category data not found.");
        }
      },
      setFetchLoading,
      setFetchError
    );
  };

  useEffect(() => {
    fetchCategoryData();
  }, [id]);

  const handleEdit = () => {
    navigate(`/dashboard/manage-job-category/${id}`);
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-yellow-400"></div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
        <p className="text-red-600">Error: {fetchError}</p>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center">
        <p className="text-gray-600">No job category data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <Topbar />
      <div className="mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 capitalize">
                {categoryData.title}
              </h2>
              
            </div>
            <button
              onClick={handleEdit}
              className="flex items-center bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
              title="Edit Job Category"
            >
              <Pencil className="w-5 h-5 mr-2" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category ID
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
                type="text"
                value={categoryData._id}
                readOnly
                aria-readonly="true"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
                value={categoryData.description || "No description provided."}
                readOnly
                aria-readonly="true"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Created At
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
                type="text"
                value={new Date(categoryData.createdAt).toLocaleDateString()}
                readOnly
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
                value={new Date(categoryData.updatedAt).toLocaleDateString()}
                readOnly
                aria-readonly="true"
              />
            </div>
            {/* Active Toggle */}
            <div className="mt-6 flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  categoryData.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {categoryData.isActive ? "Active" : "Inactive"}
              </span>
              <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner relative">
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    categoryData.isActive
                      ? "bg-green-600 translate-x-5"
                      : "bg-red-600 translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJobCategory;