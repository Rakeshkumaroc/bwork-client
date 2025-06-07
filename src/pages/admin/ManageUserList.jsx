// components/admin/ManageUserList.jsx
import React, { useState, useEffect } from "react";
import Topbar from "../../components/admin/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/api"; 
import DataTable from "../../components/common/admin/DataTable";
const baseUrl = import.meta.env.VITE_APP_URL;

const ManageUserList = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
     
     const organizationData = JSON.parse(
        localStorage.getItem("organizationData") || "{}"
      );
      const orgId = organizationData._id; // Assuming userId is orgId; adjust if different
    fetchData(`${baseUrl}/user/get-user-by-org-id/${orgId}`, setUsers, setLoading, setError);
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
 if (window.confirm(`Are you sure you want to delete ${user.userName}?`)) {
      try {
        await deleteForm({
          url: `${baseUrl}/user/delete-user/${user._id}`,
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
    <div className="min-h-screen bg-light-cream p-8">
      <Topbar />
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="lg:text-3xl text-xl font-bold text-orange-global">
          Manage Users
        </h1>
        <div className="mt-6 flex justify-between w-full md:w-auto md:justify-end gap-5">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-orange-400 rounded-full w-full md:w-auto px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <Link
            to={"/dashboard/branch-user/add"}
            className="bg-orange-500 flex gap-1 hover:bg-orange-global text-white font-semibold px-4 py-2 rounded-full text-2xl md:text-sm"
          >
            + <span className="hidden md:block">Add User</span>
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
      />
    </div>
  );
};

export default ManageUserList;