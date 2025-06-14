import { useState, useEffect, useContext } from "react";
import { FaPen, FaTimes } from "react-icons/fa"; // FaTimes added for delete button
import LanguageDetailsSkel from "../skeleton/jobseeker/LanguageDetailsSkel";
import { MyContext } from "../../Layout/ProfileLayout";
import { submitForm, updateForm, deleteForm } from "../../utils/form"; // Import form utilities
import { fetchData } from "../../utils/api"; // Import fetchData utility
import { toast } from "react-toastify"; // Import toast for notifications

const baseUrl = import.meta.env.VITE_APP_URL;

const Tick = () => <span className="text-yellow-400 text-lg font-bold">✓</span>;

const LanguageDetails = () => {
  const { languageRef } = useContext(MyContext);

  const [isLoading, setIsLoading] = useState(true);
  const [languages, setLanguages] = useState([]); // Initialize as empty array, data will be fetched
  const [error, setError] = useState(null);

  const [showLanguageForm, setShowLanguageForm] = useState(false);
  const [editingLanguageId, setEditingLanguageId] = useState(null); // Use ID instead of index
  const [languageFormData, setLanguageFormData] = useState({
    name: "",
    proficiency: "",
    read: false,
    write: false,
    speak: false,
  });

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const jobSeekerId = userData._id || null;

  // --- Fetch Languages on Component Mount ---
  useEffect(() => {
    const getLanguageDetails = async () => {
      if (!jobSeekerId) {
        setError("User ID not found. Please log in again.");
        setIsLoading(false);
        return;
      }

      setError(null); // Clear previous errors
      setIsLoading(true); // Set loading state before fetching

      try {
        // Use the fetchData utility to get language details
        await fetchData(
          `${baseUrl}/languages/get-languages-by-job-seeker-id/${jobSeekerId}`, // Assuming this GET endpoint
          setLanguages, // Callback to set the fetched data
          setIsLoading, // Callback to set loading state
          setError // Callback to set error state
        );
      } catch (err) {
        toast.error(err.message || "Failed to fetch languages.");
      } finally {
        setIsLoading(false); // Ensure loading is off even if fetchData fails
      }
    };

    getLanguageDetails();
  }, [jobSeekerId]); // Dependency on jobSeekerId

  // --- Handlers for Languages ---
  const handleAddLanguageClick = () => {
    setShowLanguageForm(true);
    setEditingLanguageId(null); // Indicates adding new language
    setLanguageFormData({
      name: "",
      proficiency: "",
      read: false,
      write: false,
      speak: false,
    }); // Clear form
    setError(null); // Clear previous errors
  };

  const handleEditLanguageClick = (language) => { // Pass the full language object
    setShowLanguageForm(true);
    setEditingLanguageId(language._id); // Set ID for editing
    setLanguageFormData(language); // Load current language data into form
    setError(null); // Clear previous errors
  };

  const handleLanguageFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLanguageFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddLanguageSubmit = async (e) => {
    e.preventDefault();
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      toast.error("User ID not found. Please log in again.");
      return;
    }

    const payload = {
      ...languageFormData,
      jobSeekerId,
    };

    try {
      const data = await submitForm({
        url: `${baseUrl}/languages/create-Language`, // Your POST endpoint
        payload: payload,
        setIsLoading,
        successMessage: "Language added successfully!",
        resetForm: () => setLanguageFormData({ name: "", proficiency: "", read: false, write: false, speak: false }),
      });

      if (data && data.resData && data.resData.languageDetails) {
        setLanguages((prev) => [...prev, data.resData.languageDetails]); // Add the new language with its _id
      } else {
        toast.error("Failed to add language: Incomplete response from server.");
      }
      setShowLanguageForm(false);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to add language.");
    }
  };

  const handleUpdateLanguageSubmit = async (e) => {
    e.preventDefault();
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      toast.error("User ID not found. Please log in again.");
      return;
    }
    if (!editingLanguageId) {
      setError("No language selected for update.");
      toast.error("No language selected for update.");
      return;
    }

    const payload = {
      ...languageFormData,
      jobSeekerId, // Include jobSeekerId as per your backend controller
    };

    try {
      const data = await updateForm({
        url: `${baseUrl}/languages/update-language/${editingLanguageId}`, // Your PUT endpoint
        payload: payload,
        setIsLoading,
        successMessage: "Language updated successfully!",
        resetForm: () => setLanguageFormData({ name: "", proficiency: "", read: false, write: false, speak: false }),
      });

      if (data && data.resData) {
        setLanguages((prev) =>
          prev.map((lang) =>
            lang._id === editingLanguageId ? data.resData : lang // Replace the updated language
          )
        );
      } else {
        toast.error("Failed to update language: Incomplete response from server.");
      }
      setShowLanguageForm(false);
      setEditingLanguageId(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to update language.");
    }
  };

  const handleDeleteLanguage = async (languageId) => {
    setIsLoading(true); // Set loading while deleting
    try {
      await deleteForm({
        url: `${baseUrl}/languages/delete-language/${languageId}`, // Your DELETE endpoint
        setIsLoading,
        successMessage: "Language deleted successfully!",
        onSuccess: () => {
          setLanguages((prev) => prev.filter((lang) => lang._id !== languageId)); // Filter out the deleted language
        },
      });
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Failed to delete language.");
    } finally {
      setIsLoading(false); // Ensure loading is off after deletion attempt
    }
  };

  const handleLanguageFormCancel = () => {
    setShowLanguageForm(false);
    setEditingLanguageId(null);
    setLanguageFormData({
      name: "",
      proficiency: "",
      read: false,
      write: false,
      speak: false,
    }); // Clear form
    setError(null); // Clear previous errors
  };

  if (isLoading) {
    return <LanguageDetailsSkel />;
  }

  const renderLanguageForm = () => (
    <div className="mt-6 p-4 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {editingLanguageId !== null ? "Edit Language" : "Add New Language"}
      </h3>
      <form
        onSubmit={
          editingLanguageId !== null
            ? handleUpdateLanguageSubmit
            : handleAddLanguageSubmit
        }
        className="space-y-4 text-sm"
      >
        <div>
          <label
            htmlFor="languageName"
            className="block font-medium text-gray-700"
          >
            Language Name
          </label>
          <input
            type="text"
            id="languageName"
            name="name"
            value={languageFormData.name}
            onChange={handleLanguageFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="proficiency"
            className="block font-medium text-gray-700"
          >
            Proficiency
          </label>
          <select
            id="proficiency"
            name="proficiency"
            value={languageFormData.proficiency}
            onChange={handleLanguageFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          >
            <option value="">Select proficiency</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Proficient">Proficient</option>
            <option value="Expert">Expert</option> {/* Added Expert based on your KeySkills levels */}
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="read"
              checked={languageFormData.read}
              onChange={handleLanguageFormChange}
              className="form-checkbox h-4 w-4 text-yellow-400 rounded focus:ring-yellow-500"
            />
            <span className="ml-2 text-gray-700">Read</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="write"
              checked={languageFormData.write}
              onChange={handleLanguageFormChange}
              className="form-checkbox h-4 w-4 text-yellow-400 rounded focus:ring-yellow-500"
            />
            <span className="ml-2 text-gray-700">Write</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="speak"
              checked={languageFormData.speak}
              onChange={handleLanguageFormChange}
              className="form-checkbox h-4 w-4 text-yellow-400 rounded focus:ring-yellow-500"
            />
            <span className="ml-2 text-gray-700">Speak</span>
          </label>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleLanguageFormCancel}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          >
            Save Language
          </button>
        </div>
      </form>
    </div>
  );

  // --- Main Render ---

  return (
    <div className="bg-white rounded-md shadow-md p-6" ref={languageRef}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Languages</h2>
        <button
          className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          title="Add Languages"
          onClick={handleAddLanguageClick}
        >
          Add languages
        </button>
      </div>

      {error && (
        <p className="text-yellow-600 text-sm mb-4">Data not available</p>
      )}

      {showLanguageForm ? null : (
        <>
          <div className="overflow-x-auto">
            <table className=" w-full text-sm text-left">
              <thead className="">
                <tr className="text-gray-500 border-b border-gray-300">
                  <th className="py-2 pr-4">Languages</th>
                  <th className="py-2 pr-4">Proficiency</th>
                  <th className="py-2 pr-4">Read</th>
                  <th className="py-2 pr-4">Write</th>
                  <th className="py-2 pr-4">Speak</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {languages.map((lang) => (
                  <tr key={lang._id} className="border-b border-gray-300"> {/* Use _id for key */}
                    <td className="py-3 pr-4">{lang.name}</td>
                    <td className="py-3 pr-4">{lang.proficiency}</td>
                    <td className="py-3 pr-4">{lang.read && <Tick />}</td>
                    <td className="py-3 pr-4">{lang.write && <Tick />}</td>
                    <td className="py-3 pr-4">{lang.speak && <Tick />}</td>
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => handleEditLanguageClick(lang)}  
                        className="p-1 text-gray-500 hover:text-yellow-400 transition"
                        title="Edit Language"
                      >
                        <FaPen className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDeleteLanguage(lang._id)} 
                        className="p-1 text-gray-500 hover:text-red-600 transition ml-2"
                        title="Delete Language"
                      >
                        <FaTimes className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showLanguageForm && renderLanguageForm()}
    </div>
  );
};

export default LanguageDetails;
