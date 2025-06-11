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
    requiredFields: ["title", "workMode", "jobType", "description"],
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
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate form
  //   const errors = validateForm(formData, validationSchema);
  //   if (errors.length > 0) {
  //     toast.error(errors[0], { position: "top-right", autoClose: 3000 });
  //     return;
  //   }

  //   // Retrieve authToken from localStorage
  //   const authToken = JSON.parse(localStorage.getItem("authToken") || "{}");
  //   console.log("Auth Token:", authToken); // Debug: Check token structure
  //   const userId = authToken.userId; // Adjust based on actual token structure

  //   if (!userId) {
  //     toast.error("User ID not found. Please log in again.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     navigate("/employers-login");
  //     return;
  //   }

  //   // Prepare payload
  //   const payload = {
  //     ...formData,
  //     userId,
  //   };
  //   console.log("Submitting Payload:", payload); // Debug: Check payload

  //   // Submit form
  //   try {
  //     await submitForm({
  //       url: `${baseUrl}/job-posts/create-job-post`,
  //       payload,
  //       setIsLoading: setLoading, // Match submitForm's expected prop
  //       navigate,
  //       successMessage: "Job created successfully!",
  //       successRedirect: "/dashboard/manage-job/list",
  //       resetForm: () => resetForm(setFormData, initialFormData),
  //       formDataFields: [], // No file fields
  //     });
  //   } catch (error) {
  //     console.error("Submission Error:", error); // Debug: Log error details
  //     // Error is already handled by submitForm via toast.error
  //   }
  // };




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
      toast.error("Invalid user ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/job-posts/get-job-post-by-id/${id}`);
      const data = await res.json();
      console.log("Fetched user data:", data);
      if (res.ok && data.resData) {
        // Map userBranchId to branch in formData
        setFormData({
          title: data.resData.title || "",
          workMode: data.resData.workMode || "",
          jobType: data.resData.jobType || "",
          description: data.resData.description || "",
        });
      } else {
        throw new Error(data.message || "Failed to fetch user data.");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      toast.error(err.message || "Error fetching user data.", {
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
