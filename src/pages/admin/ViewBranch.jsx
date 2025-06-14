import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
import { Pencil } from "lucide-react";
const baseUrl = import.meta.env.VITE_APP_URL;

const ViewBranch = () => {
  const { id } = useParams();
  const [branchData, setBranchData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetch(`${baseUrl}/branch/get-branch-by-id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBranchData(data.resData);
      })
      .catch((err) => {
        console.error("Error fetching branch:", err);
      });
  }, [id]);

  if (!branchData) {
    return <div className="text-center mt-10">Loading branch data...</div>;
  }
  
  const handleEdit = () => {
    navigate(`/dashboard/manage-branch/${id}`);
  };

  return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className="max-w-5xl mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {branchData.branchName}
            </h2>
            <p className="text-sm text-gray-600">{branchData.address}</p>
          </div>
          <button
            onClick={handleEdit}
            className="flex items-center bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            title="Edit Branch"
          >
            <Pencil className="w-5 h-5 mr-2" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch ID
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={branchData._id}
              readOnly
              aria-readonly="true"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={branchData.address}
              readOnly
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={branchData.city}
              readOnly
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={branchData.state}
              readOnly
              aria-readonly="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={branchData.country}
              readOnly
              aria-readonly="true"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={branchData.zipCode}
              readOnly
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
              value={new Date(branchData.createdAt).toLocaleDateString()}
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
              value={new Date(branchData.updatedAt).toLocaleDateString()}
              readOnly
              aria-readonly="true"
            />
          </div>
        </div>

        {/* Active Toggle */}
        <div className="mt-6 flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              branchData.isActive ? "text-green-600" : "text-red-600"
            }`}
          >
            {branchData.isActive ? "Active" : "Inactive"}
          </span>
          <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner relative">
            <div
              className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                branchData.isActive
                  ? "bg-green-600 translate-x-5"
                  : "bg-red-600 translate-x-0"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ViewBranch;
