// src/utils/settings.jsx
import { submitForm } from "./form.jsx";

// Submits settings details
export const submitSettingsDetails = async (data) => {
  const endpoint = `${import.meta.env.VITE_APP_URL}/settings/update`;
  const payload = {
    companyName: data.companyName,
    contactPerson: data.contactPerson,
    address: data.address,
    country: data.country,
    city: data.city,
    postalCode: data.postalCode,
    email: data.email,
    mobileNumber: data.mobileNumber,
  };
  return await submitForm(payload, endpoint);
};