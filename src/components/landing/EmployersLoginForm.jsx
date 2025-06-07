// src/EmployersLoginForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Input from "../common/Input";
import { handleFormChange, validateForm, submitForm } from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const EmployersLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Define validation schema
  const validationSchema = {
    requiredFields: ["email", "password", "agreeTerms"],
    email: (value) =>
      !/\S+@\S+\.\S+/.test(value) ? "Please enter a valid email address" : null,
    password: (value) =>
      value.length < 6 ? "Password must be at least 6 characters long" : null,
    agreeTerms: (value) =>
      !value ? "You must agree to the terms and conditions" : null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form using validateForm function
    const errors = validateForm(formData, validationSchema);

    if (errors.length > 0) {
      // Show first error to user
      toast.error(errors[0]);
      return;
    }

    // Prepare payload
    const payload = {
      contact: formData.email,
      password: formData.password,
    };

    // Submit form using submitForm function
    try {
      const responseData = await submitForm({
        url: `${baseUrl}/user/login`,
        payload,
        setIsLoading,
        navigate,
        successMessage: "Login successful!",
        successRedirect: "/org-setup",
        localStorageKey: "authToken",
        page:"employers-login",
      });

      // Store resData in localStorage
      localStorage.setItem("authToken", JSON.stringify(responseData.resData));
    } catch (error) {
      // Error is already handled by submitForm via toast.error
      return;
    }
  };

  return (
    <div className="flex items-center justify-center bg-light-cream py-6 px-4 sm:px-6 lg:px-8 md:h-screen">
      <div className="bg-light-cream w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-global mb-4 sm:mb-6 text-center leading-tight tracking-wide">
          Login to Man Power
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter e-mail"
            required
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Password"
            required
          />
          <label className="text-xs sm:text-sm flex items-center gap-2">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={(e) => handleFormChange(e, setFormData)}
              className="accent-orange-global"
            />
            I agree to{" "}
            <Link to="/terms" className="text-orange-global underline cursor-pointer">
              terms & conditions
            </Link>{" "}
            on Man Power
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-orange-global text-white py-2 sm:py-3 rounded-md shadow-md font-semibold text-sm sm:text-base ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          <div className="text-center text-gray-500 font-medium text-xs sm:text-sm">
            OR
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 sm:gap-3 opacity-50 bg-black text-white py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base"
          >
            <FcGoogle className="text-xl sm:text-2xl" /> Sign In with Google
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-xs sm:text-sm">
          Don't have an account?{" "}
          <Link to="/employers-signup" className="text-orange-global underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmployersLoginForm; 