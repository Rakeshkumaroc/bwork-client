// components/admin/ManageProviderList.jsx
import { useState, useEffect } from "react";
import Topbar from "../../components/admin/Topbar";
import DataTable from "../../components/common/admin/DataTable";
import { fetchData } from "../../utils/api";
import { deleteForm } from "../../utils/form";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const ManageProviderList = () => {
  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job providers on component mount
  useEffect(() => {
    fetchData(
      `${baseUrl}/job-providers/get-all-job-providers`,
      (data) => {
        // Use _id from response as the unique identifier
        const formattedProviders = data.map((provider) => ({
          ...provider,
        }));
        setProviders(formattedProviders);
      },
      setLoading,
      setError
    );
  }, []);

  // Filter providers based on search input
  const filteredProviders = providers.filter((provider) =>
    (provider.providerName?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (provider.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const columns = [
  { header: "Email", accessor: "email" },
  {
    header: "Provider Name",
    render: (provider) => provider.providerName || "N/A",
  },
  { header: "Phone", accessor: "phone" },
  {
    header: "Website",
    render: (provider) =>
      provider.website ? (
        <a
          href={provider.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:underline"
        >
          {provider.website}
        </a>
      ) : (
        "N/A"
      ),
  },
];

  const handleDelete = async (provider) => {
    if (window.confirm(`Are you sure you want to delete ${provider.providerName || provider.email}?`)) {
      try {
        await deleteForm({
          url: `${baseUrl}/job-providers/delete-job-provider/${provider._id}`,
          setIsLoading: setLoading,
          successMessage: "Job provider deleted successfully!",
        });
        setProviders(providers.filter((p) => p._id !== provider._id));
        toast.success("Job provider deleted successfully!");
      } catch (err) {
        console.error("Error deleting provider:", err);
        setError("Failed to delete job provider.");
        toast.error("Failed to delete job provider.");
      }
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Manage Job Providers
        </h1>
        <div className="mt-4 sm:mt-0 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md w-full sm:w-64 px-3 py-2 text-sm text-gray-800 placeholder-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
          />
        </div>
      </div>

      <DataTable
        data={filteredProviders}
        columns={columns}
        loading={loading}
        error={error}
        emptyMessage="No job providers found"
        basePath="./"
        onDelete={handleDelete}
        className="bg-white rounded-md shadow-md"
      />
    </div>
  </div>
);
};

export default ManageProviderList;