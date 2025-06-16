import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
import { Pencil } from "lucide-react";
const baseUrl = import.meta.env.VITE_APP_URL;

const ViewBranchUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetch(`${baseUrl}/user/get-single-internal-user-by-id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.resData);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, [id]);

  if (!userData) {
    return <div className="text-center mt-10">Loading user data...</div>;
  }
  const handleEdit = () => {
    navigate(`/dashboard/branch-user/${id}`);
  };

  return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className=" mx-auto bg-white rounded-md shadow-md p-6 flex flex-col sm:flex-row sm:gap-6">
      {/* Left Section - Profile Image */}
      <div className="flex flex-col items-center">
        <img
          src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
          alt="User Profile"
          className="rounded-full w-24 h-24 object-cover border-2 border-gray-300"
        />
      </div>

      {/* Right Section - Info */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {userData.userName}
            </h2>
            <p className="text-sm text-gray-600">Bihar, India</p>
          </div>
          <button
            onClick={handleEdit}
            className="flex items-center bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            title="Edit User"
          >
            <Pencil className="w-5 h-5 mr-2" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
              type="text"
              value={userData._id}
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
              value={userData.phone}
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
              value={userData.email}
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
              value={new Date(userData.createdAt).toLocaleDateString()}
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
              value={new Date(userData.updatedAt).toLocaleDateString()}
              readOnly
              aria-readonly="true"
            />
          </div>
        </div>

        {/* Active Toggle */}
        <div className="mt-6 flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              userData.isActive ? "text-green-600" : "text-red-600"
            }`}
          >
            {userData.isActive ? "Active" : "Inactive"}
          </span>
          <div className="w-10 h-5 bg-gray-200 rounded-full shadow-inner relative">
            <div
              className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                userData.isActive
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

export default ViewBranchUser;
