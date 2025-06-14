// components/admin/AddJobDetails.jsx
import { useEffect, useState } from "react";
import Topbar from "../../components/admin/Topbar";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/common/admin/InputField";
import SelectField from "../../components/common/admin/SelectField";
import {
  handleFormChange,
  validateForm,
  submitForm,
  resetForm,
  updateForm,
} from "../../utils/form";
const baseUrl = import.meta.env.VITE_APP_URL;

const AddJobDetails = ({ action }) => {
  const initialFormData = {
    title: "",
    workMode: "",
    jobType: "",
    description: "",
    salary: "",
    yearsOfExperience: "",
    location: "",
  };
  const { id } = useParams();

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
    requiredFields: [
      "title",
      "workMode",
      "jobType",
      "description",
      "salary",
      "yearsOfExperience",
      "location",
    ],
    title: (value) =>
      value.trim().length < 3
        ? "Title must be at least 3 characters long"
        : null,
    workMode: (value) =>
      !workModeOptions.some((option) => option.value === value)
        ? "Please select a valid work mode"
        : null,
    jobType: (value) =>
      !jobTypeOptions.some((option) => option.value === value)
        ? "Please select a valid job type"
        : null,
    description: (value) =>
      value.trim().length < 10
        ? "Description must be at least 10 characters long"
        : null,
    salary: (value) => {
      const num = parseFloat(value);
      return isNaN(num) || num <= 0 ? "Salary must be a positive number" : null;
    },
    yearsOfExperience: (value) => {
      const num = parseInt(value);
      return isNaN(num) || num < 0
        ? "Years of experience must be a non-negative number"
        : null;
    },
    location: (value) =>
      value.trim().length < 2
        ? "Location must be at least 2 characters long"
        : null,
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
    const userId = authToken.userId;

    if (!userId) {
      toast.error("User or Organization ID not found. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/employers-login");
      return;
    }

    // Prepare payload
    const payload = { ...formData, userId };

    // Handle create or update
    const apiUrl =
      action === "edit"
        ? `${baseUrl}/job-posts/update-job-post/${id}`
        : `${baseUrl}/job-posts/create-job-post`;

    try {
      if (action === "edit") {
        await updateForm({
          url: apiUrl,
          payload,
          setIsLoading: setLoading,
          navigate,
          successMessage: "Job updated successfully!",
          successRedirect: "/dashboard/manage-job/list",
          resetForm: () => resetForm(setFormData, initialFormData),
        });
      } else {
        await submitForm({
          url: apiUrl,
          payload,
          setIsLoading: setLoading,
          navigate,
          successMessage: "Job created successfully!",
          successRedirect: "/dashboard/manage-job/list",
          resetForm: () => resetForm(setFormData, initialFormData),
          formDataFields: [], // No file fields
        });
      }
    } catch (error) {
      // Errors handled by submitForm/updateForm via toast.error
      console.error("Submission Error:", error);
    }
  };

  const getData = async () => {
    if (!id) {
      toast.error("Invalid job ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/job-posts/get-job-post-by-id/${id}`);
      const data = await res.json();
      console.log("Fetched job data:", data);
      if (res.ok && data.resData) {
        setFormData({
          title: data.resData.title || "",
          workMode: data.resData.workMode || "",
          jobType: data.resData.jobType || "",
          description: data.resData.description || "",
          salary: data.resData.salary || "",
          yearsOfExperience: data.resData.yearsOfExperience || "",
          location: data.resData.location || "",
        });
      } else {
        throw new Error(data.message || "Failed to fetch job data.");
      }
    } catch (err) {
      console.error("Error fetching job:", err);
      toast.error(err.message || "Error fetching job data.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (action === "edit" && id) {
      getData();
    }
  }, [action, id]);

  return (
    <div className="min-h-screen bg-light-cream p-8">
      <Topbar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          {action === "edit" ? "Edit Job Details" : "Add Job Details"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Job Type"
              name="jobType"
              value={formData.jobType}
              onChange={(e) => handleFormChange(e, setFormData)}
              options={jobTypeOptions}
              placeholder="Select Job Type"
            />
            <InputField
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={(e) => handleFormChange(e, setFormData)}
              placeholder="Enter Salary (e.g., 50000)"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Years of Experience"
              name="yearsOfExperience"
              type="number"
              value={formData.yearsOfExperience}
              onChange={(e) => handleFormChange(e, setFormData)}
              placeholder="Enter Years of Experience"
            />
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={(e) => handleFormChange(e, setFormData)}
              placeholder="Enter Location (e.g., New York, NY)"
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
              className={`bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-12 rounded-md shadow-md ${
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