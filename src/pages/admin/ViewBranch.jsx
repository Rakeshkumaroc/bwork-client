import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
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
    <div className="min-h-screen bg-light-cream p-8">
      <Topbar />
      <div className="bg-cream rounded-xl shadow-lg p-6 w-full mx-auto flex items-start space-x-6">
        {/* Left Section - Profile Image */}
    

        {/* Right Section - Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold capitalize">
                {branchData.branchName}
              </h2>
              <p className="text-sm text-gray-500">
                
                {branchData.address}
              </p>
            </div>
            <button onClick={handleEdit} className="flex items-center bg-orange-500 text-white px-4 py-1 rounded cursor-default">
              <img
                src="https://img.icons8.com/ios-glyphs/20/ffffff/edit.png"
                alt="Edit"
                className="mr-2"
              />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Branch ID
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={branchData._id}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Address
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={branchData.address}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                City
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={branchData.city}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                State
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={branchData.state}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Country
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={branchData.country}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Zip Code
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={branchData.zipCode}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Created At
              </label>
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={new Date(branchData.createdAt).toLocaleDateString()}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-orange-600 font-semibold">
                Updated At
              </label>
              <input
                className="border border-yellow-400 rounded px-2 py-1 w-full bg-gray-100"
                type="text"
                value={new Date(branchData.updatedAt).toLocaleDateString()}
                readOnly
              />
            </div>
          </div>

          {/* Active Toggle */}
          <div className="mt-4 flex items-center space-x-2">
            <span
              className={`text-sm font-semibold ${
                branchData.isActive ? "text-green-600" : "text-red-500"
              }`}
            >
              {branchData.isActive ? "Active" : "Inactive"}
            </span>
            <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner relative">
              <div
                className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                  branchData.isActive
                    ? "bg-green-500 translate-x-5"
                    : "bg-red-500 translate-x-0"
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
