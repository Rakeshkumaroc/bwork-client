import { useState, useEffect } from "react";
import Topbar from "../../components/admin/Topbar";
import DataTable from "../../components/common/admin/DataTable";
import { fetchData } from "../../utils/api";
import { deleteForm, updateForm } from "../../utils/form";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const ManageSeekerList = () => {
  const [search, setSearch] = useState("");
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editSeeker, setEditSeeker] = useState(null);
  const [editForm, setEditForm] = useState({
    userName: "",
    email: "",
    jobTitle: "",
    isFresher: true,
  });

  // Fetch job seekers on component mount
  useEffect(() => {
    fetchData(
      `${baseUrl}/job-seekers/get-all-job-seekers`,
      (data) => {
        setSeekers(data);
      },
      setLoading,
      setError
    );
  }, []);

  // Filter seekers based on search input
  const filteredSeekers = seekers.filter(
    (seeker) =>
      (seeker.phone?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (seeker.userName?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (seeker.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const columns = [
    { header: "Name", accessor: "userName" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Job Title", accessor: "jobTitle" },
    {
      header: "Fresher",
      render: (seeker) => (seeker.isFresher ? "Yes" : "No"),
    },
    {
      header: "Phone Verified",
      render: (seeker) => (seeker.isPhoneVerified ? "Yes" : "No"),
    },
    {
      header: "Active",
      render: (seeker) => (seeker.isActive ? "Yes" : "No"),
    },
    {
      header: "Created At",
      render: (seeker) =>
        seeker.createdAt
          ? new Date(seeker.createdAt).toLocaleDateString()
          : "N/A",
    },
    {
      header: "Actions",
      render: (seeker) => (
        <button
          onClick={() => handleEditClick(seeker)}
          className="text-blue-500 hover:underline mr-2"
        >
          Edit
        </button>
      ),
    },
  ];

  const handleDelete = async (seeker) => {
    if (window.confirm(`Are you sure you want to delete ${seeker.userName || seeker.phone}?`)) {
      try {
        await deleteForm({
          url: `${baseUrl}/job-seekers/delete-job-seeker/${seeker._id}`,
          setIsLoading: setLoading,
          successMessage: "Job seeker deleted successfully!",
        });
        setSeekers(seekers.filter((s) => s._id !== seeker._id));
        toast.success("Job seeker deleted successfully!");
      } catch (err) {
        console.error("Error deleting seeker:", err);
        setError("Failed to delete job seeker.");
        toast.error("Failed to delete job seeker.");
      }
    }
  };

  const handleEditClick = (seeker) => {
    setEditSeeker(seeker);
    setEditForm({
      userName: seeker.userName || "",
      email: seeker.email || "",
      jobTitle: seeker.jobTitle || "",
      isFresher: seeker.isFresher ?? true,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editSeeker) return;

    try {
      // Find the mapping to get jobSeekerBasicDetailsId
      const mappingResponse = await fetchData(
        `${baseUrl}/job-seekers/basic-details/${editSeeker._id}`
      );
      const basicDetailsId = mappingResponse.jobSeekerBasicDetailsId;

      await updateForm({
        url: `${baseUrl}/job-seekers/basic-details/${basicDetailsId}`,
        data: editForm,
        setIsLoading: setLoading,
        successMessage: "Job seeker details updated successfully!",
      });

      setSeekers(
        seekers.map((s) =>
          s._id === editSeeker._id ? { ...s, ...editForm } : s
        )
      );
      setEditSeeker(null);
      toast.success("Job seeker details updated successfully!");
    } catch (err) {
      console.error("Error updating seeker:", err);
      setError("Failed to update job seeker.");
      toast.error("Failed to update job seeker.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <Topbar />
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between flex-wrap items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Manage Job Seekers
          </h1>
          <div className="mt-4 sm:mt-0 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md w-full sm:w-64 px-3 py-2 text-sm text-gray-800 placeholder-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
            />
          </div>
        </div>

        <DataTable
          data={filteredSeekers}
          columns={columns}
          loading={loading}
          error={error}
          emptyMessage="No job seekers found"
          basePath="./"
          onDelete={handleDelete}
          className="bg-white rounded-md shadow-md"
        />

        {editSeeker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Edit Job Seeker: {editSeeker.userName || editSeeker.phone}
              </h2>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editForm.userName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, userName: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={editForm.jobTitle}
                    onChange={(e) =>
                      setEditForm({ ...editForm, jobTitle: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Fresher</label>
                  <select
                    value={editForm.isFresher}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        isFresher: e.target.value === "true",
                      })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditSeeker(null)}
                    className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-400 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSeekerList;