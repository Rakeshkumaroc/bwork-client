// src/components/Input.jsx
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ type, name, value, onChange, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine if the input is a password field
  const isPassword = type === "password";

  return (
    <div className={isPassword ? "relative" : ""}>
      <input
        type={isPassword && showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-3 outline-none text-sm sm:text-base ${
          isPassword ? "pr-10" : ""
        }`}
        required={required}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default Input;