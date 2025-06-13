import { useContext, useState, useEffect } from "react";
import { FaPen, FaTimes } from "react-icons/fa";
import { MyContext } from "../../App";
import EducationSkel from "../skeleton/jobseeker/EducationSkel";
import { submitForm, updateForm, deleteForm } from "../../utils/form";
import { toast } from "react-toastify";
// Import the fetchData utility
import { fetchData } from "../../utils/api"; // Ensure the path is correct based on your project structure

const baseUrl = import.meta.env.VITE_APP_URL;

const Education = () => {
  const { educationRef } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true);
  const [educationData, setEducationData] = useState([]);
  const [error, setError] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState(null);
  const [formData, setFormData] = useState({
    degree: "",
    institution: "",
    duration: "",
    mode: "",
    score: "",
  });

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const jobSeekerId = userData._id || null;

  useEffect(() => {
    const getEducationDetails = async () => {
      if (!jobSeekerId) {
        setError("User ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      setError(null); // Clear previous errors

      // Use the predefined fetchData method
      await fetchData(
        `${baseUrl}/job-seeker-education-details/get-education-details-by-id/${jobSeekerId}`,
        setEducationData,
        setIsLoading,
        setError
      );
    };

    getEducationDetails();
  }, [jobSeekerId]);

  const handleAddClick = () => {
    setEditingEducationId(null);
    setFormData({ degree: "", institution: "", duration: "", mode: "", score: "" });
    setShowAddForm(true);
  };

  const handleEditClick = (education) => {
    setShowAddForm(false);
    setEditingEducationId(education._id);
    setFormData({
      degree: education.degree,
      institution: education.institution,
      duration: education.duration,
      mode: education.mode,
      score: education.score || "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    const educationPayload = {
      ...formData,
      jobSeekerId,
    };

    try {
      const data = await submitForm({
        url: `${baseUrl}/job-seeker-education-details/create-education-details`,
        payload: educationPayload,
        setIsLoading,
        successMessage: "Education added successfully!",
        resetForm: () => setFormData({ degree: "", institution: "", duration: "", mode: "", score: "" }),
      });
      if (data && data.resData) {
        setEducationData((prev) => [...prev, data.resData]);
      }
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to add education.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    const educationPayload = {
      ...formData,
      jobSeekerId,
    };

    try {
      const data = await updateForm({
        url: `${baseUrl}/job-seeker-education-details/update-education-details-by-id/${editingEducationId}`,
        payload: educationPayload,
        setIsLoading,
        successMessage: "Education updated successfully!",
        resetForm: () => setFormData({ degree: "", institution: "", duration: "", mode: "", score: "" }),
      });
      if (data && data.resData) {
        setEducationData((prev) =>
          prev.map((edu) =>
            edu._id === editingEducationId ? data.resData : edu
          )
        );
      }
      setEditingEducationId(null);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to update education.");
    }
  };

  const handleDelete = async (educationId) => {
    setIsLoading(true);
    try {
      await deleteForm({
        url: `${baseUrl}/job-seeker-education-details/delete-education-details-by-id/${educationId}`,
        setIsLoading,
        successMessage: "Education deleted successfully!",
        onSuccess: async () => {
          setEducationData((prev) => prev.filter((edu) => edu._id !== educationId));
        },
      });
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to delete education.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingEducationId(null);
    setFormData({ degree: "", institution: "", duration: "", mode: "", score: "" });
    setError(null);
  };

  if (isLoading) {
    return <EducationSkel />;
  }

  const renderForm = (submitHandler, title) => (
    <div className="mt-6 p-4 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
            Institution
          </label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (e.g., 2020–2023)
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
            Mode (e.g., Full Time, Correspondence)
          </label>
          <input
            type="text"
            id="mode"
            name="mode"
            value={formData.mode}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">
            Score (e.g., 85%, 3.8 GPA)
          </label>
          <input
            type="text"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="bg-white rounded-md shadow-md p-6" ref={educationRef}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
        <button
          className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          title="Add Education"
          onClick={handleAddClick}
        >
          Add education
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {showAddForm && renderForm(handleAddSubmit, "Add New Education")}

      {console.log("educationData before map:", educationData, typeof educationData)}

      {educationData.map((edu) =>
        editingEducationId === edu._id ? (
          renderForm(handleUpdateSubmit, "Edit Education")
        ) : (
          <div key={edu._id} className="mb-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(edu)}
                  className="p-2 text-gray-500 hover:text-yellow-400 transition"
                  title="Edit Education"
                >
                  <FaPen className="text-lg" />
                </button>
                <button
                  onClick={() => handleDelete(edu._id)}
                  className="p-2 text-gray-500 hover:text-red-600 transition"
                  title="Delete Education"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{edu.institution}</p>
            <p className="text-sm text-gray-400 mt-1">
              {edu.duration}
              {edu.mode && <span className="ml-2">| {edu.mode}</span>}
              {edu.score && <span className="ml-2">| Score: {edu.score}</span>}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Education;