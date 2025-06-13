import React, { useState, useEffect } from "react";
import ProfileLayout from "../../Layout/ProfileLayout";
import JobSeekerSettingsSkel from "../skeleton/jobseeker/JobSeekerSettingsSkel";

const JobSeekerSettings = () => {
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [settingsData, setSettingsData] = useState({
    userName: "Rakesh Kumar",
    phone: "9876543210", // Replaced email with phone number
  });

  // Simulate data fetching (replace with actual API call if needed)
  useEffect(() => {
    const fetchSettingsData = async () => {
      // Simulate a delay for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust delay as needed
    };

    fetchSettingsData();
  }, []);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Add logic to save changes (e.g., API call)
    console.log("Saving changes:", settingsData);
  };

  if (isLoading) {
    return (
      <ProfileLayout>
        <JobSeekerSettingsSkel/>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>

        {/* Account Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Settings</h2>
          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Full Name</span>
              <input
                type="text"
                value={settingsData.userName}
                onChange={(e) =>
                  setSettingsData({ ...settingsData, userName: e.target.value })
                }
                className="mt-2 sm:mt-0 border border-gray-300 px-3 py-1 rounded w-full sm:w-1/2 focus:border-yellow-400 outline-none"
                placeholder="Enter full name"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Phone Number</span>
              <input
                type="tel"
                value={settingsData.phone}
                onChange={(e) =>
                  setSettingsData({ ...settingsData, phone: e.target.value })
                }
                className="mt-2 sm:mt-0 border border-gray-300 px-3 py-1 rounded w-full sm:w-1/2 focus:border-yellow-400 outline-none"
                placeholder="Enter phone number"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Password</span>
              <button
                type="button"
                className="mt-2 sm:mt-0 text-sm text-yellow-400 hover:text-yellow-600"
                title="Change Password"
              >
                Change Password
              </button>
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
              title="Save Changes"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default JobSeekerSettings;