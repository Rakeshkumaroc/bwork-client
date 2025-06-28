// components/admin/AddJobCategory.jsx
import { useEffect, useState } from "react";
import Topbar from "../../components/admin/Topbar";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/common/admin/InputField";
import {
  handleFormChange,
  validateForm,
  submitForm,
  resetForm,
  updateForm,
} from "../../utils/form";
const baseUrl = import.meta.env.VITE_APP_URL;

const AddJobCategory = ({ action }) => {
  const initialFormData = {
    title: "",
    description: "",
  };
  const { id } = useParams();
console.log("Category ID:", id);

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Define validation schema
  const validationSchema = {
    requiredFields: ["title"],
    title: (value) =>
      value.trim().length < 3
        ? "Title must be at least 3 characters long"
        : null,
    description: (value) =>
      value.trim().length > 0 && value.trim().length < 10
        ? "Description must be at least 10 characters long if provided"
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
      toast.error("User ID not found. Please log in again.", {
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
        ? `${baseUrl}/job-category/update-job-category/${id}`
        : `${baseUrl}/job-category/create-job-category`;

    try {
      if (action === "edit") {
        await updateForm({
          url: apiUrl,
          payload,
          setIsLoading: setLoading,
          navigate,
          successMessage: "Job category updated successfully!",
          successRedirect: "/dashboard/manage-job-category/list",
          resetForm: () => resetForm(setFormData, initialFormData),
        });
      } else {
        await submitForm({
          url: apiUrl,
          payload,
          setIsLoading: setLoading,
          navigate,
          successMessage: "Job category created successfully!",
          successRedirect: "/dashboard/manage-job-category/list",
          resetForm: () => resetForm(setFormData, initialFormData),
          formDataFields: [], // No file fields
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const getData = async () => {
    if (!id) {
      toast.error("Invalid category ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const res = await fetch(
        `${baseUrl}/job-category/get-job-category-by-id/${id}`
      );
      const data = await res.json();
      
      console.log("Fetched category data:", data);
      if (res.ok && data.resData) {
        setFormData({
          title: data.resData.title || "",
          description: data.resData.description || "",
        });
      } else {
        throw new Error(data.message || "Failed to fetch category data.");
      }
    } catch (err) {
      console.error("Error fetching category:", err);
      toast.error(err.message || "Error fetching category data.", {
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
      <div className="mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {action === "edit" ? "Edit Job Category" : "Add Job Category"}
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-md space-y-6"
        >
          <div className="grid grid-cols-1 gap-4">
            <InputField
              label="Category Title"
              name="title"
              value={formData.title}
              onChange={(e) => handleFormChange(e, setFormData)}
              placeholder="Enter Category Title"
              className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
            />
            <InputField
              label="Description"
              name="description"
              value={formData.description}
              onChange={(e) => handleFormChange(e, setFormData)}
              placeholder="Enter Category Description (Optional)"
              type="textarea"
              className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
            />
          </div>
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-yellow-400 text-black font-semibold py-2 px-8 rounded-md hover:bg-yellow-500 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Submit Job Category"
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobCategory;