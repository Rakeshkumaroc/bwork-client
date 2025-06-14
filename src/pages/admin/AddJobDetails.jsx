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
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className="  mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {action === "edit" ? "Edit Job Details" : "Add Job Details"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Job Title"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <SelectField
            label="Work Mode"
            name="workMode"
            value={formData.workMode}
            onChange={(e) => handleFormChange(e, setFormData)}
            options={workModeOptions}
            placeholder="Select Work Mode"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Job Type"
            name="jobType"
            value={formData.jobType}
            onChange={(e) => handleFormChange(e, setFormData)}
            options={jobTypeOptions}
            placeholder="Select Job Type"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <InputField
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Salary (e.g., 50000)"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Years of Experience"
            name="yearsOfExperience"
            type="number"
            value={formData.yearsOfExperience}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Years of Experience"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Location (e.g., New York, NY)"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
        </div>
        <InputField
          label="Description"
          name="description"
          value={formData.description}
          onChange={(e) => handleFormChange(e, setFormData)}
          placeholder="Enter Job Description"
          type="textarea"
          className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
        />
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-yellow-400 text-black font-semibold py-2 px-8 rounded-md hover:bg-yellow-500 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Submit Job Details"
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