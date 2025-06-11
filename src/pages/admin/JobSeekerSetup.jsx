// src/JobSeekerSetup.jsx
import { useState, useEffect } from "react";
import Input from "../../components/common/Input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleFormChange, validateForm, submitForm } from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const JobSeekerSetup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    maritalStatus: "",
    dob: "",
    address: "",
    userId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Define validation schema
  const validationSchema = {
    requiredFields: [
      "full_name",
      "gender",
      "maritalStatus",
      "dob",
      "address",
      "userId",
    ],
    full_name: (value) =>
      value.length < 3 ? "Full name must be at least 3 characters long" : null,
    gender: (value) =>
      !["male", "female", "other"].includes(value.toLowerCase())
        ? "Please select a valid gender"
        : null,
    maritalStatus: (value) =>
      !["Single / unmarried", "Married", "Divorced", "Widowed"].includes(value)
        ? "Please select a valid marital status"
        : null,
    dob: (value) => {
      const dobDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dobDate.getDate())
      ) {
        return age - 1;
      }
      return age < 18 ? "You must be at least 18 years old" : null;
    },
    address: (value) =>
      value.length < 5 ? "Address must be at least 5 characters long" : null,
    userId: (value) => (!value ? "User ID is required" : null),
  };

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
      const { userId } = JSON.parse(authToken);
      setFormData((prev) => ({
        ...prev,
        userId: userId || "",
      }));
    } catch (error) {
      console.error("Failed to parse authToken:", error);
      toast.error("Invalid authentication data. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/profile");

    // Validate form using validateForm function
    const errors = validateForm(formData, validationSchema);

    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    // Prepare payload
    const payload = {
      full_name: formData.full_name,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      dob: formData.dob,
      address: formData.address,
      userId: formData.userId,
    };

    // Submit form using submitForm function
    try {
      const data = await submitForm({
        url: `${baseUrl}/job-seekers/create-job-seeker-details`,
        payload,
        setIsLoading,
        navigate,
        successMessage: "Job seeker profile created successfully!",
        successRedirect: "/dashboard",
        formDataFields: [],
        localStorageKey: "jobSeekerData",
        localStorageData: payload,
      });
      console.log(data);

      localStorage.setItem(
        "jobSeekerData",
        JSON.stringify(data.resData.jobSeeker)
      );
    } catch (error) {
      // Error is already handled by submitForm via toast.error
      return;
    }
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
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <Input
              id="full_name"
              placeholder="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={(e) => handleFormChange(e, setFormData)}
              required
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
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="maritalStatus"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Marital Status
            </label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={(e) => handleFormChange(e, setFormData)}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select Marital Status</option>
              <option value="Single / unmarried">Single / Unmarried</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
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
              required
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
              required
            />
          </div>
          <div className="mt-10 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-orange-global text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default JobSeekerSetup;
