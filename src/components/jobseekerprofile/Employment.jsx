import { useContext, useState, useEffect } from "react";
import { FaPen, FaTimes, FaPlus } from "react-icons/fa"; // Import FaPlus icon
import { MyContext } from "../../App";
import EmploymentSkel from "../skeleton/jobseeker/EmploymentSkel";
import { submitForm, updateForm, deleteForm } from "../../utils/form";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const Employment = () => {
  const { employmentRef } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true);
  const [employmentData, setEmploymentData] = useState([]);
  const [error, setError] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmploymentId, setEditingEmploymentId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    duration: "",
    workMode: "",
    noticePeriod: "",
    description: "",
    projects: [], // Projects will now be an array
  });

  const [currentProject, setCurrentProject] = useState(""); // State for individual project input
  const [editingProjectIndex, setEditingProjectIndex] = useState(null); // State to track which project is being edited

  const workModes = ["Full Time", "Part Time", "Internship", "Freelance", "Contract"];

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const jobSeekerId = userData._id || null;

  useEffect(() => {
    const getEmploymentDetails = async () => {
      if (!jobSeekerId) {
        setError("User ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${baseUrl}/job-seeker-experience-details/get-experience-details-by-id/${jobSeekerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw API Response (employment fetch):", data);

        let processedData;
        if (Array.isArray(data)) {
          processedData = data;
        } else if (data && data.resData !== undefined) {
          if (Array.isArray(data.resData)) {
            processedData = data.resData;
          } else if (data.resData !== null) {
            processedData = [data.resData];
          } else {
            processedData = [];
          }
        } else {
          processedData = [];
        }

        setEmploymentData(processedData);
        console.log("Processed employmentData for state:", processedData);

      } catch (err) {
        setError(err.message || "Failed to fetch employment details.");
        toast.error(err.message || "Failed to fetch employment details.");
      } finally {
        setIsLoading(false);
      }
    };

    getEmploymentDetails();
  }, [jobSeekerId]);

  const handleAddClick = () => {
    setEditingEmploymentId(null);
    setFormData({
      title: "",
      company: "",
      duration: "",
      workMode: "",
      noticePeriod: "",
      description: "",
      projects: [], // Reset projects to empty array
    });
    setCurrentProject(""); // Clear current project input
    setEditingProjectIndex(null); // Clear editing project index
    setShowAddForm(true);
  };

  const handleEditClick = (job) => {
    setShowAddForm(false);
    setEditingEmploymentId(job._id);
    setFormData({
      title: job.title,
      company: job.company,
      duration: job.duration,
      workMode: job.workMode,
      noticePeriod: job.noticePeriod || "",
      description: job.description || "",
      projects: Array.isArray(job.projects) ? job.projects : [], // Set projects as array
    });
    setCurrentProject("");
    setEditingProjectIndex(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Project Management Functions ---
  const handleAddProject = () => {
    if (currentProject.trim() === "") return;

    if (editingProjectIndex !== null) {
      // If editing an existing project
      const updatedProjects = [...formData.projects];
      updatedProjects[editingProjectIndex] = currentProject.trim();
      setFormData((prev) => ({ ...prev, projects: updatedProjects }));
      setEditingProjectIndex(null); // Exit edit mode
    } else {
      // If adding a new project
      setFormData((prev) => ({
        ...prev,
        projects: [...prev.projects, currentProject.trim()],
      }));
    }
    setCurrentProject(""); // Clear input field
  };

  const handleEditProject = (index) => {
    setCurrentProject(formData.projects[index]);
    setEditingProjectIndex(index);
  };

  const handleDeleteProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    // If the project being deleted was in edit mode, clear edit state
    if (editingProjectIndex === index) {
        setCurrentProject("");
        setEditingProjectIndex(null);
    }
  };
  // --- End Project Management Functions ---


  // Helper to process form data before sending to API (only projects array needed)
  const handleProcessFormDataForApi = (currentFormData) => {
    return {
      title: currentFormData.title,
      company: currentFormData.company,
      duration: currentFormData.duration,
      workMode: currentFormData.workMode,
      noticePeriod: currentFormData.noticePeriod,
      description: currentFormData.description,
      projects: currentFormData.projects, // Projects is already an array
    };
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    const payload = {
      ...handleProcessFormDataForApi(formData),
      jobSeekerId,
    };

    try {
      const data = await submitForm({
        url: `${baseUrl}/job-seeker-experience-details/create-experience-details`,
        payload: payload,
        setIsLoading,
        successMessage: "Employment added successfully!",
        resetForm: () => setFormData({ title: "", company: "", duration: "", workMode: "", noticePeriod: "", description: "", projects: [] }),
      });
      if (data && data.resData && data.resData.experienceDetails) {
        setEmploymentData((prev) => [...prev, data.resData.experienceDetails]);
      }
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to add employment.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    const payload = {
      ...handleProcessFormDataForApi(formData),
      jobSeekerId,
    };

    try {
      const data = await updateForm({
        url: `${baseUrl}/job-seeker-experience-details/update-experience-details-by-id/${editingEmploymentId}`,
        payload: payload,
        setIsLoading,
        successMessage: "Employment updated successfully!",
        resetForm: () => setFormData({ title: "", company: "", duration: "", workMode: "", noticePeriod: "", description: "", projects: [] }),
      });
      if (data && data.resData) {
        setEmploymentData((prev) =>
          prev.map((job) =>
            job._id === editingEmploymentId ? data.resData : job
          )
        );
      }
      setEditingEmploymentId(null);
      setShowAddForm(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to update employment.");
    }
  };

  const handleDelete = async (employmentId) => {
    setIsLoading(true);
    try {
      await deleteForm({
        url: `${baseUrl}/job-seeker-experience-details/delete-experience-details-by-id/${employmentId}`,
        setIsLoading,
        successMessage: "Employment deleted successfully!",
        onSuccess: async () => {
          setEmploymentData((prev) => prev.filter((job) => job._id !== employmentId));
        },
      });
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to delete employment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingEmploymentId(null);
    setFormData({ title: "", company: "", duration: "", workMode: "", noticePeriod: "", description: "", projects: [] });
    setCurrentProject("");
    setEditingProjectIndex(null);
    setError(null);
  };

  if (isLoading) {
    return <EmploymentSkel />;
  }

  const renderForm = (submitHandler, title) => (
    <div className="mt-6 p-4 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Employment Duration (e.g., Jan 2025 - Present (6 months))
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
          <label htmlFor="workMode" className="block text-sm font-medium text-gray-700">
            Work Mode
          </label>
          <select
            id="workMode"
            name="workMode"
            value={formData.workMode}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          >
            <option value="">Select Mode</option>
            {workModes.map((mode) => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700">
            Notice Period (Optional)
          </label>
          <input
            type="text"
            id="noticePeriod"
            name="noticePeriod"
            value={formData.noticePeriod}
            onChange={handleFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          ></textarea>
        </div>

        {/* --- Dynamic Projects Input --- */}
        <div>
          <label htmlFor="currentProject" className="block text-sm font-medium text-gray-700 mb-1">
            Projects
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="currentProject"
              value={currentProject}
              onChange={(e) => setCurrentProject(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent form submission
                  handleAddProject();
                }
              }}
              className="flex-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter project name"
            />
            <button
              type="button"
              onClick={handleAddProject}
              className="p-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition flex items-center justify-center"
              title={editingProjectIndex !== null ? "Update Project" : "Add Project"}
            >
              {editingProjectIndex !== null ? <FaPen /> : <FaPlus />}
            </button>
          </div>
          {formData.projects.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 max-h-40 overflow-y-auto custom-scrollbar p-1 border border-gray-200 rounded-md">
              {formData.projects.map((proj, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-sm border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  {proj}
                  <button
                    type="button"
                    onClick={() => handleEditProject(index)}
                    className="ml-2 text-gray-500 hover:text-yellow-600 focus:outline-none"
                    title="Edit Project"
                  >
                    <FaPen className="text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(index)}
                    className="ml-1 text-gray-500 hover:text-red-600 focus:outline-none"
                    title="Delete Project"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        {/* --- End Dynamic Projects Input --- */}

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
    <div className="bg-white rounded-md shadow-md p-6" ref={employmentRef}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Employment</h2>
        <button
          className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          title="Add Employment"
          onClick={handleAddClick}
        >
          Add employment
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {showAddForm && renderForm(handleAddSubmit, "Add New Employment")}

      {employmentData.map((job) =>
        editingEmploymentId === job._id ? (
          renderForm(handleUpdateSubmit, "Edit Employment")
        ) : (
          <div key={job._id} className="mb-6 border-b pb-4 last:border-b-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(job)}
                  className="p-2 text-gray-500 hover:text-yellow-400 transition"
                  title="Edit Employment"
                >
                  <FaPen className="text-lg" />
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="p-2 text-gray-500 hover:text-red-600 transition"
                  title="Delete Employment"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-1">{job.company}</p>
            <p className="text-sm text-gray-400 mt-1">
              {job.duration}
              {job.workMode && <span className="ml-2">| {job.workMode}</span>}
            </p>
            {job.noticePeriod && (
              <p className="text-sm text-gray-400 mt-1">{job.noticePeriod}</p>
            )}
            <p className="text-sm text-gray-700 mt-2">
              {job.description}
              <button className="text-yellow-400 ml-1 hover:text-yellow-600 cursor-pointer">
                Read More
              </button>
            </p>
            {job.projects && job.projects.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 font-medium">Projects:</span>
                {job.projects.map((proj, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Employment;