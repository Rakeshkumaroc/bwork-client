import { useState } from "react";
import Topbar from "../../components/admin/Topbar";
import { Link } from "react-router-dom";

const applicants = [
  {
    name: "Ayesha Akbar",
    resume:
      "https://drive.google.com/drive/folders/1QmR61h1A7nOVv7HFswfWGCs-itCHWGcn",
    experience: "2+ Years",
    role: "UI/UX Designer",
    profile: "/applicants/ayesha-akbar",
  },
  {
    name: "John Doe",
    resume: "https://drive.google.com/drive/folders/example",
    experience: "3+ Years",
    role: "UI/UX Designer",
    profile: "/applicants/john-doe",
  },
  {
    name: "Rakesh Kumar",
    resume: "https://drive.google.com/drive/folders/example",
    experience: "1+ Years",
    role: "Full stack Developer",
    profile: "/applicants/john-doe",
  },
];

const ManageApplicants = () => {
  const [selectedApplicants, setSelectedApplicants] = useState(new Set());

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
    <div className="flex-1 bg-light-cream pl-4 sm:pl-8 pr-4 py-6 overflow-auto min-h-screen">
      <Topbar />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-black">Manage Applicants</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={handleSelectAll}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-full text-lg sm:text-sm flex items-center justify-center transition-colors duration-200 shadow-md"
          >
            <span className="mr-2">+</span>
            <span className="hidden sm:block">
              {selectedApplicants.size === applicants.length ? "Deselect All" : "Select All"}
            </span>
          </button>
          <button
            onClick={handleBulkApproved}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-full text-lg sm:text-sm flex items-center justify-center transition-colors duration-200 shadow-md"
          >
            <span className="mr-2">+</span>
            <span className="hidden sm:block">Approved</span>
          </button>
          <button
            onClick={handleBulkReject}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-full text-lg sm:text-sm flex items-center justify-center transition-colors duration-200 shadow-md"
          >
            <span className="mr-2">+</span>
            <span className="hidden sm:block">Reject</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {applicants.map((applicant, index) => (
          <div
            key={index}
            className="bg-cream rounded-xl p-4 flex flex-col space-y-4 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full border-2 border-orange-200 flex items-center justify-center">
                  <img
                    src={`https://i.pravatar.cc/40?img=${index + 1}`}
                    alt={applicant.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-orange-500 font-semibold">{applicant.name}</p>
                  <p className="text-sm text-orange-500 hover:text-orange-600 transition-colors">
                    <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  </p>
                  <p className="text-sm text-gray-500">Experience: {applicant.experience}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={selectedApplicants.has(index)}
                onChange={() => handleCheckboxChange(index)}
                className="h-5 w-5 text-orange-500 border-orange-200 rounded focus:ring-orange-500"
              />
            </div>
            <span className="bg-light-cream text-orange-500 text-xs px-2 py-1 rounded-full">
              {applicant.role}
            </span>
            <div className="flex flex-wrap gap-2">
              <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded-md font-semibold transition-colors duration-200">
                 APPROVED
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-md font-semibold transition-colors duration-200">
                REJECT
              </button>
              <Link
                to={'./view-profile'}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1 rounded-md font-semibold transition-colors duration-200"
              >
                VIEW PROFILE
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageApplicants;