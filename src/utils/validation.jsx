// src/utils/validation.jsx
export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address";
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";
  if (!/^\d{10}$/.test(phone)) return "Please enter a valid 10-digit phone number";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  return null;
};

export const validateRequiredFields = (fields, required) => {
  return required.filter((field) => !fields[field]);
};

export const validateTerms = (agreeTerms) => {
  if (!agreeTerms) return "You must agree to the terms and conditions";
  return null;
};

export const validateRequiredFieldsWithErrors = (fields, requiredFields) => {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!fields[field]?.trim()) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });
  return errors;
};

export const validateFile = (file, allowedTypes = ["image/png", "image/jpeg"], maxSizeMB = 2) => {
  if (!file) return "File is required";
  if (!allowedTypes.includes(file.type)) return `Only ${allowedTypes.join(" and ")} files are allowed`;
  if (file.size > maxSizeMB * 1024 * 1024) return `File size exceeds ${maxSizeMB}MB`;
  return null;
};

export const validateBranchDetails = (fields) => {
  return validateRequiredFieldsWithErrors(fields, [
    "branchName",
    "address",
    "city",
    "state",
    "country",
    "zipCode",
  ]);
};
 

// New: Validates branch user-specific fields
export const validateBranchUserDetails = (fields, image) => {
  const errors = validateRequiredFieldsWithErrors(fields, [
    "userName",
    "phone",
    "email",
    "jobRole",
    "branch",
    "address",
    "password",
  ]);

  const emailError = validateEmail(fields.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(fields.phone);
  if (phoneError) errors.phone = phoneError;

  const passwordError = validatePassword(fields.password);
  if (passwordError) errors.password = passwordError;

  const imageError = validateFile(image);
  if (imageError) errors.image = imageError;

  return errors;
};

// New: Validates org setup-specific fields
export const validateOrgSetupDetails = (fields) => {
  const errors = validateRequiredFieldsWithErrors(fields, [
    "orgName",
    "email",
    "phone",
    "orgTypeId",
    "isMultiBranch",
  ]);
  const emailError = validateEmail(fields.email);
  if (emailError) errors.email = emailError;
  const phoneError = validatePhone(fields.phone);
  if (phoneError) errors.phone = phoneError;
  if (fields.isMultiBranch === "Yes" && !fields.branchCount) {
    errors.branchCount = "Number of branches is required";
  }
  if (fields.isMultiBranch === "Yes" && fields.branchCount <= 0) {
    errors.branchCount = "Number of branches must be greater than 0";
  }
  return errors;
};


// Validates settings-specific fields
export const validateSettingsDetails = (fields) => {
  const errors = validateRequiredFieldsWithErrors(fields, [
    "companyName",
    "contactPerson",
    "address",
    "country",
    "city",
    "postalCode",
    "email",
    "mobileNumber",
  ]);
  const emailError = validateEmail(fields.email);
  if (emailError) errors.email = emailError;
  const phoneError = validatePhone(fields.mobileNumber);
  if (phoneError) errors.mobileNumber = phoneError;
  return errors;
};

