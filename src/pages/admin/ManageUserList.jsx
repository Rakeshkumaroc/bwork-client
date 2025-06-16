// components/admin/ManageUserList.jsx
import React, { useState, useEffect } from "react";
import Topbar from "../../components/admin/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/api"; 
import DataTable from "../../components/common/admin/DataTable";
import { deleteForm } from "../../utils/form";
const baseUrl = import.meta.env.VITE_APP_URL;

const ManageUserList = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
     
     const authToken = JSON.parse(
        localStorage.getItem("authToken") || "{}"
      );
      const userId = authToken.userId; // Assuming userId is userId; adjust if different
    fetchData(`${baseUrl}/user/get-internal-users-by-user-id/${userId}`, setUsers, setLoading, setError);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.userName?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: "User ID", accessor: "_id" },
    { header: "User Name", accessor: "userName" },
    { header: "Phone", accessor: "phone" },
    { header: "E-mail", accessor: "email" },
    {
      header: "Status",
      render: (user) => (
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full ${
            user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleEdit = (user) => {
   navigate(`/dashboard/branch-user/${user._id}`);
    // Add edit logic here
  };

  const handleDelete = async(user) => {
    console.log('user._id',user._id);
    
 if (window.confirm(`Are you sure you want to delete ${user.userName}?`)) {
      try {
        await deleteForm({
          url: `${baseUrl}/user/delete-internal-user/${user._id}`,
          setIsLoading: setLoading,
          successMessage: "user deleted successfully!",
           
        });
      } catch (err) {
        console.error("Error deleting user:", err);
        setError(err.message);
      }
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className="  mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Users</h1>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row w-full sm:w-auto sm:gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md w-full sm:w-64 px-3 py-2 text-sm text-gray-800 placeholder-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
          />
          <Link
            to="/dashboard/branch-user/add"
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-yellow-500 transition mt-4 sm:mt-0"
            title="Add User"
          >
            <span>+</span>
            <span>Add User</span>
          </Link>
        </div>
      </div>

      <DataTable
        data={filteredUsers}
        columns={columns}
        loading={loading}
        error={error}
        emptyMessage="No users found"
        basePath="./"
        onEdit={handleEdit}
        onDelete={handleDelete}
        className="bg-white rounded-md shadow-md"
      />
    </div>
  </div>
);
};

export default ManageUserList;