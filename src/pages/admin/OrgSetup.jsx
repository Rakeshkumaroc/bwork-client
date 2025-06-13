// src/OrgSetup.jsx
import { useState, useEffect } from "react";
import Input from "../../components/common/Input";
import TakeImage from "../../components/common/TakeImage";
import Dropdown from "../../components/common/Dropdown";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleFormChange, validateForm, submitForm } from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const OrgSetup = () => {
  const [formData, setFormData] = useState({
    orgName: "",
    email: "",
    phone: "", 
    userId: "",
    orgLogo: "",
    isMultiBranch: "",
    branchCount: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  

  // Define validation schema
  const validationSchema = {
    requiredFields: ["orgName", "email", "phone", "userId", "isMultiBranch"],
    orgName: (value) =>
      value.length < 3 ? "Organization name must be at least 3 characters long" : null,
    email: (value) =>
      !/\S+@\S+\.\S+/.test(value) ? "Please enter a valid email address" : null,
    phone: (value) =>
      !/^\d{10}$/.test(value) ? "Please enter a valid 10-digit phone number" : null,
    
    userId: (value) =>
      !value ? "User ID is required" : null,
    orgLogo: (value) => {
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
    isMultiBranch: (value) =>
      !["Yes", "No"].includes(value) ? "Please select whether the organization has multiple branches" : null,
    branchCount: (value, formData) =>
      formData.isMultiBranch === "Yes" && (value < 1 || isNaN(value))
        ? "Number of branches must be at least 1"
        : null,
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
      orgLogo: image || "", // Store image data (base64, URL, or File)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form using validateForm function
    const errors = validateForm(formData, {
      ...validationSchema,
      branchCount: (value) => validationSchema.branchCount(value, formData),
    });

    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    // Prepare payload
    const payload = {
      orgName: formData.orgName,
      email: formData.email,
      phone: formData.phone, 
      userId: formData.userId,
      orgLogo: formData.orgLogo || "",
      isMultiBranch: formData.isMultiBranch === "Yes",
      branchCount: formData.isMultiBranch === "Yes" ? parseInt(formData.branchCount) : 1,
    };

    // Submit form using submitForm function
    try {
     const data= await submitForm({
        url: `${baseUrl}/org/add-new-org`,
        payload,
        setIsLoading,
        navigate,
        successMessage: "Organization created successfully!",
        successRedirect: "/dashboard",
        formDataFields: formData.orgLogo instanceof File ? ["orgLogo"] : [],
        localStorageKey: "organizationData",
        localStorageData: payload,
      });
      console.log(data);
      
       localStorage.setItem("organizationData", JSON.stringify(data.resData.organization));
    } catch (error) {
      // Error is already handled by submitForm via toast.error
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 bg-cream min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8">
        Organization Setup
      </h2>

      <div className="gap-6">
        <div className="space-y-4">
          <Input
            placeholder="Organization Name"
            name="orgName"
            value={formData.orgName}
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
          <Dropdown
            label="Does organization have multiple branches?"
            name="isMultiBranch"
            value={formData.isMultiBranch}
            onChange={(e) => handleFormChange(e, setFormData)}
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            required
          />
          {formData.isMultiBranch === "Yes" && (
            <Input
              placeholder="No. of Branches"
              name="branchCount"
              type="number"
              value={formData.branchCount}
              onChange={(e) => handleFormChange(e, setFormData)}
              required
            />
          )}
          <div className="mt-10 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-yellow-400 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold ${
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

export default OrgSetup;