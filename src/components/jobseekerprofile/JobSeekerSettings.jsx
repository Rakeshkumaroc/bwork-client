import { useState, useEffect } from "react";
import ProfileLayout from "../../Layout/ProfileLayout";
import JobSeekerSettingsSkel from "../skeleton/jobseeker/JobSeekerSettingsSkel";

const JobSeekerSettings = () => {
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [settingsData, setSettingsData] = useState({
    userName: "Rakesh Kumar",
    phone: "9876543210", // Replaced email with phone number
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
    // You might add a success message here if there were actual editable fields.
  };

  const handleChangePasswordClick = () => {
    setShowPasswordForm((prev) => !prev); // Toggle visibility
    // Reset password form data only when opening it
    if (!showPasswordForm) {
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
      console.error("New password and confirm password do not match.");
      // In a real app, you'd show a user-friendly error message (e.g., a toast or custom modal)
      return;
    }
    // Add logic to securely update password (e.g., API call)
    console.log("Attempting to change password:", passwordFormData);
    // Simulate success
    // Using alert for demonstration. In a real app, replace with a custom modal or toast.
    alert("Password change initiated!");
    setShowPasswordForm(false);
  };

  const handlePasswordCancel = () => {
    setShowPasswordForm(false);
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  if (isLoading) {
    return (
      <ProfileLayout>
        <JobSeekerSettingsSkel />
      </ProfileLayout>
    );
  }

  return (
    // Removed ProfileLayout wrapper for self-contained example
    <ProfileLayout>
      <div className="bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>

        {/* Account Settings */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Account Settings
          </h2>

          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Full Name</span>

              <p className="mt-2 sm:mt-0 border border-gray-300 px-3 py-1 rounded w-full sm:w-1/2 focus:border-yellow-400 outline-none">
                {settingsData.userName}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Phone Number</span>
             
               <p className="mt-2 sm:mt-0 border border-gray-300 px-3 py-1 rounded w-full sm:w-1/2 focus:border-yellow-400 outline-none">
                {settingsData.phone}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Password</span>
              <button
                type="button"
                className="mt-2 sm:mt-0 text-sm text-yellow-400 hover:text-yellow-600"
                title="Change Password"
                onClick={handleChangePasswordClick}
              >
                Change Password
              </button>
            </div>

            {/* Password Change Form - Only shown when toggled */}
            {showPasswordForm && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Change Password
                </h3>
                <div className="space-y-4">
                  {" "}
                  {/* Using div instead of form for nested structure if main form submits all */}
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordFormData.currentPassword}
                      onChange={handlePasswordFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordFormData.newPassword}
                      onChange={handlePasswordFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmNewPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={passwordFormData.confirmNewPassword}
                      onChange={handlePasswordFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handlePasswordCancel}
                      className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit" // This button now submits the password form, not the main form
                      onClick={handlePasswordSubmit} // Explicitly call password submit handler
                      className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
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
