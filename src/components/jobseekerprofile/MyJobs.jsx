import React, { useState, useEffect } from "react";
import ProfileLayout from "../../Layout/ProfileLayout";
import MyJobsSkel from "../skeleton/jobseeker/MyJobsSkel";

const MyJobs = () => {
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [jobApplications, setJobApplications] = useState([
    {
      title: "Front End Web Developer",
      company: "Walsis eConnect India Private Limited",
      location: "Patna, Bihar",
      appliedDate: "27 Mar",
      status: "Not selected by employer",
      closed: true,
    },
    {
      title: "MERN Stack Developer",
      company: "Codequery",
      location: "Kankarbagh, Patna, Bihar",
      appliedDate: "27 Mar",
      status: "Applied",
      closed: true,
    },
    {
      title: "ReactJS Developer",
      company: "Declone Labs PVT LTD",
      location: "Surat, Gujarat",
      appliedDate: "28 Feb",
      status: "Applied",
      closed: true,
    },
  ]);

  // Simulate data fetching (replace with actual API call if needed)
  useEffect(() => {
    const fetchJobApplications = async () => {
      // Simulate a delay for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust delay as needed
    };

    fetchJobApplications();
  }, []);

  if (isLoading) {
    return (
      <ProfileLayout>
       <MyJobsSkel/>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">My Jobs</h1>
          <button
            className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
            title="View All Applications"
          >
            View All
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 text-sm text-gray-500 border-b border-gray-300 mb-6">
          <div className="pb-2 cursor-pointer hover:text-gray-800">0 Saved</div>
          <div className="pb-2 text-gray-800 font-medium border-b-2 border-yellow-400">
            99+ Applied
          </div>
          <div className="pb-2 cursor-pointer hover:text-gray-800">0 Interviews</div>
          <div className="pb-2 cursor-pointer hover:text-gray-800">Archived</div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {jobApplications.map((job, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-md shadow-sm border border-gray-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7l9 6 9-6M4 17h16M4 21h16"
                    />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {job.status === "Applied" ? (
                      <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">
                        Applied
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                        {job.status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-400">{job.location}</p>
                  <p className="text-xs text-gray-400 mt-1">Applied on {job.appliedDate}</p>
                </div>
              </div>

              {/* Right side */}
              <div className="mt-4 sm:mt-0 sm:text-right">
                <button
                  className="text-sm bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-500 transition"
                  title="Update Status"
                >
                  Update status
                </button>
                {job.closed && (
                  <p className="text-sm mt-2 bg-gray-100 px-2 py-1 inline-flex items-center rounded text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-1 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"
                      />
                    </svg>
                    Job closed or expired
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default MyJobs;