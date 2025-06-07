import React from "react";
import ProfileLayout from "../../Layout/ProfileLayout";

const jobApplications = [
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
];

const MyJobs = () => {
  return (
    <ProfileLayout>
        <div className="bg-cream p-6 rounded-xl shadow border">
        <h1 className="text-2xl font-semibold mb-6">My jobs</h1>

        {/* Tabs */}
        <div className="flex space-x-6 text-sm text-gray-500 border-b mb-6">
          <div className="pb-2">0 Saved</div>
          <div className="pb-2 text-black font-medium border-b-2 border-black">
            99+ Applied
          </div>
          <div className="pb-2">0 Interviews</div>
          <div className="pb-2">Archived</div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {jobApplications.map((job, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-light-cream p-4 rounded border shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
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
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                        Applied
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                        {job.status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applied on {job.appliedDate}
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="mt-4 sm:mt-0 sm:text-right">
                <button className="text-sm text-blue-600 border border-blue-500 px-3 py-1 rounded hover:bg-blue-50">
                  Update status
                </button>
                {job.closed && (
                  <p className="text-sm mt-2 bg-gray-100 px-2 py-1 inline-flex items-center rounded text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-1"
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
                    Job closed or expired on Indeed
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
