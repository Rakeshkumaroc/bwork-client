// src/components/KeySkills.jsx
import { useContext, useState, useEffect } from "react";
import { FaPen, FaTimes, FaPlus } from "react-icons/fa";
import { MyContext } from "../../App";
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
  const [editSkillId, setEditSkillId] = useState(null); // Track skill being edited

  const levels = ["beginner", "intermediate", "advanced", "expert"];

  // Get jobSeekerId from localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const jobSeekerId = userData._id || null;

  useEffect(() => {
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    const fetchSkills = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/job-seeker-skills/get-skill-sets-by-job-seeker-id/${jobSeekerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add authorization header if needed
              // "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch skills");
        }

        const { success, resData } = await response.json();
        if (success && resData) {
          setSkills(resData);
        } else {
          setError("No skills found for this user.");
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError(err.message);
      }
    };

    fetchSkills();
  }, [jobSeekerId]);

  const handleFormToggle = () => {
    setFormData({ skill: "", level: "", experience: "" });
    setEditSkillId(null); // Reset for adding new skill
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

    const newSkill = {
      skill: formData.skill,
      level: formData.level,
      experience: Number(formData.experience) || 0,
      jobSeekerId,
    };

    try {
      const response = await fetch(
        `${baseUrl}/job-seeker-skills/add-job-seeker-skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSkill),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add skill");
      }
      const addedSkill = await response.json();
      console.log("addedSkill", addedSkill);

      setSkills([...skills, addedSkill]);
      setIsFormVisible(false);
      setFormData({ skill: "", level: "", experience: "" });
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

    const updatedSkill = {
      skill: formData.skill,
      level: formData.level,
      experience: Number(formData.experience) || 0,
      jobSeekerId,
    };
    console.log("editSkillId", editSkillId);

    try {
      const response = await fetch(
        `${baseUrl}/job-seeker-skills/update-skill/${editSkillId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSkill),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update skill");
      }

      const updatedSkillData = await response.json();
      setSkills(
        skills.map((skill) =>
          skill._id === editSkillId ? updatedSkillData : skill
        )
      );
      setIsFormVisible(false);
      setFormData({ skill: "", level: "", experience: "" });
      setEditSkillId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setFormData({ skill: "", level: "", experience: "" });
    setEditSkillId(null);
    setError(null);
  };

  return (
    <div className="bg-cream p-6 rounded-xl shadow border" ref={keySkillsRef}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Key Skills</h2>
        {!isFormVisible && (
          <FaPlus
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
            size={14}
            onClick={handleFormToggle}
            title="Add Skill"
          />
        )}
      </div>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="flex items-center px-4 py-1 text-sm border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            <span>{`${skill.skill} (${skill.level}, ${skill.experience} yrs)`}</span>
            <FaPen
              className="ml-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              size={12}
              onClick={() => handleEdit(skill)}
              title="Edit"
            />
            <FaTimes
              className="ml-2 text-gray-300 cursor-not-allowed"
              size={12}
              title="Delete (Disabled)"
            />
          </div>
        ))}
        {isFormVisible && (
          <div className="flex items-center px-4 py-1 text-sm border border-gray-300 rounded-full bg-white">
            <form
              onSubmit={editSkillId ? handleUpdate : handleSubmit}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                name="skill"
                value={formData.skill}
                onChange={handleFormChange}
                className="p-1 text-sm border rounded w-24"
                placeholder="Skill"
                required
              />
              <select
                name="level"
                value={formData.level}
                onChange={handleFormChange}
                className="p-1 text-sm border rounded w-28"
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
                className="p-1 text-sm border rounded w-16"
                placeholder="Yrs"
                min="0"
                required
              />
              <button
                type="submit"
                className="text-green-600 hover:text-green-800"
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
