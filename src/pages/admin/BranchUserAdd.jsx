// components/admin/BranchUserAdd.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "../../components/admin/Topbar";
import InputField from "../../components/common/admin/InputField";
import SelectField from "../../components/common/admin/SelectField";
import {
  handleFormChange,
  validateForm,
  submitForm,
  updateForm,
} from "../../utils/form";
import { fetchData } from "../../utils/api";

const baseUrl = import.meta.env.VITE_APP_URL;

const BranchUserAdd = ({ action }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    email: "",
    branch: "", // Stores branch _id
    address: "",
    password: "",
  });
  console.log('formData',formData);
  
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Define validation schema
  const validationSchema = {
    requiredFields: [
      "userName",
      "phone",
      "email",
      "branch",
      "address",
      "password",
    ],
    userName: (value) =>
      value.trim().length < 3
        ? "User name must be at least 3 characters long"
        : null,
    phone: (value) =>
      !/^\d{10}$/.test(value.trim())
        ? "Phone number must be a valid 10-digit number"
        : null,
    email: (value) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? "Invalid email format"
        : null,
    branch: (value) => (!value ? "Please select a branch" : null),
    address: (value) =>
      value.trim().length < 5
        ? "Address must be at least 5 characters long"
        : null,
    password: (value) =>
      value.length < 6 ? "Password must be at least 6 characters long" : null,
    image: (value) => {
      if (!value) return null; // Image is optional
      if (!["image/png", "image/jpeg"].includes(value.type)) {
        return "Only PNG and JPEG images are allowed";
      }
      if (value.size > 2 * 1024 * 1024) {
        return "Image size exceeds 2MB";
      }
      return null;
    },
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form using validateForm function
    const errors = validateForm({ ...formData, image }, validationSchema);

    if (errors.length > 0) {
      toast.error(errors[0], {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Prepare payload
    const payload = {
      userName: formData.userName,
      phone: formData.phone,
      email: formData.email,
      branchId: formData.branch, // Send branch _id
      userId: JSON.parse(localStorage.getItem("authToken") || "{}").userId,
      address: formData.address,
      password: formData.password,
      image: image ? "" : "", // Placeholder, actual image sent via FormData if present
    };
    console.log('payload',payload);
    

    // Submit form using submitForm function
    const apiUrl =
      action === "edit"
        ? `${baseUrl}/user/update-internal-user/${id}`
        : `${baseUrl}/user/add-internal-user`;

    try {
      if (action === "edit") {
        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.success) {
          toast.success("User updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/dashboard/branch-user/list");
        }
      } else {
        await submitForm({
          url: `${apiUrl}`,
          payload,
          setIsLoading,
          navigate,
          successMessage: "User created successfully!",
          successRedirect: "/dashboard/branch-user/list",
          formDataFields: image instanceof File ? ["image"] : [],
          resetForm: () => {
            setFormData({
              userName: "",
              phone: "",
              email: "",
              branch: "",
              address: "",
              password: "",
            });
            setImage(null);
            document.getElementById("image-upload").value = "";
          },
        });
      }
    } catch (error) {
      // Error is already handled by submitForm via toast.error
      return;
    }
  };

  useEffect(() => {
    const authToken = JSON.parse(
      localStorage.getItem("authToken") || "{}"
    );
    const userId = authToken.userId; // Assuming userId is userId; adjust if different
    fetchData(
      `${baseUrl}/branch/get-branch-by-user-id/${userId}`,
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

 

const getData = async () => {
  if (!id) {
    toast.error("Invalid user ID.", {
      position: "top-right",
      autoClose: 3000,
    });
    return;
  }

  try {
    const res = await fetch(`${baseUrl}/user/get-single-internal-user-by-id/${id}`);
    const data = await res.json();
    console.log("Fetched user data:", data);
    if (res.ok && data.resData) {
      // Map userBranchId to branch in formData
      setFormData({
        userName: data.resData.userName || "",
        phone: data.resData.phone || "",
        email: data.resData.email || "",
        branch: data.resData.userBranchId || "", // Set branch to userBranchId
        address: data.resData.address || "",
        password: data.resData.password, // Password is typically not fetched for security reasons
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
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className=" mx-auto bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {action === "edit" ? "Edit" : "Add"} User Details
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md space-y-6"
      >
        {/* Image Upload */}
        <div>
          <label
            htmlFor="image-upload"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Upload Image
          </label>
          <div className="relative w-20 h-20 mb-2">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiCtHrojYqQUgCsuPh2CkP4FhadhGdDZLQKw&s"
                }
                alt="User Profile Preview"
                className="rounded-full w-20 h-20 object-cover border-2 border-gray-300"
              />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              aria-label="Upload user profile image"
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField
            label="User Name"
            name="userName"
            value={formData.userName}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter User Name"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <InputField
            label="Contact No"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Contact Number"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <InputField
            label="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Email Address"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <SelectField
            label="Branch"
            name="branch"
            value={formData.branch}
            onChange={(e) => handleFormChange(e, setFormData)}
            options={branchOptions}
            placeholder="Select Branch"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <InputField
            label="User Address"
            name="address"
            value={formData.address}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Address"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter Password"
            className="border-gray-300 focus:border-yellow-400 rounded-md text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-yellow-400 text-black font-semibold py-2 px-8 rounded-md hover:bg-yellow-500 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Submit User Details"
          >
            {isLoading ? "Submitting..." : "SUBMIT"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default BranchUserAdd;
