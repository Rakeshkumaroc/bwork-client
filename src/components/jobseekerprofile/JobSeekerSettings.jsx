import React from "react";
import ProfileLayout from "../../Layout/ProfileLayout";

const JobSeekerSettings = () => {
  return (
    <ProfileLayout>
      <div className="bg-cream p-6 rounded-xl shadow border">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>

        {/* Account Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Full Name</span>
              <input
                type="text"
                defaultValue="Rakesh Kumar"
                className="mt-2 sm:mt-0 border px-3 py-1 rounded w-full sm:w-1/2"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Email</span>
              <input
                type="email"
                defaultValue="you@example.com"
                className="mt-2 sm:mt-0 border px-3 py-1 rounded w-full sm:w-1/2"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Password</span>
              <button className="mt-2 sm:mt-0 text-sm text-blue-600 hover:underline">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default JobSeekerSettings;
