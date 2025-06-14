import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../common/Input";
import { handleFormChange, validateForm, submitForm } from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const SignupForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  // Validation schema for phone and OTP
  const validationSchema = {
    requiredFields: ["phone", ...(showOtp ? ["otp"] : [])],
    phone: (value) =>
      !/^\d{10}$/.test(value)
        ? "Please enter a valid 10-digit phone number"
        : null,
    otp: (value) =>
      showOtp && !/^\d{6}$/.test(value)
        ? "Please enter a valid 6-digit OTP"
        : null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData, validationSchema);
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    const payload = showOtp
      ? { phone: formData.phone, otp: formData.otp }
      : { phone: formData.phone };

    try {
      if (!showOtp) {
        // Step 1: Request OTP
        const url = `${baseUrl}/job-seekers/send-otp`;
        const data = await submitForm({
          url,
          payload,
          setIsLoading,
          successMessage: "OTP sent to your phone!",
        });
        if (data.statusCode === 200) {
          setShowOtp(true);
        }
      } else {
        // Step 2: Verify OTP and sign up
        const url = `${baseUrl}/job-seekers/job-seeker-signup`;
        const responseData = await submitForm({
          url,
          payload,
          setIsLoading,
          navigate,
          successMessage:
            "Signup successful! Check your phone for login credentials.",
          successRedirect: "/login",
        });
          if (responseData.success) {
        const { routes } = responseData.resData;
        // Store user data in localStorage (adjust based on backend response)
        localStorage.setItem("userData", JSON.stringify(responseData.resData));
        navigate(routes);
      }
      }
    } catch (error) {
      // Error is already handled by submitForm via toast.error
      console.error("Submission error:", error);
    }
  };

  const handleResendOtp = async () => {
    if (!formData.phone) {
      toast.error("Please enter a phone number.");
      return;
    }

    const errors = validateForm(
      { phone: formData.phone },
      { requiredFields: ["phone"], phone: validationSchema.phone }
    );
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    const payload = { phone: formData.phone };
    try {
      const url = `${baseUrl}/job-seekers/send-otp`;
      await submitForm({
        url,
        payload,
        setIsLoading,
        successMessage: "OTP resent to your phone!",
      });
    } catch (error) {
      // Error is already handled by submitForm via toast.error
      console.error("Resend OTP error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-light-cream py-6 px-4 sm:px-6 lg:px-8 md:h-screen">
      <div className="bg-light-cream w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center leading-tight tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleFormChange(e, setFormData)}
            placeholder="Your Phone"
            required
          />
          {showOtp && (
            <Input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={(e) => handleFormChange(e, setFormData)}
              placeholder="Enter OTP"
              required
            />
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-yellow-400 text-white py-2 sm:py-3 rounded-md shadow-md font-semibold text-sm sm:text-base ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading
              ? showOtp
                ? "Verifying..."
                : "Sending OTP..."
              : showOtp
              ? "Submit OTP"
              : "Sign Up"}
          </button>
          {showOtp && (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isLoading}
              className="text-yellow-400 underline text-sm sm:text-base text-center"
            >
              Resend OTP
            </button>
          )}
        </form>

        <p className="mt-4 text-center text-gray-600 text-xs sm:text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
