import { useContext, useState, useEffect } from "react";
import { FaPen, FaTimes, FaPlus } from "react-icons/fa";
import { MyContext } from "../../App";
import KeySkillSkel from "../skeleton/jobseeker/KeySkillSkel";
import { deleteForm, submitForm, updateForm } from "../../utils/form";
import { fetchData } from "../../utils/api";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_APP_URL;

const KeySkills = () => {
  const { keySkillsRef } = useContext(MyContext);
  const [skills, setSkills] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    skill: "",
    level: "",
    experience: "",
  });
  const [error, setError] = useState(null);
  const [editSkillId, setEditSkillId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const levels = ["beginner", "intermediate", "advanced", "expert"];

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const jobSeekerId = userData._id || null;

  useEffect(() => {
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      setIsLoading(false);
      return;
    }

    // Use fetchData utility for initial skill retrieval
    fetchData(
      `${baseUrl}/job-seeker-skills/get-skill-sets-by-job-seeker-id/${jobSeekerId}`,
      setSkills,
      setIsLoading,
      setError
    );
  }, [jobSeekerId]);

  const handleFormToggle = () => {
    setFormData({ skill: "", level: "", experience: "" });
    setEditSkillId(null);
    setIsFormVisible(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    const newSkillPayload = {
      skill: formData.skill,
      level: formData.level,
      experience: Number(formData.experience) || 0,
      jobSeekerId,
    };

    try {
      const data = await submitForm({
        url: `${baseUrl}/job-seeker-skills/add-job-seeker-skills`,
        payload: newSkillPayload,
        setIsLoading,
        successMessage: "Skill added successfully!",
        resetForm: () => setFormData({ skill: "", level: "", experience: "" }),
      });

      // Crucial fix: Combine the submitted formData with the _id from the backend response.
      // This ensures the new skill object has all properties (skill, level, experience, _id)
      // immediately after creation, preventing "undefined" display issues.
      if (data && data.resData && data.resData._id) {
        setSkills((prevSkills) => [
          ...prevSkills,
          { ...newSkillPayload, _id: data.resData._id },
        ]);
      } else if (data && data.resData) {
        // Fallback: If resData exists but no _id, assume resData is the full object (less common for "add").
        setSkills((prevSkills) => [...prevSkills, data.resData]);
      } else {
        // If data.resData is entirely missing or null, inform the user about an incomplete response.
        toast.error("Server response for adding skill was incomplete.");
      }
      setIsFormVisible(false);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      skill: skill.skill,
      level: skill.level,
      experience: skill.experience.toString(),
    });
    setEditSkillId(skill._id);
    setIsFormVisible(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    const updatedSkillPayload = {
      skill: formData.skill,
      level: formData.level,
      experience: Number(formData.experience) || 0,
      jobSeekerId,
    };

    try {
      const data = await updateForm({
        url: `${baseUrl}/job-seeker-skills/update-skill/${editSkillId}`,
        payload: updatedSkillPayload,
        setIsLoading,
        successMessage: "Skill updated successfully!",
        resetForm: () => setFormData({ skill: "", level: "", experience: "" }),
      });

      if (data && data.resData) {
        // For updates, the backend typically returns the full updated object.
        // We merge the payload with the server response to be robust, ensuring all fields are present.
        setSkills((prevSkills) =>
          prevSkills.map((skill) =>
            skill._id === editSkillId
              ? { ...updatedSkillPayload, ...data.resData }
              : skill
          )
        );
      } else {
        // If data.resData is missing for update, fall back to the local payload.
        // This ensures the UI updates, but relies on client-side state for the full object.
        setSkills((prevSkills) =>
          prevSkills.map((skill) =>
            skill._id === editSkillId
              ? { ...updatedSkillPayload, _id: editSkillId } // Preserve the _id
              : skill
          )
        );
        toast.error("Incomplete response from server after updating skill.");
      }
      setIsFormVisible(false);
      setEditSkillId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (skillId) => {
    setIsLoading(true);
    try {
      await deleteForm({
        url: `${baseUrl}/job-seeker-skills/delete-skill/${skillId}`,
        setIsLoading,
        successMessage: "Skill deleted successfully!",
        onSuccess: async () => {
          setSkills(skills.filter((skill) => skill._id !== skillId));
        },
      });
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to delete skill.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormData({ skill: "", level: "", experience: "" });
    setEditSkillId(null);
    setError(null);
  };

  if (isLoading) {
    return <KeySkillSkel />;
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6" ref={keySkillsRef}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Key Skills</h2>
        {!isFormVisible && (
          <button
            className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
            onClick={handleFormToggle}
            title="Add key skills"
          >
            Add key skills
          </button>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            <span>{`${skill.skill} (${skill.level}, ${skill.experience} yrs)`}</span>
            <button
              className="ml-2 text-gray-500 hover:text-yellow-400"
              onClick={() => handleEdit(skill)}
              title="Edit"
            >
              <FaPen size={12} />
            </button>
            <button
              className="ml-2 text-gray-500 hover:text-red-600"
              onClick={() => handleDelete(skill._id)}
              title="Delete"
            >
              <FaTimes size={12} />
            </button>
          </div>
        ))}
        {isFormVisible && (
          <div className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-full bg-white">
            <form
              onSubmit={editSkillId ? handleUpdate : handleSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                name="skill"
                value={formData.skill}
                onChange={handleFormChange}
                className="p-1 text-sm border border-gray-300 rounded focus:border-yellow-400 outline-none w-24"
                placeholder="Skill"
                required
              />
              <select
                name="level"
                value={formData.level}
                onChange={handleFormChange}
                className="p-1 text-sm border border-gray-300 rounded focus:border-yellow-400 outline-none w-28"
                required
              >
                <option value="">Level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleFormChange}
                className="p-1 text-sm border border-gray-300 rounded focus:border-yellow-400 outline-none w-16"
                placeholder="Yrs"
                min="0"
                required
              />
              <button
                type="submit"
                className="text-yellow-400 hover:text-yellow-600"
                title="Save"
              >
                <FaPen size={12} />
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-red-600 hover:text-red-800"
                title="Cancel"
              >
                <FaTimes size={12} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeySkills;
