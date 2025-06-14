import { useState, useEffect } from "react";
import ProfileLayout from "../../Layout/ProfileLayout";
import JobSeekerSettingsSkel from "../skeleton/jobseeker/JobSeekerSettingsSkel";
import { submitForm, updateForm } from "../../utils/form"; // Import updateForm utility
import { fetchData } from "../../utils/api"; // Import fetchData utility for fetching data
import { toast } from "react-toastify"; // Import toast for notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const baseUrl = import.meta.env.VITE_APP_URL;

const JobSeekerSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Initialize settingsData with empty strings, as it will be fetched from the API
  const [settingsData, setSettingsData] = useState({
    userName: "",
    phone: "",
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState(null); // State for displaying password change errors

  const navigate = useNavigate(); // Initialize navigate hook

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const jobSeekerId = userData._id || null; // Get jobSeekerId from local storage

  // --- Fetch User Settings Data on Component Mount ---
  useEffect(() => {
    const getJobSeekerBasicDetails = async () => {
      if (!jobSeekerId) {
        toast.error("Invalid user data. Please log in again.");
        navigate("/login"); // Redirect to login if user ID is not found
        setIsLoading(false);
        return;
      }

      setError(null); // Clear previous errors
      setIsLoading(true); // Set loading state before fetching

      try {
        // Use the fetchData utility to get basic job seeker details
        await fetchData(
          `${baseUrl}/job-seekers-basic-details/get-job-seeker-basic-by-id/${jobSeekerId}`, // Your API endpoint
          // fetchData expects a setter function for data, and handles loading/error itself.
          // Assuming the fetched data directly contains userName and phone fields.
          // If the API response structure is different (e.g., { resData: { userName, phone } }),
          // you might need a small adapter function here:
          (data) => {
            if (data) {
              setSettingsData({
                userName: data.userName || "", // Assuming 'name' field from API for userName
                phone: data.phone || "",
              });
            } else {
              setSettingsData({ userName: "", phone: "" }); // Reset if no data
            }
          },
          setIsLoading, // Pass setIsLoading to manage loading state
          setError // Pass setError to handle errors
        );
      } catch (err) {
        // fetchData already handles toast for fetch errors, but catching here for consistency
        console.error("Failed to fetch job seeker basic details:", err);
      } finally {
        setIsLoading(false); // Ensure loading is off even if fetchData fails
      }
    };

    getJobSeekerBasicDetails();
  }, [jobSeekerId, navigate]); // Dependencies on jobSeekerId and navigate

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // This part of the form is for general account settings (like name, phone number)
    // You would add an API call here to update these fields if they were editable.
    // For now, it's just a console log as per previous version's functionality.
    console.log("Attempting to save general changes:", settingsData);
    // If you add actual editable fields for settingsData, you would send an update API call here.
    toast.success("General settings saved (display only in this example)."); // Update toast to success
  };

  const handleChangePasswordClick = () => {
    setShowPasswordForm((prev) => !prev); // Toggle visibility
    // Reset password form data and errors only when opening it
    if (!showPasswordForm) {
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setError(null); // Clear any previous password errors when opening the form
    }
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // Clear error on input change
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    console.log("jobSeekerId", jobSeekerId);

    if (!jobSeekerId) {
      const msg = "User ID not found. Please log in again.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
      const msg = "New password and confirm password do not match.";
      setError(msg);
      toast.error(msg);
      return;
    }

    // You might add stronger password validation here (e.g., minimum length, special characters)
    if (passwordFormData.newPassword.length < 6) {
      const msg = "New password must be at least 6 characters long.";
      setError(msg);
      toast.error(msg);
      return;
    }

    const payload = {
      jobSeekerId: jobSeekerId, // Include jobSeekerId
      oldPassword: passwordFormData.currentPassword,
      newPassword: passwordFormData.newPassword,
    };

    try {
      // *** IMPORTANT FIX: Changed submitForm to updateForm for PUT request ***
      await updateForm({
        url: `${baseUrl}/job-seekers/job-seeker-update-password`, // Your password update API endpoint
        payload: payload,
        setIsLoading, // Pass setIsLoading to handle loading state
        successMessage: "Password updated successfully!",
        resetForm: () =>
          setPasswordFormData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }),
      });
      setShowPasswordForm(false); // Close the form on success
    } catch (err) {
      const msg = err.message || "Failed to update password. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordForm(false);
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setError(null); // Clear error on cancel
  };

  if (isLoading) {
    return (
      <ProfileLayout>
        <JobSeekerSettingsSkel />
      </ProfileLayout>
    );
  }

  return (
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
              {/* Display fetched userName */}
              <p className="mt-2 sm:mt-0 border border-gray-300 px-3 py-1 rounded w-full sm:w-1/2 focus:border-yellow-400 outline-none">
                {settingsData.userName}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="text-gray-600">Phone Number</span>
              {/* Display fetched phone */}
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
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}{" "}
                {/* Display error here */}
                <div className="space-y-4">
                  <form onSubmit={handlePasswordSubmit}>
                    {" "}
                    {/* This nested form handles password submission */}
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
                    <div className="flex justify-end space-x-3 mt-4">
                      <button
                        type="submit"
                        onClick={handlePasswordCancel}
                        className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default JobSeekerSettings;
