// src/utils/auth.jsx
import { toast } from "react-toastify";
import { submitForm } from "./form.jsx";

const baseUrl = import.meta.env.VITE_APP_URL;

export const signupUser = async (email, phone, password) => {
  const endpoint = `${baseUrl}/user/sign-up`;
  const data = { email, phone, password };
  return await submitForm(data, endpoint);
};

export const loginUser = async (email, password) => {
  const endpoint = `${baseUrl}/user/login`;
  const data = { contact: email, password };
  const response = await submitForm(data, endpoint);
  if (response.resData) {
    localStorage.setItem("authToken", JSON.stringify(response.resData));
  }
  return response;
};

export const handleApiError = (error) => {
  toast.error(
    error.message.includes("Failed to fetch")
      ? "Unable to reach the server. Please check your connection or try again later."
      : error.message || "Something went wrong!",
    {
      position: "top-right",
      autoClose: 3000,
    }
  );
};

export const navigateAfterSuccess = (navigate, path, message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
  navigate(path);
};

// New: Parses authToken and returns user data
export const parseAuthToken = (navigate) => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    toast.error("You are not logged in. Please log in to continue.");
    navigate("/login");
    return null;
  }
  try {
    return JSON.parse(authToken);
  } catch (error) {
    console.error("Failed to parse authToken:", error);
    toast.error("Invalid authentication data. Please log in again.");
    navigate("/login");
    return null;
  }
};

// New: Parses data from localStorage with error handling
export const parseLocalStorage = (key, errorMessage = `Failed to load ${key} data.`) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to parse ${key}:`, error);
    toast.error(errorMessage);
    return null;
  }
};