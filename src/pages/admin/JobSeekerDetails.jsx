import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/global/Navbar";
import Footer from "../../components/global/Footer";
import { FaUserAlt } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BiPlus } from "react-icons/bi";
import JobseekerRegistrationCard from "./JobseekerRegistrationCard";

const baseUrl = import.meta.env.VITE_APP_URL;

const JobSeekerDetails = () => {
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
    bankPassbook: "",
    panCard: "",
    passport: "",
    aadhaarCard: "",
    bankAccountNo: "",
    panCardNo: "",
    passportNo: "",
    aadhaarCardNo: "",
    agreeTerms: false,
    subscribeJobAlert: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
      experience: checked && name === "isFresher" ? 0 : prev.experience,
      currentSalary: checked && name === "isFresher" ? "" : prev.currentSalary,
      noticePeriod: checked && name === "isFresher" ? "" : prev.noticePeriod,
      jobTitle: checked && name === "isFresher" ? "" : prev.jobTitle,
      company: checked && name === "isFresher" ? "" : prev.company,
    }));
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [name]: reader.result,
      }));
    };
    reader.readAsDataURL(files[0]);
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
      jobTitle: formData.isFresher ? null : formData.jobTitle || null,
      company: formData.isFresher ? null : formData.company || null,
      isFresher: formData.isFresher,
      experience: formData.isFresher ? 0 : Number(formData.experience) || 0,
      currentSalary: formData.isFresher
        ? null
        : Number(formData.currentSalary) || null,
      expectedSalary: Number(formData.expectedSalary) || null,
      noticePeriod: formData.isFresher
        ? null
        : Number(formData.noticePeriod) || null,
      bankPassbook: formData.bankPassbook || null,
      panCard: formData.panCard || null,
      passport: formData.passport || null,
      aadhaarCard: formData.aadhaarCard || null,
      bankAccountNo: formData.bankAccountNo || null,
      panCardNo: formData.panCardNo || null,
      passportNo: formData.passportNo || null,
      aadhaarCardNo: formData.aadhaarCardNo || null,
      agreeTerms: formData.agreeTerms,
      subscribeJobAlert: formData.subscribeJobAlert,
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
      // navigate("/profile"); // Re-enable if you have react-router-dom setup
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

  return (
    <>
      <Navbar />
      <JobseekerRegistrationCard />
      <div className="min-h-screen px-4 py-8 md:px-[50px] bg-white flex items-center justify-center font-sans">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-jobcard rounded-xl shadow-lg p-6 md:p-10 max-w-7xl mx-auto"
        >
          <h3 className="font-bold text-lg md:text-xl mb-10">
            Enter Candidate Details
          </h3>
          <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-6 mb-4">
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FaUserAlt className="text-5xl" />
                </label>
                <input
                  id="image-upload"
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  aria-label="Upload user profile image"
                  name="userProfilePic"
                />
              </div>
            </div>
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employment Status
              </label>
              <label className="inline-flex items-center p-3 border border-gray-300 rounded-md bg-white">
                <input
                  type="checkbox"
                  checked={formData.isFresher}
                  onChange={handleCheckboxChange}
                  name="isFresher"
                  className="form-checkbox h-5 w-5 text-yellow-500 focus:ring-yellow-500 rounded-sm"
                />
                <span className="ml-3 text-base text-gray-800">
                  I am a Fresher
                </span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {/* Phone (disabled) */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-md text-sm bg-gray-100 cursor-not-allowed pr-10 focus:ring-0"
                />
                <span className="absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {/* Username */}
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
                className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            {/* Gender */}
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
                className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Date of Birth */}
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
                className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            {/* Address */}
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
                className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            {/* Email */}
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
                className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            {/* Conditionally render Job Title and Company */}
            {!formData.isFresher && (
              <>
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
                    className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
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
                    className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </>
            )}
            {/* Conditionally render Experience, Current Salary, Notice Period */}
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
                    className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
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
                    className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
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
                    className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </>
            )}
            {/* Expected Salary */}
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
                className="w-full p-3 border border-gray-300 bg-white rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* New Document Upload Section */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* Bank Account Passbook */}
              <div className="bg-white p-4 rounded-lg border border-yellow-200 shadow-sm max-w-xs mx-auto">
                <label htmlFor="bankPassbook" className="block cursor-pointer">
                  <div className="text-center text-sm font-semibold text-black mb-4">
                    Upload Bank Account Passbook
                  </div>

                  <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <IoCloudUploadOutline className="h-6 w-6 text-black" />
                      <p className="text-sm text-gray-600">
                        Browse & Choose the file you want to upload from your
                        Computer
                      </p>

                      <div>
                        <input
                          id="bankPassbook"
                          type="file"
                          accept="image/*, application/pdf"
                          className="hidden"
                          onChange={handleImageUpload}
                          name="bankPassbook"
                        />
                        <label
                          htmlFor="bankPassbook"
                          className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded"
                        >
                          <BiPlus className="text-2xl" />
                        </label>
                      </div>
                    </div>
                  </div>
                </label>
                {/* Bank Account No */}
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <label
                    htmlFor="bankAccountNo"
                    className="cursor-pointer block text-sm font-medium text-gray-700 mb-2"
                  >
                    Add Bank Account No.
                  </label>
                  <input
                    id="bankAccountNo"
                    type="text"
                    placeholder=""
                    name="bankAccountNo"
                    value={formData.bankAccountNo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Pan Card */}
              <div className="bg-white p-4 rounded-lg border border-yellow-200 shadow-sm max-w-xs mx-auto">
                <label htmlFor="panCard" className="block cursor-pointer">
                  <div className="text-center text-sm font-semibold text-black mb-4">
                    Upload Pan Card
                  </div>

                  <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <IoCloudUploadOutline className="h-6 w-6 text-black" />
                      <p className="text-sm text-gray-600">
                        Browse & Choose the file you want to upload from your
                        Computer
                      </p>

                      <div>
                        <input
                          id="panCard"
                          type="file"
                          accept="image/*, application/pdf"
                          className="hidden"
                          onChange={handleImageUpload}
                          name="panCard"
                        />
                        <label
                          htmlFor="panCard"
                          className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded"
                        >
                          <BiPlus className="text-2xl" />
                        </label>
                      </div>
                    </div>
                  </div>
                </label>
                {/* Pan Card No */}
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <label
                    htmlFor="panCardNo"
                    className="cursor-pointer block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter Pan Card No.
                  </label>
                  <input
                    id="panCardNo"
                    type="text"
                    placeholder=""
                    name="panCardNo"
                    value={formData.panCardNo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Passport */}
              <div className="bg-white p-4 rounded-lg border border-yellow-200 shadow-sm max-w-xs mx-auto">
                <label htmlFor="passport" className="block cursor-pointer">
                  <div className="text-center text-sm font-semibold text-black mb-4">
                    Upload Passport
                  </div>

                  <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <IoCloudUploadOutline className="h-6 w-6 text-black" />
                      <p className="text-sm text-gray-600">
                        Browse & Choose the file you want to upload from your
                        Computer
                      </p>

                      <div>
                        <input
                          id="passport"
                          type="file"
                          accept="image/*, application/pdf"
                          className="hidden"
                          onChange={handleImageUpload}
                          name="passport"
                        />
                        <label
                          htmlFor="passport"
                          className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded"
                        >
                          <BiPlus className="text-2xl" />
                        </label>
                      </div>
                    </div>
                  </div>
                </label>
                {/* Passport No */}
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <label
                    htmlFor="passportNo"
                    className="cursor-pointer block text-sm font-medium text-gray-700 mb-2"
                  >
                    Enter Passport No.
                  </label>
                  <input
                    id="passportNo"
                    type="text"
                    placeholder=""
                    name="passportNo"
                    value={formData.passportNo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Aadhaar Card */}
              <div className="bg-white p-4 rounded-lg border border-yellow-200 shadow-sm max-w-xs mx-auto">
                <label htmlFor="aadhaarCard" className="block cursor-pointer">
                  <div className="text-center text-sm font-semibold text-black mb-4">
                    Upload Aadhaar Card
                  </div>

                  <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <IoCloudUploadOutline className="h-6 w-6 text-black" />
                      <p className="text-sm text-gray-600">
                        Browse & Choose the file you want to upload from your
                        Computer
                      </p>

                      <div>
                        <input
                          id="aadhaarCard"
                          type="file"
                          accept="image/*, application/pdf"
                          className="hidden"
                          onChange={handleImageUpload}
                          name="aadhaarCard"
                        />
                        <label
                          htmlFor="aadhaarCard"
                          className="inline-flex items-center justify-center w-8 h-8 bg-black text-white rounded"
                        >
                          <BiPlus className="text-2xl" />
                        </label>
                      </div>
                    </div>
                  </div>
                </label>
                {/* Aadhaar Card No */}
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <label
                    htmlFor="aadhaarCardNo"
                    className="cursor-pointer block text-sm font-medium text-gray-700 mb-2"
                  >
                    Add Aadhaar Card No.
                  </label>
                  <input
                    id="aadhaarCardNo"
                    type="text"
                    placeholder=""
                    name="aadhaarCardNo"
                    value={formData.aadhaarCardNo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between sm:flex-row gap-4 mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-yellow-500 focus:ring-yellow-500 rounded-sm"
                />
                <span className="ml-2 text-sm text-gray-700">
                  By registering, you agree to our terms of use & other policies
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="subscribeJobAlert"
                  checked={formData.subscribeJobAlert}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-5 w-5 text-yellow-500 focus:ring-yellow-500 rounded-sm"
                />
                <span className="ml-2 text-sm text-gray-700">
                  You're subscribing to job alert & receive matching jobs every
                  Monday morning, 4 times by sms.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-full mt-10 flex justify-start">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-gray-900 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-md 
                ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800"
                } 
                transition-all duration-200 ease-in-out`}
              title="Submit Profile"
            >
              {isLoading ? "Submitting..." : "Register & Search jobs"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default JobSeekerDetails;
