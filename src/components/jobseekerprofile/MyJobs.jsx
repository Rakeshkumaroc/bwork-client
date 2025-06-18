import { useState, useEffect } from "react";
import ProfileLayout from "../../Layout/ProfileLayout";
import MyJobsSkel from "../skeleton/jobseeker/MyJobsSkel";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL || "http://localhost:5000";

const MyJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState([]);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const jobSeekerId = userData._id || null;

  useEffect(() => {
    const getJobApplications = async () => {
      if (!jobSeekerId) {
        setError("User ID not found. Please log in again.");
        setIsLoading(false);
        toast.error("User ID not found. Please log in again.");
        return;
      }

      setError(null);

      try {
        const url = `${baseUrl}/job-applications/job-applications/${jobSeekerId}`;
        console.log("Fetching job applications from:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", 
          },
        });
        
        
        if (!response.ok) {
          throw new Error(`Failed to fetch job applications: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('response',response);
        console.log("Received data:", data);

        // Extract applications from ApiResponse
        const applications = data.resData?.applications || [];

        // Map backend data to frontend format
        const formattedApplications = applications.map((app) => ({
          title: app.jobTitle,
          company: app.company || "Unknown Company",
          location: app.location || "Unknown Location",
          appliedDate: new Date(app.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          }),
          status:
            app.status === "Rejected"
              ? "Not selected by employer"
              : app.status === "Pending"
              ? "Applied"
              : app.status,
          closed: true, // Assume true or derive from job post
        }));

        setJobApplications(formattedApplications);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        console.error("Error fetching job applications:", err);
        toast.error(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    getJobApplications();
  }, [jobSeekerId]);

  if (isLoading) {
    return (
      <ProfileLayout>
        <MyJobsSkel />
      </ProfileLayout>
    );
  }

  if (error) {
    return (
      <ProfileLayout>
        <div className="bg-white rounded-md shadow-md p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Jobs</h1>
          <p className="text-red-600 text-sm mt-4">{error}</p>
        </div>
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
            {jobApplications.length} Applied
          </div>
          <div className="pb-2 cursor-pointer hover:text-gray-800">0 Interviews</div>
          <div className="pb-2 cursor-pointer hover:text-gray-800">Archived</div>
        </div>

        {/* Job Cards */}
        {jobApplications.length > 0 ? (
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

                 
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-sm">No job applications found.</p>
        )}
      </div>
    </ProfileLayout>
  );
};

export default MyJobs;