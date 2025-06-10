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
  const [selectedProviders, setSelectedProviders] = useState([]);

  // Fetch job providers on component mount
  useEffect(() => {
    fetchData(
      `${baseUrl}/job-providers/get-all-job-providers`,
      (data) => {
        // Add a unique identifier (e.g., email) as a fallback for _id
        const formattedProviders = data.map((provider, index) => ({
          ...provider,
          _id: provider.email, // Using email as a unique identifier
          isActive: provider.isActive ?? true, // Assume active unless specified
        }));
        setProviders(formattedProviders);
      },
      setLoading,
      setError
    );
  }, []);

  // Filter providers based on search input
  const filteredProviders = providers.filter((provider) =>
    provider.providerName?.toLowerCase().includes(search.toLowerCase()) ||
    provider.email?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedProviders(filteredProviders.map((p) => p._id));
            } else {
              setSelectedProviders([]);
            }
          }}
          checked={selectedProviders.length === filteredProviders.length && filteredProviders.length > 0}
        />
      ),
      render: (provider) => (
        <input
          type="checkbox"
          checked={selectedProviders.includes(provider._id)}
          onChange={() => {
            setSelectedProviders((prev) =>
              prev.includes(provider._id)
                ? prev.filter((id) => id !== provider._id)
                : [...prev, provider._id]
            );
          }}
        />
      ),
    },
    { header: "Email", accessor: "email" },
    {
      header: "Provider Name",
      render: (provider) => (
        <div className="flex items-center">
          
          {provider.providerName || "N/A"}
        </div>
      ),
    },
    { header: "Phone", accessor: "phone" },
    {
      header: "Status",
      render: (provider) => (
        <span
          className={`inline-block px-2 py-1 text-xs rounded-full ${
            provider.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {provider.isActive ? "Active" : "Inactive"}
        </span>
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
        setSelectedProviders(selectedProviders.filter((id) => id !== provider._id));
        toast.success("Job provider deleted successfully!");
      } catch (err) {
        console.error("Error deleting provider:", err);
        setError("Failed to delete job provider.");
        toast.error("Failed to delete job provider.");
      }
    }
  };

  const handleBulkApprove = async () => {
    if (selectedProviders.length === 0) {
      toast.error("Please select at least one provider to approve.");
      return;
    }
    if (window.confirm(`Are you sure you want to approve ${selectedProviders.length} provider(s)?`)) {
      try {
        await fetch(`${baseUrl}/job-providers/update-status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            providerIds: selectedProviders,
            isActive: true,
          }),
        });
        setProviders((prev) =>
          prev.map((provider) =>
            selectedProviders.includes(provider._id)
              ? { ...provider, isActive: true }
              : provider
          )
        );
        setSelectedProviders([]);
        toast.success("Selected providers approved successfully!");
      } catch (err) {
        console.error("Error approving providers:", err);
        setError("Failed to approve providers.");
        toast.error("Failed to approve providers.");
      }
    }
  };

  const handleBulkReject = async () => {
    if (selectedProviders.length === 0) {
      toast.error("Please select at least one provider to reject.");
      return;
    }
    if (window.confirm(`Are you sure you want to reject ${selectedProviders.length} provider(s)?`)) {
      try {
        await fetch(`${baseUrl}/job-providers/update-status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            providerIds: selectedProviders,
            isActive: false,
          }),
        });
        setProviders((prev) =>
          prev.map((provider) =>
            selectedProviders.includes(provider._id)
              ? { ...provider, isActive: false }
              : provider
          )
        );
        setSelectedProviders([]);
        toast.success("Selected providers rejected successfully!");
      } catch (err) {
        console.error("Error rejecting providers:", err);
        setError("Failed to reject providers.");
        toast.error("Failed to reject providers.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-light-cream p-8">
      <Topbar />
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="lg:text-3xl text-xl font-bold text-orange-global">
          Manage Job Providers
        </h1>
        <div className="mt-6 flex justify-between w-full md:w-auto md:justify-end gap-5">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-orange-400 rounded-full w-full md:w-auto px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <div className="flex gap-3">
            <button
              onClick={handleBulkApprove}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full text-sm"
              disabled={selectedProviders.length === 0}
            >
              Approve
            </button>
            <button
              onClick={handleBulkReject}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-full text-sm"
              disabled={selectedProviders.length === 0}
            >
              Reject
            </button>
          </div>
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