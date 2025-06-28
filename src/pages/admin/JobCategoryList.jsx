// components/admin/JobCategoryList.jsx
import { useState, useEffect } from "react";
import Topbar from "../../components/admin/Topbar";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../components/common/admin/DataTable";
import { deleteForm } from "../../utils/form";
import { fetchData } from "../../utils/api";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const JobCategoryList = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("authToken") || "{}");
    const userId = authToken.userId;

    if (!userId) {
      setError("User ID not found.");
      setLoading(false);
      toast.error("User ID not found. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/employers-login");
      return;
    }

    // Fetch all job categories
    fetchData(
      `${baseUrl}/job-category/get-all-job-category`,
      setCategories,
      setLoading,
      setError
    );
  }, [navigate]);

  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Description", accessor: "description" },
    {
      header: "Status",
      accessor: "isActive",
      render: (value) => (value ? "Active" : "Inactive"),
    },
  ];

  const handleEdit = (category) => {
    navigate(`/dashboard/manage-job-category/${category._id}`);
  };

  const handleDelete = async (category) => {
    if (window.confirm(`Are you sure you want to delete ${category.title}?`)) {
      try {
        await deleteForm({
          url: `${baseUrl}/job-category/delete-job-category/${category._id}`,
          setIsLoading: setLoading,
          successMessage: "Job category deleted successfully!",
        });
        setCategories(categories.filter((c) => c._id !== category._id));
      } catch (err) {
        console.error("Error deleting category:", err);
        setError("Failed to delete job category.");
        toast.error("Failed to delete job category.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <Topbar />
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between flex-wrap items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Manage Job Categories
          </h1>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row w-full sm:w-auto sm:gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md w-full sm:w-64 px-3 py-2 text-sm text-gray-800 placeholder-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
            />
            <Link
              to="/dashboard/manage-job-category/add"
              className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-yellow-500 transition mt-4 sm:mt-0"
              title="Add Job Category"
            >
              <span>+</span>
              <span>Add Job Category</span>
            </Link>
          </div>
        </div>

        <DataTable
          data={filteredCategories}
          columns={columns}
          loading={loading}
          error={error}
          emptyMessage="No job categories found"
          basePath="./"
          onEdit={handleEdit}
          onDelete={handleDelete}
          className="bg-white rounded-md shadow-md"
        />
      </div>
    </div>
  );
};

export default JobCategoryList;