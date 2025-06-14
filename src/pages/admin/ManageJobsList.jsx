import { useState, useEffect } from "react";
import Topbar from "../../components/admin/Topbar";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "../../components/common/admin/DataTable";
import { deleteForm } from "../../utils/form";
import { fetchData } from "../../utils/api";

const baseUrl = import.meta.env.VITE_APP_URL;

const ManageJobsList = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("authToken") || "{}");
    const userId = authToken.userId;

    if (!userId) {
      setError("Organization ID not found.");
      setLoading(false);
      return;
    }

    // Fetch jobs for the organization
    fetchData(
      `${baseUrl}/job-posts/get-all-job-posts-by-user-id/${userId}`,
      setJobs,
      setLoading,
      setError
    );
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Work Mode", accessor: "workMode" },
    { header: "Job Type", accessor: "jobType" }, 
    { header: "Salary", accessor: "salary" },
    { header: "Years of Experience", accessor: "yearsOfExperience" },
    { header: "Location", accessor: "location" },
    { header: "Status", accessor: "status" },
  ];

  const handleEdit = (job) => {
    navigate(`/dashboard/manage-job/${job._id}`);
  };

  const handleDelete = async (job) => {
    if (window.confirm(`Are you sure you want to delete ${job.title}?`)) {
      try {
        await deleteForm({
          url: `${baseUrl}/job-posts/delete-job-post/${job._id}`,
          setIsLoading: setLoading,
          successMessage: "Job deleted successfully!",
        });
        setJobs(jobs.filter((j) => j._id !== job._id));
      } catch (err) {
        console.error("Error deleting job:", err);
        setError("Failed to delete job.");
      }
    }
  };

 
return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Jobs</h1>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row w-full sm:w-auto sm:gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md w-full sm:w-64 px-3 py-2 text-sm text-gray-800 placeholder-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
          />
          <Link
            to="/dashboard/manage-job/add"
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-yellow-500 transition mt-4 sm:mt-0"
            title="Add Job"
          >
            <span>+</span>
            <span>Add Job</span>
          </Link>
        </div>
      </div>

      <DataTable
        data={filteredJobs}
        columns={columns}
        loading={loading}
        error={error}
        emptyMessage="No jobs found"
        basePath="./"
        onEdit={handleEdit}
        onDelete={handleDelete}
        className="bg-white rounded-md shadow-md"
      />
    </div>
  </div>
);
};

export default ManageJobsList;