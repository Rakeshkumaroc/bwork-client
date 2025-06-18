import { useEffect, useState } from "react";
import Topbar from "../../components/admin/Topbar"; 

const ManageApplicants = () => {
  const [selectedApplicants, setSelectedApplicants] = useState(new Set());
  const [applicants, setApplicants] = useState([]);
  useEffect(() => {
    const fetchApplicants = async () => {
      const authData = JSON.parse(localStorage.getItem("authToken"));
      const jobProviderId = authData?.userId || null;

      try {
        if (!jobProviderId) {
          console.warn("User ID not found in localStorage");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/v1/job-applications/get-all-applications-by-job-provider-id/${jobProviderId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }

        const result = await response.json();
        console.log(result, "jjjjjjjjjjj");
        setApplicants(result.resData); // Adjust if API structure differs
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  // Handle individual checkbox toggle
  const handleCheckboxChange = (index) => {
    setSelectedApplicants((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Handle Select All / Deselect All
  const handleSelectAll = () => {
    if (selectedApplicants.size === applicants.length) {
      setSelectedApplicants(new Set());
    } else {
      setSelectedApplicants(new Set(applicants.map((_, index) => index)));
    }
  };

  // Handle Bulk Approved
  const handleBulkApproved = () => {
    if (selectedApplicants.size === 0) {
      console.log("No applicants selected for bulk Approved.");
      return;
    }
    const selectedNames = Array.from(selectedApplicants).map(
      (index) => applicants[index].name
    );
    console.log("Approved:", selectedNames);
    // Optionally clear selection after action
    setSelectedApplicants(new Set());
  };

  // Handle Bulk Reject
  const handleBulkReject = () => {
    if (selectedApplicants.size === 0) {
      console.log("No applicants selected for bulk reject.");
      return;
    }
    const selectedNames = Array.from(selectedApplicants).map(
      (index) => applicants[index].name
    );
    console.log("Reject:", selectedNames);
    // Optionally clear selection after action
    setSelectedApplicants(new Set());
  };

  return (
    <div className="flex-1 bg-gray-100 pl-4 sm:pl-6 pr-4 py-6 overflow-auto min-h-screen">
      <Topbar />
      <div className="max-w-7xl mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Manage Applicants
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={handleSelectAll}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md text-sm flex items-center justify-center transition-colors duration-200"
              title={
                selectedApplicants.size === applicants.length
                  ? "Deselect All"
                  : "Select All"
              }
            >
              <span className="mr-2">+</span>
              <span>
                {selectedApplicants.size === applicants.length
                  ? "Deselect All"
                  : "Select All"}
              </span>
            </button>
            <button
              onClick={handleBulkApproved}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md text-sm flex items-center justify-center transition-colors duration-200"
              title="Approve Selected"
            >
              <span className="mr-2">+</span>
              <span>Approved</span>
            </button>
            <button
              onClick={handleBulkReject}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md text-sm flex items-center justify-center transition-colors duration-200"
              title="Reject Selected"
            >
              <span className="mr-2">+</span>
              <span>Reject</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applicants.map((applicant, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-4 flex flex-col space-y-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <img
                      src={applicant.profileImage}
                      alt={`${applicant.fullName}'s profile`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold">
                      {applicant.fullName}
                    </p>
                    <p className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                      <a
                        href={applicant.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">
                      Experience: {applicant.experience}
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedApplicants.has(index)}
                  onChange={() => handleCheckboxChange(index)}
                  className="h-5 w-5 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                  aria-label={`Select ${applicant.fullName}`}
                />
              </div>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                {applicant.jobTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded-md font-semibold transition-colors"
                  title="Approve Applicant"
                >
                  APPROVED
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded-md font-semibold transition-colors"
                  title="Reject Applicant"
                >
                  REJECT
                </button>

                <button
                  onClick={() =>
                    navigate("./view-profile", { state: { applicant } })
                  }
                  className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-4 py-1 rounded-md font-semibold transition-colors"
                  title="View Applicant Profile"
                >
                  VIEW PROFILE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageApplicants;
