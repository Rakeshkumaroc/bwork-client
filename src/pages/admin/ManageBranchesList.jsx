import { useState, useEffect } from "react";
import Topbar from "../../components/admin/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/api";
import DataTable from "../../components/common/admin/DataTable"; 
import { deleteForm } from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const ManageBranchesList = () => {
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const organizationData = JSON.parse(
      localStorage.getItem("organizationData") || "{}"
    );
    const orgId = organizationData._id;
    fetchData(
      `${baseUrl}/branch/get-branch-by-org-id/${orgId}`,
      setBranches,
      setLoading,
      setError
    );
  }, []);

  const filteredBranches = branches.filter((branch) =>
    branch.branchName.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { header: "Branch Name", accessor: "branchName" },
    { header: "Location", accessor: "address" },
    { header: "City", accessor: "city" },
    { header: "State", accessor: "state" },
    { header: "Country", accessor: "country" },
  ];

  const handleEdit = (branch) => {
    navigate(`/dashboard/manage-branch/${branch._id}`);
  };

  const handleDelete = async (branch) => {
    if (window.confirm(`Are you sure you want to delete ${branch.branchName}?`)) {
      try {
        await deleteForm({
          url: `${baseUrl}/branch/delete-branch/${branch._id}`,
          setIsLoading: setLoading,
          successMessage: "Branch deleted successfully!",
          onSuccess: async () => {
            const organizationData = JSON.parse(localStorage.getItem("organizationData") || "{}");
            const orgId = organizationData._id;
            await fetchData(
              `${baseUrl}/branch/get-branch-by-org-id/${orgId}`,
              setBranches,
              setLoading,
              setError
            );
          },
        });
      } catch (err) {
        console.error("Error deleting branch:", err);
        setError(err.message);
      }
    }
  };


  return (
    <div className="min-h-screen bg-light-cream p-4 sm:p-8">
      <Topbar />
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="text-xl lg:text-3xl font-bold text-orange-global">
          Manage Branches
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
            to="/dashboard/manage-branch/add"
            className="bg-orange-500 hover:bg-orange-global text-white font-semibold px-4 py-2 rounded-full flex items-center gap-1 text-lg sm:text-sm transition"
          >
            <span>+</span>
            <span className="hidden sm:block">Add Branch</span>
          </Link>
        </div>
      </div>

      <DataTable
        data={filteredBranches}
        columns={columns}
        loading={loading}
        error={error}
        emptyMessage="No branches found"
        basePath="./"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageBranchesList;
