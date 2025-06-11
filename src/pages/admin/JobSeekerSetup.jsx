// src/JobSeekerSetup.jsx
import { useState, useEffect } from "react";
import Input from "../../components/common/Input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleFormChange, validateForm, submitForm } from "../../utils/form";
const baseUrl = import.meta.env.VITE_APP_URL;

const JobSeekerSetup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userProfilePic: "",
    gender: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    jobSeekerId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve authToken from localStorage
    const authToken = localStorage.getItem("userData");
    if (!authToken) {
      toast.error("You are not logged in. Please log in to continue.");
      navigate("/login");
      return;
    }

    // Parse authToken and populate formData
    try {
      const { _id, phone } = JSON.parse(authToken);
      setFormData((prev) => ({
        ...prev,
        jobSeekerId: _id || "",
        phone: phone || "",
      }));
    } catch (error) {
      console.error("Failed to parse authToken:", error);
      toast.error("Invalid authentication data. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload
    const payload = {
      userName: formData.userName,
      userProfilePic: formData.userProfilePic,
      gender: formData.gender,
      dob: formData.dob,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      jobSeekerId: formData.jobSeekerId,
    };
    console.log("payload", payload);

    // Submit form using submitForm function
    try {
      const data = await submitForm({
        url: `${baseUrl}/job-seekers-basic-details/create-job-seeker-basic-details`,
        payload,
        setIsLoading,
        navigate,
        successMessage: "Job seeker profile created successfully!",
        successRedirect: "/profile",
      });
      console.log(data);
    } catch (error) {
      // Error is already handled by submitForm via toast.error
      console.log("error", error);
      return;
    }
  };

  const handleSkillClick = () => {
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 bg-cream min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-global mb-8">
        Job Seeker Setup
      </h2>

      <div className="gap-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <Input
              id="userName"
              placeholder="Username"
              name="userName"
              value={formData.userName}
              onChange={(e) => handleFormChange(e, setFormData)}
            />
          </div>
          <div>
            <label
              htmlFor="userProfilePic"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Profile Picture URL
            </label>
            <Input
              id="userProfilePic"
              placeholder="Profile Picture URL"
              name="userProfilePic"
              value={formData.userProfilePic}
              onChange={(e) => handleFormChange(e, setFormData)}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={(e) => handleFormChange(e, setFormData)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <Input
              id="dob"
              type="date"
              placeholder="Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={(e) => handleFormChange(e, setFormData)}
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <Input
              id="address"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={(e) => handleFormChange(e, setFormData)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) => handleFormChange(e, setFormData)}
            />
          </div>
          <div className="mt-10 text-center flex justify-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-orange-global text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleSkillClick}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-600"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default JobSeekerSetup;
