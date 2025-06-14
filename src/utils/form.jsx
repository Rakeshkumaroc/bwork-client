// src/utils/form.jsx
import { toast } from "react-toastify";

// Updates form state dynamically with optional conditional logic
export const handleFormChange = (event, setFormState) => {
  const { name, value, type, checked } = event.target;
  console.log(value);

  setFormState((prev) => {
    const newState = {
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    };

    return newState;
  });
};

// Validates form fields based on a schema
export const validateForm = (formData, validationSchema) => {
  const errors = [];

  // Check required fields
  validationSchema.requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors.push(
        validationSchema[field](formData[field]) ||
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      );
    }
  });

  // Validate all fields with specific rules
  Object.keys(validationSchema).forEach((field) => {
    if (field !== "requiredFields" && formData[field]) {
      const error = validationSchema[field](formData[field]);
      if (error) {
        errors.push(error);
      }
    }
  });

  return errors;
};
// Submits form data to an API endpoint
// Submit form data to the server
export const submitForm = async ({
  url,
  payload,
  setIsLoading,
  navigate,
  successMessage,
  successRedirect,
  formDataFields = [],
  resetForm,
  localStorageKey,
  localStorageData,
  page
}) => {
  setIsLoading(true);
console.log("url", url);

  try {
    let response;
    // Use FormData if there are file fields
    if (formDataFields.length > 0) {
      const formDataPayload = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formDataPayload.append(key, value);
      });
      response = await fetch(url, {
        method: "POST",
        body: formDataPayload,
      });
    } else {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }
console.log('response',response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Request failed");
    }

    const data = await response.json();
    console.log("data", data);

    if (data.success !== undefined && !data.success) {
      throw new Error(data.message || "Request failed");
    }

    // Store data in localStorage if specified
    if (localStorageKey && localStorageData) {
      localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
    }

    // Reset form if specified
    if (resetForm) {
      resetForm();
    }

    toast.success(successMessage || "Request successful!");
    console.log('data.resData && data.resData.role && page === "employers-login"',data.resData.route);
    
    if (data.resData && data.resData.role && page === "employers-login" && data.resData.route) {
      navigate(`${data.resData.route}`);
    } else {
      if (successRedirect) {
        navigate(successRedirect);
      }
    }

    return data;
  } catch (error) {
    toast.error(
      error.message.includes("Failed to fetch")
        ? "Unable to reach the server. Please check your connection or try again later."
        : error.message || "Request failed"
    );
    throw error;
  } finally {
    setIsLoading(false);
  }
};
// Updates form data via an API endpoint (PUT)
export const updateForm = async ({
  url,
  payload,
  setIsLoading,
  navigate,
  successMessage,
  successRedirect,
  resetForm,
  localStorageKey,
  localStorageData,
}) => {
  setIsLoading(true);
  console.log('url');
  
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
console.log('response',response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Update failed");
    }

    const data = await response.json();

    if (data.success !== undefined && !data.success) {
      throw new Error(data.message || "Update failed");
    }

    // Store data in localStorage if specified
    if (localStorageKey && localStorageData) {
      localStorage.setItem(localStorageKey, JSON.stringify(localStorageData));
    }

    // Reset form if specified
    if (resetForm) {
      resetForm();
    }

    toast.success(successMessage || "Update successful!", {
      position: "top-right",
      autoClose: 3000,
    });
    if (successRedirect) {
      navigate(successRedirect);
    }

    console.log('data',data);
    

    return data;
  } catch (error) {
    toast.error(
      error.message.includes("Failed to fetch")
        ? "Unable to reach the server. Please check your connection or try again later."
        : error.message || "Update failed",
      {
        position: "top-right",
        autoClose: 3000,
      }
    );
    throw error;
  } finally {
    setIsLoading(false);
  }
};

// Deletes data via an API endpoint (DELETE)
export const deleteForm = async ({
  url,
  setIsLoading,
  navigate,
  successMessage,
  successRedirect,
  onSuccess,
}) => {
  setIsLoading(true);
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Delete failed");
    }

    const data = await response.json();

    if (data.success !== undefined && !data.success) {
      throw new Error(data.message || "Delete failed");
    }

    toast.success(successMessage || "Delete successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    if (onSuccess) {
      await onSuccess();
    }

    if (successRedirect) {
      navigate(successRedirect);
    }

    return data;
  } catch (error) {
    toast.error(
      error.message.includes("Failed to fetch")
        ? "Unable to reach the server. Please check your connection or try again later."
        : error.message || "Delete failed",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
    throw error;
  } finally {
    setIsLoading(false);
  }
};
// Resets form to initial state
export const resetForm = (setFormState, initialState) => {
  setFormState(initialState);
};
