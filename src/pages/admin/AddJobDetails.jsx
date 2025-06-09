// components/admin/AddJobDetails.jsx
import { useState, useEffect } from "react";
import Topbar from "../../components/admin/Topbar";
import { toast } from "react-toastify";
 
import { useNavigate } from "react-router-dom";
import InputField from "../../components/common/admin/InputField";
import SelectField from "../../components/common/admin/SelectField";
import { handleFormChange, validateForm, submitForm, resetForm } from "../../utils/form";
import { fetchData } from "../../utils/api";

const baseUrl = import.meta.env.VITE_APP_URL;

const AddJobDetails = () => {
  const initialFormData = {
    title: "",
    workMode: "",
    jobType: "",
    description: "",
    branchId: "", // To store the selected branch
  };
  const [formData, setFormData] = useState(initialFormData); 
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Fetch branches for the branch dropdown
  

  // Define validation schema
  const validationSchema = {
    requiredFields: ["title", "workMode", "jobType", "description", "branchId"],
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
    branchId: (value) =>
      !branchOptions.some((option) => option.value === value)
        ? "Please select a valid branch"
        : null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form using validateForm function
    const errors = validateForm(formData, validationSchema);

    if (errors.length > 0) {
      toast.error(errors[0], {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Retrieve authToken from localStorage
    const authToken = JSON.parse(localStorage.getItem("authToken") || "{}");
    const orgId = authToken.orgId;

    if (!orgId) {
      toast.error("Organization ID not found. Please set up an organization first.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/org-setup");
      return;
    }

    // Prepare payload with orgId
    const payload = {
      ...formData,
      orgId,
    };

    // Submit form using submitForm function
    try {
      await submitForm({
        url: `${baseUrl}/job/create-job`,
        payload,
        setLoading,
        navigate,
        successMessage: "Job created successfully!",
        successRedirect: "/dashboard/manage-jobs/list",
        resetForm: () => resetForm(setFormData, initialFormData),
      });
    } catch (error) {
      // Error is already handled by submitForm via toast.error
      return;
    }
  };


   useEffect(() => {
      const authToken = JSON.parse(
        localStorage.getItem("authToken") || "{}"
      );
      const orgId = authToken.orgId; // Assuming userId is orgId; adjust if different
      fetchData(
        `${baseUrl}/branch/get-branch-by-org-id/${orgId}`,
        setBranches,
        setLoading,
        setError
      );
    }, []);
  
    // Map branches to SelectField options format
    const branchOptions = branches.map((branch) => ({
      value: branch._id,
      label: branch.branchName,
    }));

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Job Type"
              name="jobType"
              value={formData.jobType}
              onChange={(e) => handleFormChange(e, setFormData)}
              options={jobTypeOptions}
              placeholder="Select Job Type"
            />
            <SelectField
              label="Branch"
              name="branchId"
              value={formData.branchId}
              onChange={(e) => handleFormChange(e, setFormData)}
              options={branchOptions}
              placeholder="Select Branch"
            />
          </div>
          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Job Description"
            type="textarea" // Assuming InputField supports textarea
          />
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-orange-global hover:bg-orange-600 text-white font-semibold py-2 px-12 rounded-md shadow-md${
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