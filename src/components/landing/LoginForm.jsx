import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../common/Input";
import { handleFormChange, validateForm, submitForm } from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = {
    requiredFields: ["phone", "password"],
    phone: (value) =>
      !/^\d{10}$/.test(value) ? "Please enter a valid 10-digit phone number" : null,
    password: (value) =>
      value.length < 6 ? "Password must be at least 6 characters long" : null,
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
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const responseData = await submitForm({
        url: `${baseUrl}/job-seekers/job-seeker-login`,
        payload,
        setIsLoading,
        navigate,
        successMessage: "Login successful!",
        successRedirect: "/job-seeker-setup", 
      });

      // Store user data in localStorage (adjust based on backend response)
      localStorage.setItem("userData", JSON.stringify(responseData.resData));
         
    } catch (error) {
      // Error is handled by submitForm via toast.error
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-light-cream py-6 px-4 sm:px-6 lg:px-8 md:h-screen">
      <div className="bg-light-cream w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-global mb-4 sm:mb-6 text-center leading-tight tracking-wide">
          Login to BWork
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Enter phone number"
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
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-orange-global text-white py-2 sm:py-3 rounded-md shadow-md font-semibold text-sm sm:text-base ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-xs sm:text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-global underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;