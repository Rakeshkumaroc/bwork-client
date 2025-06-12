import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_APP_URL;

const JobSeekerSetup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userProfilePic: "",
    gender: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    jobSeekerId: "",
    jobTitle: "",
    company: "",
    isFresher: true,
    experience: 0,
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("userData");
    if (!authToken) {
      toast.error("You are not logged in. Please log in to continue.");
      navigate("/login");
      return;
    }

    try {
      const { _id, phone } = JSON.parse(authToken);
      setFormData((prev) => ({
        ...prev,
        jobSeekerId: _id || "",
        phone: phone || "",
      }));
    } catch (error) {
      console.error("Failed to parse authToken:", error);
      toast.error("Invalid authentication data. Please log in again.");
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const isFresher = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      isFresher,
      experience: isFresher ? 0 : prev.experience,
      currentSalary: isFresher ? "" : prev.currentSalary,
      noticePeriod: isFresher ? "" : prev.noticePeriod,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        userProfilePic: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const errors = {};

    // Optional validations for provided fields
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (
      !formData.isFresher &&
      formData.experience &&
      isNaN(formData.experience)
    ) {
      errors.experience = "Experience must be a valid number";
    }

    if (
      !formData.isFresher &&
      formData.currentSalary &&
      isNaN(formData.currentSalary)
    ) {
      errors.currentSalary = "Current salary must be a valid number";
    }

    if (
      !formData.isFresher &&
      formData.noticePeriod &&
      isNaN(formData.noticePeriod)
    ) {
      errors.noticePeriod = "Notice period must be a valid number";
    }

    if (formData.expectedSalary && isNaN(formData.expectedSalary)) {
      errors.expectedSalary = "Expected salary must be a valid number";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((error) => toast.error(error));
      setIsLoading(false);
      return;
    }

    const payload = {
      userName: formData.userName || null,
      userProfilePic: formData.userProfilePic || null,
      gender: formData.gender || null,
      dob: formData.dob ? new Date(formData.dob) : null,
      address: formData.address || null,
      phone: formData.phone || null,
      email: formData.email || null,
      jobSeekerId: formData.jobSeekerId || null,
      jobTitle: formData.jobTitle || null,
      company: formData.company || null,
      isFresher: formData.isFresher,
      experience: formData.isFresher ? 0 : Number(formData.experience) || 0,
      currentSalary: formData.isFresher
        ? null
        : Number(formData.currentSalary) || null,
      expectedSalary: Number(formData.expectedSalary) || null,
      noticePeriod: formData.isFresher
        ? null
        : Number(formData.noticePeriod) || null,
    };

    try {
      const response = await fetch(
        `${baseUrl}/job-seekers-basic-details/create-job-seeker-basic-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
      }

      const data = await response.json();
      console.log("Response:", data);

      toast.success("Job seeker profile created successfully!");
      navigate("/profile");
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

  const handleSkillClick = () => navigate("/profile");

  return (
    <form onSubmit={handleSubmit} className="p-10 bg-cream min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-global mb-8">
        Job Seeker Setup
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="col-start-1 col-end-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <div className="relative w-14 h-14 mb-2">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img
                alt="Profile Preview"
                className="rounded-full w-14 h-14 object-cover border border-orange-400"
                src={
                  formData.userProfilePic ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiCtHrojYqQUgCsuPh2CkP4FhadhGdDZLQKw&s"
                }
              />
            </label>
            <input
              id="image-upload"
              accept="image/*"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              aria-label="Upload user profile image"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employment Status
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.isFresher}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-orange-global"
            />
            <span className="ml-2 text-gray-700">I am a Fresher</span>
          </label>
        </div>

      

        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="userName"
            type="text"
            placeholder="Username"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            placeholder="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Title
          </label>
          <input
            id="jobTitle"
            type="text"
            placeholder="e.g., MERN Full Stack Developer"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            placeholder="e.g., Orange Cap Media"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {!formData.isFresher && (
          <>
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Experience (in months)
              </label>
              <input
                id="experience"
                type="number"
                placeholder="e.g., 19"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                min="0"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label
                htmlFor="currentSalary"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Salary (₹)
              </label>
              <input
                id="currentSalary"
                type="number"
                placeholder="e.g., 400000"
                name="currentSalary"
                value={formData.currentSalary}
                onChange={handleInputChange}
                min="0"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label
                htmlFor="noticePeriod"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Notice Period (in months)
              </label>
              <input
                id="noticePeriod"
                type="number"
                placeholder="e.g., 2"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleInputChange}
                min="0"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </>
        )}

        <div>
          <label
            htmlFor="expectedSalary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expected Salary (₹)
          </label>
          <input
            id="expectedSalary"
            type="number"
            placeholder="e.g., 500000"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleInputChange}
            min="0"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="col-span-full mt-10 flex justify-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-orange-global text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={handleSkillClick}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-600"
          >
            Skip
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobSeekerSetup;
