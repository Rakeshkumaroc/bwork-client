// src/jobProviderSetup.jsx
import { useState, useEffect } from "react";
import Input from "../../components/common/Input";
import TakeImage from "../../components/common/TakeImage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleFormChange, validateForm, submitForm, deleteForm } from "../../utils/form";
import { fetchData } from "../../utils/api";

const baseUrl = import.meta.env.VITE_APP_URL;

const JobProviderSetup = () => {
  const [formData, setFormData] = useState({
    providerName: "",
    userId: null,
    jobProviderPic: null,
    address: "",
    website: "", // Added website field
    description: "", // Added description field
  });
  const [isLoading, setIsLoading] = useState(false);
  const [existingProvider, setExistingProvider] = useState(null);
  const navigate = useNavigate();

  // Define validation schema
  const validationSchema = {
    requiredFields: ["providerName", "userId", "address"],
    providerName: (value) =>
      value.length < 3 ? "Job provider name must be at least 3 characters long" : null,
    userId: (value) =>
      !value ? "User ID is required" : null,
    jobProviderPic: (value) => {
      if (!value) return null; // Optional
      if (!(value instanceof File)) return "Invalid file format";
      if (!["image/png", "image/jpeg"].includes(value.type)) {
        return "Only PNG and JPEG images are allowed";
      }
      if (value.size > 2 * 1024 * 1024) {
        return "Image size exceeds 2MB";
      }
      return null;
    },
      address: (value) =>
      value.length < 5 ? "Address must be at least 5 characters long" : null,
    website: (value) => {
      // Optional field, validate if provided
      if (!value) return null;
      const urlRegex = /^(https?:\/\/)?[\w\-]+(\.[\w\-]+)+[\w\-.,@?^=%&:/~+]*$/;
      return urlRegex.test(value) ? null : "Invalid URL format";
    },
    description: (value) => {
      // Optional field, no validation
      return null;
    },
  };

  useEffect(() => {
    // Retrieve authToken from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      toast.error("You are not logged in. Please log in to continue.");
      navigate("/login");
      return;
    }

    // Parse authToken and populate formData
    try {
      const { userId } = JSON.parse(authToken);
      if (!userId) {
        throw new Error("User ID not found in auth token");
      }
      setFormData((prev) => ({
        ...prev,
        userId,
      }));

      // Fetch existing job provider for the user
      fetchData(
        `${baseUrl}/job-providers/get-all-job-providers`,
        (data) => {
          const provider = data.find((p) => p.userId === userId);
          if (provider) {
            setExistingProvider(provider);
            setFormData((prev) => ({
              ...prev,
              providerName: provider.providerName || "",
              address: provider.address || "",
              website: provider.website || "",
              description: provider.description || "",
              jobProviderPic: provider.jobProviderPic || "",
            }));
          }
        },
        () => {}, // No loading state for this fetch
        (err) => console.error("Failed to fetch job provider:", err)
      );
    } catch (error) {
      console.error("Failed to parse authToken:", error);
      toast.error("Invalid authentication data. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  const handleImageChange = (image) => {
    setFormData((prev) => ({
      ...prev,
      jobProviderPic: image || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData, validationSchema);

    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    // Prepare payload
    const payload = {
      providerName: formData.providerName,
      userId: formData.userId,
      jobProviderPic: formData.jobProviderPic || "",
      address: formData.address,
      website: formData.website || "",
      description: formData.description || "",
    };

    // Submit form
    try {
      const data = await submitForm({
        url: `${baseUrl}/job-providers/create-Job-provider-details`,
        payload,
        setIsLoading,
        navigate,
        successMessage: "Job provider created successfully!",
        successRedirect: "/dashboard",
        formDataFields: formData.jobProviderPic instanceof File ? ["jobProviderPic"] : [],
        localStorageKey: "jobProviderData",
        localStorageData: payload,
      });

      localStorage.setItem("jobProviderData", JSON.stringify(data.jobProvider));
    } catch (error) {
      // Error handled by submitForm via toast.error
      return;
    }
  };

  const handleDelete = async () => {
    if (!existingProvider) {
      toast.error("No job provider profile to delete.");
      return;
    }

    if (window.confirm("Are you sure you want to delete your job provider profile?")) {
      try {
        await deleteForm({
          url: `${baseUrl}/job-providers/delete-job-provider/${existingProvider._id}`,
          setIsLoading,
          successMessage: "Job provider deleted successfully!",
        });
        setExistingProvider(null);
        setFormData({
          providerName: "",
          userId: formData.userId,
          jobProviderPic: "",
          address: "",
          website: "",
          description: "",
        });
        localStorage.removeItem("jobProviderData");
        toast.success("Job provider deleted successfully!");
      } catch (err) {
        console.error("Error deleting job provider:", err);
        toast.error("Failed to delete job provider.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 bg-cream min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-global mb-8">
        Job Provider Setup
      </h2>

      <div className="space-y-6 w-full mx-auto">
        <Input
          placeholder="Job Provider Name"
          name="providerName"
          value={formData.providerName}
          onChange={(e) => handleFormChange(e, setFormData)}
          required
        />
        <Input
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={(e) => handleFormChange(e, setFormData)}
          required
        />
        <Input
          placeholder="Website (optional)"
          name="website"
          value={formData.website}
          onChange={(e) => handleFormChange(e, setFormData)}
        />
        <Input
          placeholder="Description (optional)"
          name="description"
          value={formData.description}
          onChange={(e) => handleFormChange(e, setFormData)}
          multiline
        />
        <TakeImage onChange={handleImageChange} value={formData.jobProviderPic} />

        <div className="mt-10 flex flex-col gap-4 items-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-orange-global text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold w-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
            }`}
          >
            {isLoading ? "Submitting..." : existingProvider ? "Update Profile" : "Create Profile"}
          </button>
          {existingProvider && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className={`bg-red-500 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
              }`}
            >
              {isLoading ? "Deleting..." : "Delete Profile"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default JobProviderSetup;