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
    { header: "Description", accessor: "description" },
    { header: "Status", accessor: "status" }, // Added Status column
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
        // Update jobs state after deletion
        setJobs(jobs.filter((j) => j._id !== job._id));
      } catch (err) {
        console.error("Error deleting job:", err);
        setError("Failed to delete job.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-light-cream p-4 sm:p-8">
      <Topbar />
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="text-xl lg:text-3xl font-bold text-yellow-400">
          Manage Jobs
        </h1>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between w-full sm:w-auto sm:justify-end gap-4 sm:gap-5">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-orange-400 rounded-full w-full sm:w-64 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <Link
            to="/dashboard/manage-jobs/add"
            className="bg-orange-500 hover:bg-yellow-400 text-white font-semibold px-4 py-2 rounded-full flex items-center gap-1 text-lg sm:text-sm transition"
          >
            <span>+</span>
            <span className="hidden sm:block">Add Job</span>
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
      />
    </div>
  );
};

export default ManageJobsList;