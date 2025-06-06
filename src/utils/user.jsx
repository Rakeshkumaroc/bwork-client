// src/utils/user.jsx
import { fetchData } from "./api.jsx";

// Fetches all users
export const fetchAllUsers = async () => {
  const endpoint = `${import.meta.env.VITE_APP_URL}/user/get-all-users`;
  try {
    const data = await fetchData(endpoint);
    return data.resData || data;
  } catch (error) {
    throw error;
  }
};

// Deletes a user by ID
export const deleteUser = async (userId) => {
  const endpoint = `${import.meta.env.VITE_APP_URL}/user/delete-user/${userId}`;
  try {
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to delete user");
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};


// Fetches a user by ID
export const fetchUserById = async (userId) => {
  const endpoint = `${import.meta.env.VITE_APP_URL}/user/get-user-by-id/${userId}`;
  try {
    const data = await fetchData(endpoint);
    return data.resData || data;
  } catch (error) {
    throw error;
  }
};