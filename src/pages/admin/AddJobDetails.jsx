// components/admin/AddJobDetails.jsx
import { useState } from "react";
import Topbar from "../../components/admin/Topbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/common/admin/InputField";
import SelectField from "../../components/common/admin/SelectField";
import { handleFormChange, validateForm, submitForm, resetForm } from "../../utils/form";

const AddJobDetails = () => {
  const initialFormData = {
    title: "",
    workMode: "",
    jobType: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Options for Work Mode and Job Type
  const workModeOptions = [
    { value: "Remote", label: "Remote" },
    { value: "On-site", label: "On-site" },
    { value: "Hybrid", label: "Hybrid" },
  ];

  const jobTypeOptions = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Contract", label: "Contract" },
    { value: "Freelance", label: "Freelance" },
    { value: "Internship", label: "Internship" },
  ];

  // Define validation schema
  const validationSchema = {
    requiredFields: ["title", "workMode", "jobType", "description"],
    title: (value) =>
      value.trim().length < 3 ? "Title must be at least 3 characters long" : null,
    workMode: (value) =>
      !workModeOptions.some((option) => option.value === value)
        ? "Please select a valid work mode"
        : null,
    jobType: (value) =>
      !jobTypeOptions.some((option) => option.value === value)
        ? "Please select a valid job type"
        : null,
    description: (value) =>
      value.trim().length < 10 ? "Description must be at least 10 characters long" : null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData, validationSchema);
    if (errors.length > 0) {
      toast.error(errors[0], { position: "top-right", autoClose: 3000 });
      return;
    }

    // Retrieve authToken from localStorage
    const authToken = JSON.parse(localStorage.getItem("authToken") || "{}");
    console.log("Auth Token:", authToken); // Debug: Check token structure
    const userId = authToken.userId; // Adjust based on actual token structure

    if (!userId) {
      toast.error("User ID not found. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/employers-login");
      return;
    }

    // Prepare payload
    const payload = {
      ...formData,
      userId,
    };
    console.log("Submitting Payload:", payload); // Debug: Check payload

    // Submit form
    try {
      await submitForm({
        url: `http://localhost:5000/api/v1/job-posts/create-job-post`,
        payload,
        setIsLoading: setLoading, // Match submitForm's expected prop
        navigate,
        successMessage: "Job created successfully!",
        successRedirect: "/dashboard/manage-job/list",
        resetForm: () => resetForm(setFormData, initialFormData),
        formDataFields: [], // No file fields
      });
    } catch (error) {
      console.error("Submission Error:", error); // Debug: Log error details
      // Error is already handled by submitForm via toast.error
    }
  };

  return (
    <div className="min-h-screen bg-light-cream p-8">
      <Topbar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-orange-global">
          Add Job Details
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-cream p-8 rounded shadow-lg w-full space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Title"
              name="title"
              value={formData.title}
              onChange={(e) => handleFormChange(e, setFormData)}
              placeholder="Enter Job Title"
            />
            <SelectField
              label="Work Mode"
              name="workMode"
              value={formData.workMode}
              onChange={(e) => handleFormChange(e, setFormData)}
              options={workModeOptions}
              placeholder="Select Work Mode"
            />
          </div>
          <div className="grid grid-cols-1   gap-6">
            <SelectField
              label="Job Type"
              name="jobType"
              value={formData.jobType}
              onChange={(e) => handleFormChange(e, setFormData)}
              options={jobTypeOptions}
              placeholder="Select Job Type"
            />
          </div>
          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Job Description"
            type="textarea"
          />
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-orange-global hover:bg-orange-600 text-white font-semibold py-2 px-12 rounded-md shadow-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobDetails;