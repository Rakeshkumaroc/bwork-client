import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
const baseUrl = import.meta.env.VITE_APP_URL;

const ViewBranchUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${baseUrl}/user/get-user-by-id/${id}`)
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

  return (
    <div className="min-h-screen bg-light-cream p-8">
      <Topbar />
      <div className="bg-cream rounded-xl shadow-lg p-6 w-full mx-auto flex items-start space-x-6">
        {/* Left Section - Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-orange-400"
          />

         
        </div>

        {/* Right Section - Info */}
        {
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold capitalize">
                  {userData.userName}
                </h2>
                <p className="text-sm text-gray-500">Bihar, India</p>
              </div>
              <button className="flex items-center bg-orange-500 text-white px-4 py-1 rounded cursor-default">
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
                  User ID
                </label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                  type="text"
                  value={userData._id}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm text-orange-600 font-semibold">
                  Phone
                </label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                  type="text"
                  value={userData.phone}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm text-orange-600 font-semibold">
                  Email
                </label>
                <input
                  className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
                  type="text"
                  value={userData.email}
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
                  value={new Date(userData.createdAt).toLocaleDateString()}
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
                  value={new Date(userData.updatedAt).toLocaleDateString()}
                  readOnly
                />
              </div>
            </div>

            {/* Active Toggle */}
            <div className="mt-4 flex items-center space-x-2">
              <span
                className={`text-sm font-semibold ${
                  userData.isActive ? "text-green-600" : "text-red-500"
                }`}
              >
                {userData.isActive ? "Active" : "Inactive"}
              </span>
              <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner relative">
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                    userData.isActive
                      ? "bg-green-500 translate-x-5"
                      : "bg-red-500 translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ViewBranchUser;
