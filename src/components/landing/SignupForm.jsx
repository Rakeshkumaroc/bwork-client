import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Input from "../common/Input";
import { handleFormChange, validateForm, submitForm } from "../../utils/form";

const baseUrl = import.meta.env.VITE_APP_URL;

const SignupForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false); // Toggle OTP input and submit
  const navigate = useNavigate();

  // Define validation schema for phone and OTP
  const validationSchema = {
    requiredFields: ["phone", ...(showOtp ? ["otp"] : [])],
    phone: (value) =>
      !/^\d{10}$/.test(value) ? "Please enter a valid 10-digit phone number" : null,
    otp: (value) =>
      showOtp && !/^\d{6}$/.test(value) ? "Please enter a valid 6-digit OTP" : null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/profile");

    // // Validate form using validateForm function
    // const errors = validateForm(formData, validationSchema);

    // if (errors.length > 0) {
    //   toast.error(errors[0]);
    //   return;
    // }

    // setIsLoading(true);

    // // Prepare payload
    // const payload = { phone: formData.phone, otp: formData.otp };

    // try {
    //   let url = `${baseUrl}/user/sign-up`;
    //   if (!showOtp) {
    //     // Simulate OTP request on initial "Sign Up" click
    //     await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
    //     setShowOtp(true);
    //     toast.success("OTP sent to your phone!");
    //     setIsLoading(false);
    //     return;
    //   }

    //   // Submit form to verify OTP and sign up
    //   await submitForm({
    //     url,
    //     payload,
    //     setIsLoading,
    //     navigate,
    //     successMessage: "Signup successful!",
    //     successRedirect: "/login",
    //   });
    // } catch (error) {
    //   toast.error("An error occurred. Please try again.");
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center bg-light-cream py-6 px-4 sm:px-6 lg:px-8 md:h-screen">
      <div className="bg-light-cream w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-global mb-4 sm:mb-6 text-center leading-tight tracking-wide">
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
          {!showOtp ? (
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-orange-global text-white py-2 sm:py-3 rounded-md shadow-md font-semibold text-sm sm:text-base ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          ) : (
            <>
              <Input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={(e) => handleFormChange(e, setFormData)}
                placeholder="Enter OTP"
                required
              />
              <button

                type="submit"
                disabled={isLoading}
                className={`bg-orange-global text-white py-2 sm:py-3 rounded-md shadow-md font-semibold text-sm sm:text-base ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Verifying..." : "Submit OTP"}
              </button>
            </>
          )}

          <div className="text-center text-gray-500 font-medium text-xs sm:text-sm">
            OR
          </div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 sm:gap-3 bg-black opacity-50 text-white py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base"
          >
            <FcGoogle className="text-xl sm:text-2xl" /> Sign Up with Google
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-xs sm:text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-global underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;