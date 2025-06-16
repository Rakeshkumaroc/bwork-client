// src/utils/api.jsx
import { toast } from "react-toastify";

// Fetches data from an API endpoint
// utils/api.js
export const fetchData = async (endpoint, setData, setLoading, setError) => {
  try {
    setLoading(true);
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    const data = await response.json();
    // Handle different API response structures
    const result = Array.isArray(data) ? data : data.resData || [];
    setData(result);
    console.log('result',result);
    
    setLoading(false);
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};

// Maps organization types to Dropdown format
export const mapOrgTypesToDropdown = (orgTypes) => {
  return orgTypes.map((type) => ({
    label: type.orgTypeName,
    value: type._id,
  }));
};

export const deleteData = async (endpoint, options = {}) => {
  try {
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`Failed to delete data from ${endpoint}`);
    }
    return await res.json();
  } catch (error) {
    toast.error(error.message || "Failed to delete data");
    throw error;
  }
};
//add comment
