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
    <div className="min-h-screen bg-light-cream p-8">
      <Topbar />
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="text-xl lg:text-3xl font-bold text-yellow-400">
          Manage Job Providers
        </h1>
        <div className="mt-6 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-orange rounded-full w-full md:w-64 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
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
      />
    </div>
  );
};

export default ManageProviderList;