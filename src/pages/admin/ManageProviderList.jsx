// components/admin/ManageProviderList.jsx
import React, { useState } from "react";
import Topbar from "../../components/admin/Topbar";
import DataTable from "../../components/common/admin/DataTable";

const dummyProviders = [
  {
    _id: "68466bf909acd436587735f1",
    providerName: "Priyanshu",
    jobProviderPic: "https://www.shareicon.net/data/128x128/2016/09/15/829466_man_512x512.png",
    isActive: true,
    isDeleted: false,
    address: "123 Ashta Laxmi Layout, JP Nagar, Bengaluru, Karnataka 560078",
    createdAt: "2025-06-09T10:47:05.571Z",
    updatedAt: "2025-06-09T10:47:05.573Z",
    __v: 0,
  },
  {
    _id: "68466bf909acd436587735f2",
    providerName: "Amit Sharma",
    jobProviderPic: "https://www.shareicon.net/data/128x128/2016/09/15/829466_man_512x512.png",
    isActive: false,
    isDeleted: false,
    address: "456 MG Road, Bengaluru, Karnataka 560001",
    createdAt: "2025-06-09T10:48:00.000Z",
    updatedAt: "2025-06-09T10:48:00.000Z",
    __v: 0,
  },
  {
    _id: "68466bf909acd436587735f3",
    providerName: "Sneha Patel",
    jobProviderPic: "https://www.shareicon.net/data/128x128/2016/09/15/829466_man_512x512.png",
    isActive: true,
    isDeleted: false,
    address: "789 Koramangala, Bengaluru, Karnataka 560034",
    createdAt: "2025-06-09T10:49:00.000Z",
    updatedAt: "2025-06-09T10:49:00.000Z",
    __v: 0,
  },
];

const ManageProviderList = () => {
  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState(dummyProviders);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProviders, setSelectedProviders] = useState([]);

  // Filter providers based on search input
  const filteredProviders = providers.filter((provider) =>
    provider.providerName?.toLowerCase().includes(search.toLowerCase())
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
    { header: "Provider ID", accessor: "_id" },
    {
      header: "Provider Name",
      render: (provider) => (
        <div className="flex items-center">
          <img
            src={provider.jobProviderPic}
            alt={provider.providerName}
            className="w-8 h-8 rounded-full mr-2"
          />
          {provider.providerName}
        </div>
      ),
    },
    { header: "Address", accessor: "address" },
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

  const handleDelete = (provider) => {
    if (window.confirm(`Are you sure you want to delete ${provider.providerName}?`)) {
      try {
        setProviders(providers.filter((p) => p._id !== provider._id));
        setSelectedProviders(selectedProviders.filter((id) => id !== provider._id));
        console.log("Job provider deleted successfully!");
      } catch (err) {
        console.error("Error deleting provider:", err);
        setError(err.message);
      }
    }
  };

  const handleBulkApprove = () => {
    if (selectedProviders.length === 0) {
      alert("Please select at least one provider to approve.");
      return;
    }
    if (window.confirm(`Are you sure you want to approve ${selectedProviders.length} provider(s)?`)) {
      try {
        setProviders((prev) =>
          prev.map((provider) =>
            selectedProviders.includes(provider._id)
              ? { ...provider, isActive: true }
              : provider
          )
        );
        setSelectedProviders([]);
        console.log("Selected providers approved successfully!");
      } catch (err) {
        console.error("Error approving providers:", err);
        setError(err.message);
      }
    }
  };

  const handleBulkReject = () => {
    if (selectedProviders.length === 0) {
      alert("Please select at least one provider to reject.");
      return;
    }
    if (window.confirm(`Are you sure you want to reject ${selectedProviders.length} provider(s)?`)) {
      try {
        setProviders((prev) =>
          prev.map((provider) =>
            selectedProviders.includes(provider._id)
              ? { ...provider, isActive: false }
              : provider
          )
        );
        setSelectedProviders([]);
        console.log("Selected providers rejected successfully!");
      } catch (err) {
        console.error("Error rejecting providers:", err);
        setError(err.message);
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