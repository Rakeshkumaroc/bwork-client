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
    const authToken = JSON.parse(
      localStorage.getItem("authToken") || "{}"
    );
    const userId = authToken.userId;
    fetchData(
      `${baseUrl}/branch/get-branch-by-user-id/${userId}`,
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
           
        });
      } catch (err) {
        console.error("Error deleting branch:", err);
        setError(err.message);
      }
    }
  };


  return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Branches</h1>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row w-full sm:w-auto sm:gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md w-full sm:w-64 px-3 py-2 text-sm text-gray-800 placeholder-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
          />
          <Link
            to="/dashboard/manage-branch/add"
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-yellow-500 transition mt-4 sm:mt-0"
            title="Add Branch"
          >
            <span>+</span>
            <span>Add Branch</span>
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
        className="bg-white rounded-md shadow-md"
      />
    </div>
  </div>
);
};

export default ManageBranchesList;
