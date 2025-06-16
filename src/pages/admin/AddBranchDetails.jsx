import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Topbar from "../../components/admin/Topbar";
import { toast } from "react-toastify"; 
import InputField from "../../components/common/admin/InputField";
import {
  handleFormChange,
  validateForm,
  submitForm,
  updateForm,
  resetForm,
} from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const AddBranchDetails = ({ action }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialFormData = {
    branchName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Validation schema
  const validationSchema = {
    requiredFields: ["branchName", "address", "city", "state", "country", "zipCode"],
    branchName: (value) =>
      value.trim().length < 3 ? "Branch name must be at least 3 characters long" : null,
    address: (value) =>
      value.trim().length < 5 ? "Address must be at least 5 characters long" : null,
    city: (value) =>
      value.trim().length < 2 ? "City must be at least 2 characters long" : null,
    state: (value) =>
      value.trim().length < 2 ? "State must be at least 2 characters long" : null,
    country: (value) =>
      value.trim().length < 2 ? "Country must be at least 2 characters long" : null,
    zipCode: (value) =>
      !/^\d{5,6}$/.test(value.trim()) ? "Zip code must be 5 or 6 digits" : null,
  };

  // Fetch branch data for edit mode
  const getData = async () => {
    if (!id) {
      toast.error("Invalid branch ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setFetchLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`${baseUrl}/branch/get-branch-by-id/${id}`);
      const data = await res.json();
      if (res.ok && data.resData) {
        setFormData({
          branchName: data.resData.branchName || "",
          address: data.resData.address || "",
          city: data.resData.city || "",
          state: data.resData.state || "",
          country: data.resData.country || "",
          zipCode: data.resData.zipCode || "",
        });
      } else {
        throw new Error(data.message || "Failed to fetch branch data.");
      }
    } catch (err) {
      console.error("Error fetching branch:", err);
      setFetchError(err.message || "Error fetching branch data.");
      toast.error(err.message || "Error fetching branch data.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (action === "edit" && id) {
      getData();
    }
  }, [action, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData, validationSchema);
    if (errors.length > 0) {
      toast.error(errors[0], {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Retrieve user ID
    const authToken = JSON.parse(localStorage.getItem("authToken") || "{}");
    const userId = authToken.userId;

    if (!userId) {
      toast.error("user ID not found. Please set up an user first.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/employers-signup");
      return;
    }

    // Prepare payload
    const payload = { ...formData, userId };

    // Handle create or update
    const apiUrl =
      action === "edit"
        ? `${baseUrl}/branch/update-branch/${id}`
        : `${baseUrl}/branch/create-branch`;

    try {
      if (action === "edit") {
        await updateForm({
          url: apiUrl,
          payload,
          setIsLoading,
          navigate,
          successMessage: "Branch updated successfully!",
          successRedirect: "/dashboard/manage-branch/list",
          resetForm: () => resetForm(setFormData, initialFormData),
        });
      } else {
        await submitForm({
          url: apiUrl,
          payload,
          setIsLoading,
          navigate,
          successMessage: "Branch created successfully!",
          successRedirect: "/dashboard/manage-branch/list",
          resetForm: () => resetForm(setFormData, initialFormData),
        });
      }
    } catch (error) {
      // Errors handled by submitForm/updateForm via toast.error
      return;
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-light-cream p-4 sm:p-8 flex items-center justify-center">
        <p className="text-gray-600">Loading branch data...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-light-cream p-4 sm:p-8 flex items-center justify-center">
        <p className="text-red-600">Error: {fetchError}</p>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className=" mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {action === "edit" ? "Edit" : "Add"} Branch Details
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Branch Name"
            name="branchName"
            value={formData.branchName}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Branch Name"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <InputField
            label="Address"
            name="address"
            value={formData.address}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Address"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter City"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <InputField
            label="State"
            name="state"
            value={formData.state}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter State"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <InputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Country"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
        </div>
        <InputField
          label="Zip Code"
          name="zipCode"
          value={formData.zipCode}
          onChange={(e) => handleFormChange(e, setFormData)}
          placeholder="Enter Zip Code"
          className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
        />
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-yellow-400 text-black font-semibold py-2 px-8 rounded-md hover:bg-yellow-500 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Submit Branch Details"
          >
            {isLoading ? "Submitting..." : "SUBMIT"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default AddBranchDetails;