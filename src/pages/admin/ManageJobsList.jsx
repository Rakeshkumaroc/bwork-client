// components/admin/ManageJobsList.jsx
import { useState, useEffect } from "react";
import Topbar from "../../components/admin/Topbar";
import { Link } from "react-router-dom";
import DataTable from "../../components/common/admin/DataTable";

const ManageJobsList = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dummy data for jobs
  const dummyJobs = [
    {
      _id: "job1",
      title: "Software Engineer",
      workMode: "Remote",
      jobType: "Full-time",
      description: "Develop and maintain web applications using React and Node.js.",
      branchId: { _id: "branch1", branchName: "Main Branch" },
    },
    {
      _id: "job2",
      title: "Product Manager",
      workMode: "Hybrid",
      jobType: "Full-time",
      description: "Lead product development and coordinate with cross-functional teams.",
      branchId: { _id: "branch2", branchName: "Downtown Branch" },
    },
    {
      _id: "job3",
      title: "Graphic Designer",
      workMode: "On-site",
      jobType: "Part-time",
      description: "Create visual content for marketing campaigns and branding.",
      branchId: null, // No branch assigned
    },
    {
      _id: "job4",
      title: "Data Analyst",
      workMode: "Remote",
      jobType: "Contract",
      description: "Analyze data and generate insights using Python and SQL.",
      branchId: { _id: "branch3", branchName: "West Branch" },
    },
    {
      _id: "job5",
      title: "Intern Developer",
      workMode: "Hybrid",
      jobType: "Internship",
      description: "Assist in developing features for web applications.",
      branchId: { _id: "branch1", branchName: "Main Branch" },
    },
  ];

  useEffect(() => {
    // Simulate fetching data with dummy data
    try {
      const authToken = JSON.parse(
        localStorage.getItem("authToken") || "{}"
      );
      const orgId = authToken.orgId;

      if (!orgId) {
        setError("Organization ID not found.");
        setLoading(false);
        return;
      }

      // Set dummy data as jobs
      setJobs(dummyJobs);
      setLoading(false);
    } catch (err) {
      setError("Failed to load jobs.");
      setLoading(false);
    }
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Work Mode", accessor: "workMode" },
    { header: "Job Type", accessor: "jobType" },
    { header: "Description", accessor: "description" },
    {
      header: "Branch",
      accessor: (job) => job.branchId?.branchName || "N/A", // Display branch name if available
    },
  ];

  const handleEdit = (job) => {
    console.log("Edit job:", job);
    // Add edit logic here (e.g., navigate to edit page or open modal)
  };

  const handleDelete = (job) => {
    if (window.confirm(`Are you sure you want to delete ${job.title}?`)) {
      try {
        // Simulate deletion by filtering out the job
        setJobs(jobs.filter((j) => j._id !== job._id));
      } catch (err) {
        setError("Failed to delete job.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-light-cream p-8">
      <Topbar />
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="lg:text-3xl text-xl font-bold text-orange-global">
          Manage Jobs
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
            to={"/dashboard/manage-jobs/add"}
            className="bg-orange-500 flex gap-1 hover:bg-orange-global text-white font-semibold px-4 py-2 rounded-full text-2xl md:text-sm"
          >
            + <span className="hidden md:block">Add Job</span>
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