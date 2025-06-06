// src/utils/branch.jsx
import { submitForm } from "./form.jsx";

const baseUrl = import.meta.env.VITE_APP_URL;

export const submitBranchDetails = async (data) => {
  const endpoint = `${baseUrl}/branch/create-branch`;
  return await submitForm(data, endpoint);
};

export const submitBranchUserDetails = async (data, image) => {
  const payload = {
    userName: data.userName,
    phone: data.phone,
    email: data.email,
    jobRole: data.jobRole,
    branch: data.branch,
    address: data.address,
    password: data.password,
  };
  if (image instanceof File) {
    const formDataPayload = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formDataPayload.append(key, value);
    });
    formDataPayload.append("image", image);
    return await submitForm(formDataPayload, `${baseUrl}/user/sign-up`);
  } else {
    return await submitForm(payload, `${baseUrl}/user/sign-up`);
  }
};

// New: Submits org setup details
export const submitOrgSetupDetails = async (data) => {
  const payload = {
    orgName: data.orgName,
    email: data.email,
    phone: data.phone,
    orgTypeId: data.orgTypeId,
    userId: data.userId,
    orgLogo: data.orgLogo || "",
    isMultiBranch: data.isMultiBranch === "Yes",
    branchCount: data.isMultiBranch === "Yes" ? parseInt(data.branchCount) : 1,
  };

  if (data.orgLogo instanceof File) {
    const formDataPayload = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formDataPayload.append(key, value);
    });
    return await submitForm(formDataPayload, `${baseUrl}/org/add-new-org`);
  } else {
    return await submitForm(payload, `${baseUrl}/org/add-new-org`);
  }
};


// src/utils/branch.jsx
// Deletes a branch by ID
export const deleteBranch = async (branchId) => {
  const endpoint = `${import.meta.env.VITE_APP_URL}/branch/delete-branch/${branchId}`;
  try {
    const res = await fetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to delete branch");
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};

// Filters data based on search term
export const filterDataBySearch = (data, searchTerm, field = "name") => {
  if (!searchTerm) return data;
  return data.filter((item) =>
    item[field]?.toLowerCase().includes(searchTerm.toLowerCase())
  );
};


// src/utils/branch.jsx
// Fetches a branch by ID
export const fetchBranchById = async (branchId) => {
  const endpoint = `${import.meta.env.VITE_APP_URL}/branch/get-branch-by-id/${branchId}`;
  try {
    const data = await fetchData(endpoint);
    return data.resData || data;
  } catch (error) {
    throw error;
  }
};