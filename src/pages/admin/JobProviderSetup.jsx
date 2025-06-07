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
    jobProviderName: "",
    email: "",
    phone: "", 
    userId: "",
    jobProviderLogo: "",
 
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  

  // Define validation schema
  const validationSchema = {
    requiredFields: ["jobProviderName", "email", "phone", "userId" ],
    jobProviderName: (value) =>
      value.length < 3 ? "Job provider name must be at least 3 characters long" : null,
    email: (value) =>
      !/\S+@\S+\.\S+/.test(value) ? "Please enter a valid email address" : null,
    phone: (value) =>
      !/^\d{10}$/.test(value) ? "Please enter a valid 10-digit phone number" : null,
    
    userId: (value) =>
      !value ? "User ID is required" : null,
    jobProviderLogo: (value) => {
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
      const { userId, email, phone } = JSON.parse(authToken);
      setFormData((prev) => ({
        ...prev,
        userId: userId || "",
        email: email || "",
        phone: phone || "",
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
      jobProviderLogo: image || "", // Store image data (base64, URL, or File)
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
      jobProviderName: formData.jobProviderName,
      email: formData.email,
      phone: formData.phone, 
      userId: formData.userId,
      jobProviderLogo: formData.jobProviderLogo || "", 
    };

    // Submit form using submitForm function
    try {
     const data= await submitForm({
        url: `${baseUrl}/org/add-new-org`,
        payload,
        setIsLoading,
        navigate,
        successMessage: "Job provider created successfully!",
        successRedirect: "/dashboard",
        formDataFields: formData.jobProviderLogo instanceof File ? ["jobProviderLogo"] : [],
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
            name="jobProviderName"
            value={formData.jobProviderName}
            onChange={(e) => handleFormChange(e, setFormData)}
            required
          />
          <Input
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={(e) => handleFormChange(e, setFormData)}
            required
            disabled // Disable to prevent editing authToken email
          />
          <Input
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleFormChange(e, setFormData)}
            required
            disabled // Disable to prevent editing authToken phone
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

 