import { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBill,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/api";
import { updateForm } from "../../utils/form";
import ProfileHeaderSkel from "../skeleton/jobseeker/ProfileHeaderSkel";
const baseUrl = import.meta.env.VITE_APP_URL;

const ProfileHeader = () => {
  const [profileData, setProfileData] = useState({
    userName: "Not provided",
    userProfilePic:
      "https://www.shareicon.net/data/128x128/2016/09/15/829466_man_512x512.png",
    address: "Not provided",
    phone: "Not provided",
    email: "Not provided",
    jobTitle: "Not provided",
    company: "Not provided",
    isFresher: true,
    experience: 0,
    currentSalary: null,
    expectedSalary: null,
    noticePeriod: null,
    updatedAt: new Date().toISOString(),
    isPhoneVerified: false,
    isEmailVerified: false,
  });
  const [editableProfileData, setEditableProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        toast.error("You are not logged in. Please log in to continue.");
        navigate("/login");
        return;
      }

      try {
        const { _id, phone, isPhoneVerified } = JSON.parse(userData);
        if (!_id) {
          toast.error("Invalid user data. Please log in again.");
          navigate("/login");
          return;
        }

        await fetchData(
          `${baseUrl}/job-seekers-basic-details/get-job-seeker-basic-by-id/${_id}`,
          (data) => {
            const resData = Array.isArray(data) ? data[0] : data;
            if (resData) {
              const fetchedData = {
                _id: resData._id,
                userName: resData.userName || "Not provided",
                userProfilePic:
                  resData.userProfilePic ||
                  "https://www.shareicon.net/data/128x128/2016/09/15/829466_man_512x512.png",
                address: resData.address || "Not provided",
                phone: resData.phone || phone || "Not provided",
                email: resData.email || "Not provided",
                jobTitle: resData.jobTitle || "Not provided",
                company: resData.company || "Not provided",
                isFresher:
                  resData.isFresher !== undefined ? resData.isFresher : true,
                experience: resData.experience || 0,
                currentSalary: resData.currentSalary || null,
                expectedSalary: resData.expectedSalary || null,
                noticePeriod: resData.noticePeriod || null,
                updatedAt: resData.updatedAt || new Date().toISOString(),
                isPhoneVerified: isPhoneVerified || !!resData.phone,
                isEmailVerified: !!resData.email,
              };
              setProfileData(fetchedData);
              setEditableProfileData(fetchedData);
            } else {
              toast.warn("No profile details found.");
            }
          },
          setIsLoading,
          setError
        );

        if (error) {
          throw new Error(error);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        toast.error("Failed to load profile details.");
      }
    };

    fetchProfileData();
  }, [navigate, error]);

  const formatUpdatedAt = (updatedAt) => {
    const date = new Date(updatedAt);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const formatExperience = (experience) => {
    if (experience === null || experience === undefined) return "Not provided";
    const years = Math.floor(experience / 12);
    const months = experience % 12;

    let parts = [];
    if (years > 0) parts.push(`${years} Year${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} Month${months > 1 ? "s" : ""}`);

    return parts.length > 0 ? parts.join(" ") : "Not provided";
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not provided";
    return `₹ ${salary.toLocaleString("en-IN")}`;
  };

  const formatNoticePeriod = (noticePeriod) => {
    if (!noticePeriod) return "Not provided";
    return `${noticePeriod} Month${noticePeriod > 1 ? "s" : ""} notice period`;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditableProfileData(profileData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditableProfileData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    const { phone, ...dataToSend } = editableProfileData;

    try {
      await updateForm({
        url: `${baseUrl}/job-seekers-basic-details/update-job-seeker-basic-d-by-id/${profileData._id}`,
        payload: dataToSend,
        setIsLoading,
        navigate,
        successMessage: "Profile updated successfully!",
        successRedirect: null,
        resetForm: () => {
          setProfileData(editableProfileData);
          setIsEditing(false);
        },
        localStorageKey: null,
        localStorageData: null,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return <ProfileHeaderSkel />;
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6 flex items-center gap-6">
      <div className="relative w-24 h-24">
        <img
          src={
            isEditing && editableProfileData.userProfilePic
              ? editableProfileData.userProfilePic
              : profileData.userProfilePic
          }
          alt="Profile"
          className="rounded-full w-full h-full object-cover border-4 border-yellow-400"
        />
        {isEditing && (
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setEditableProfileData((prevData) => ({
                    ...prevData,
                    userProfilePic: event.target.result,
                  }));
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
          />
        )}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 text-xs rounded-full border border-yellow-400">
          100%
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="userName"
                  value={editableProfileData.userName}
                  onChange={handleChange}
                  className="text-2xl font-semibold text-gray-800 border-b border-gray-300 focus:border-yellow-400 outline-none w-full"
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  name="jobTitle"
                  value={editableProfileData.jobTitle}
                  onChange={handleChange}
                  className="text-sm text-gray-600 border-b border-gray-300 focus:border-yellow-400 outline-none block mt-2 w-full"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  name="company"
                  value={editableProfileData.company}
                  onChange={handleChange}
                  className="text-sm text-gray-400 border-b border-gray-300 focus:border-yellow-400 outline-none block mt-2 w-full"
                  placeholder="Company"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {profileData.userName}
                </h2>
                <p className="text-sm text-gray-600">{profileData.jobTitle}</p>
                <p className="text-sm text-gray-400">
                  {profileData.company
                    ? `at ${profileData.company}`
                    : "Not provided"}
                </p>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            {!isEditing && (
              <p className="text-sm text-gray-400">
                Profile last updated –{" "}
                <span className="text-yellow-400">
                  {formatUpdatedAt(profileData.updatedAt)}
                </span>
              </p>
            )}
            <button
              onClick={handleEditToggle}
              className="p-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition"
              title={isEditing ? "Cancel Edit" : "Edit Profile"}
            >
              {isEditing ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaEdit className="text-lg" />
              )}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="p-2 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition"
                title="Save Profile"
              >
                <FaSave className="text-lg" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={editableProfileData.address}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-yellow-400 outline-none"
                placeholder="Address"
              />
            ) : (
              <span>{profileData.address}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            {isEditing ? (
              <input
                type="number"
                name="experience"
                value={editableProfileData.experience}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-yellow-400 outline-none"
                placeholder="Experience (in months)"
              />
            ) : (
              <span>{formatExperience(profileData.experience)}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBill className="text-gray-500" />
            {isEditing ? (
              <input
                type="number"
                name="currentSalary"
                value={editableProfileData.currentSalary || ""}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-yellow-400 outline-none"
                placeholder="Current Salary"
              />
            ) : (
              <span>{formatSalary(profileData.currentSalary)}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-gray-500" />
            <span>{profileData.phone}</span>
            {profileData.isPhoneVerified && (
              <MdVerified className="text-yellow-400" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editableProfileData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-yellow-400 outline-none"
                placeholder="Email"
              />
            ) : (
              <span>{profileData.email}</span>
            )}
            {profileData.isEmailVerified && (
              <MdVerified className="text-yellow-400" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            {isEditing ? (
              <input
                type="number"
                name="noticePeriod"
                value={editableProfileData.noticePeriod || ""}
                onChange={handleChange}
                className="w-full border-b border-gray-300 focus:border-yellow-400 outline-none"
                placeholder="Notice Period (in months)"
              />
            ) : (
              <span>{formatNoticePeriod(profileData.noticePeriod)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
