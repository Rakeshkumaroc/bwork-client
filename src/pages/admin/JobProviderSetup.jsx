// src/jobProviderSetup.jsx
import { useState, useEffect } from "react";
import Input from "../../components/common/Input";
import TakeImage from "../../components/common/TakeImage"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleFormChange, validateForm, submitForm } from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const JobProviderSetup = () => {
  const [formData, setFormData] = useState({
    providerName: "", 
    userId: "",
    jobProviderPic: "",
    address: "", // Added address field
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  

  // Define validation schema
  const validationSchema = {
    requiredFields: ["providerName", "userId", "address"], // Added address to required fields
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
      value.length < 5 ? "Address must be at least 5 characters long" : null, // Added validation for address
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

  const handleImageChange = (image) => {
    setFormData((prev) => ({
      ...prev,
      jobProviderPic: image || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form using validateForm function
    const errors = validateForm(formData, {
      ...validationSchema, 
    });

    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    // Prepare payload
    const payload = {
      providerName: formData.providerName, 
      userId: formData.userId,
      jobProviderPic: formData.jobProviderPic || "", 
      address: formData.address, // Added address to payload
    };

    // Submit form using submitForm function
    try {
      const data = await submitForm({
        url: `${baseUrl}/job-providers/create-Job-provider-details`, // Fixed typo in URL
        payload,
        setIsLoading,
        navigate,
        successMessage: "Job provider created successfully!",
        successRedirect: "/dashboard",
        formDataFields: formData.jobProviderPic instanceof File ? ["jobProviderPic"] : [],
        localStorageKey: "jobProviderData",
        localStorageData: payload,
      });
      console.log(data);
      
      localStorage.setItem("jobProviderData", JSON.stringify(data.resData.jobProvider));
    } catch (error) {
      // Error is already handled by submitForm via toast.error
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 bg-cream min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-global mb-8">
        Job Provider Setup
      </h2>

      <div className="gap-6">
        <div className="space-y-4">
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
          <TakeImage onChange={handleImageChange} />
         
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

export default JobProviderSetup;