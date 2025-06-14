import { useState, useEffect, useContext } from "react";
import { FaPen } from "react-icons/fa";
import LanguageDetailsSkel from "../skeleton/jobseeker/LanguageDetailsSkel";
import { MyContext } from "../../Layout/ProfileLayout";

const Tick = () => <span className="text-yellow-400 text-lg font-bold">✓</span>;

const LanguageDetails = () => {
  const { languageRef } = useContext(MyContext);

  const [isLoading, setIsLoading] = useState(true);
  
  const [languages, setLanguages] = useState([
    {
      name: "Hindi",
      proficiency: "Expert",
      read: true,
      write: true,
      speak: true,
    },
    {
      name: "English",
      proficiency: "Proficient",
      read: true,
      write: true,
      speak: true,
    },
  ]);
 

  const [showLanguageForm, setShowLanguageForm] = useState(false);
  const [editingLanguageIndex, setEditingLanguageIndex] = useState(null);
  const [languageFormData, setLanguageFormData] = useState({
    name: "",
    proficiency: "",
    read: false,
    write: false,
    speak: false,
  });

  // Simulate data fetching
  useEffect(() => {
    const fetchLanguageData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchLanguageData();
  }, []);

 
  // Handlers for Languages
  const handleAddLanguageClick = () => {
    setShowLanguageForm(true);
    setEditingLanguageIndex(null); // Indicates adding new language
    setLanguageFormData({
      name: "",
      proficiency: "",
      read: false,
      write: false,
      speak: false,
    }); // Clear form 
  };

  const handleEditLanguageClick = (index) => {
    setShowLanguageForm(true);
    setEditingLanguageIndex(index);
    setLanguageFormData(languages[index]); // Load current language data into form 
  };

  const handleLanguageFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLanguageFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddLanguageSubmit = (e) => {
    e.preventDefault();
    setLanguages((prev) => [...prev, languageFormData]);
    setShowLanguageForm(false);
  };

  const handleUpdateLanguageSubmit = (e) => {
    e.preventDefault();
    const updatedLanguages = [...languages];
    updatedLanguages[editingLanguageIndex] = languageFormData;
    setLanguages(updatedLanguages);
    setShowLanguageForm(false);
    setEditingLanguageIndex(null);
  };

  const handleLanguageFormCancel = () => {
    setShowLanguageForm(false);
    setEditingLanguageIndex(null);
    setLanguageFormData({
      name: "",
      proficiency: "",
      read: false,
      write: false,
      speak: false,
    }); // Clear form
  };

  if (isLoading) {
    return <LanguageDetailsSkel />;
  }

 

  const renderLanguageForm = () => (
    <div className="mt-6 p-4 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {editingLanguageIndex !== null ? "Edit Language" : "Add New Language"}
      </h3>
      <form
        onSubmit={
          editingLanguageIndex !== null
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
            <option value="Expert">Expert</option>
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

      { showLanguageForm ? null : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
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
                {languages.map((lang, idx) => (
                  <tr key={idx} className="border-b border-gray-300">
                    <td className="py-3 pr-4">{lang.name}</td>
                    <td className="py-3 pr-4">{lang.proficiency}</td>
                    <td className="py-3 pr-4">{lang.read && <Tick />}</td>
                    <td className="py-3 pr-4">{lang.write && <Tick />}</td>
                    <td className="py-3 pr-4">{lang.speak && <Tick />}</td>
                    <td className="py-3 pr-4">
                      <button
                        onClick={() => handleEditLanguageClick(idx)}
                        className="p-1 text-gray-500 hover:text-yellow-400 transition"
                        title="Edit Language"
                      >
                        <FaPen className="text-lg" />
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