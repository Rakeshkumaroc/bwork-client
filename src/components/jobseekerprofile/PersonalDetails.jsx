import { useState, useEffect, useContext } from "react";
import { FaPen } from "react-icons/fa"; 
import { MyContext } from "../../App";  
import PersonalDetailsSkel from "../skeleton/jobseeker/PersonalDetailsSkel";

const Tick = () => <span className="text-yellow-400 text-lg font-bold">✓</span>;

const PersonalDetails = () => {
  const { personalRef } = useContext(MyContext); 
 

  const [isLoading, setIsLoading] = useState(true);
  const [personalDetails, setPersonalDetails] = useState({
    gender: "male",
    maritalStatus: "Single / unmarried",
    dob: "31 Aug 2003",
    category: "OBC - Creamy",
    differentlyAbled: "No",
    careerBreak: "No",
    workPermit: "India",
    address: "Pune, Maharashtra, Sheikhupura, Bihar, 811105",
  });
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

  const [showPersonalDetailsForm, setShowPersonalDetailsForm] = useState(false);
  const [personalFormData, setPersonalFormData] = useState(personalDetails);

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
    const fetchPersonalData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchPersonalData();
  }, []);

  // Handlers for Personal Details
  const handleEditPersonalDetailsClick = () => {
    setShowPersonalDetailsForm(true);
    setPersonalFormData(personalDetails); // Load current data into form
    setShowLanguageForm(false); // Hide language form if open
    setEditingLanguageIndex(null); // Clear language editing state
  };

  const handlePersonalFormChange = (e) => {
    const { name, value } = e.target;
    setPersonalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePersonalFormSubmit = (e) => {
    e.preventDefault();
    setPersonalDetails(personalFormData);
    setShowPersonalDetailsForm(false);
  };

  const handlePersonalFormCancel = () => {
    setShowPersonalDetailsForm(false);
    setPersonalFormData(personalDetails); // Reset form data to original
  };

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
    setShowPersonalDetailsForm(false); // Hide personal details form if open
  };

  const handleEditLanguageClick = (index) => {
    setShowLanguageForm(true);
    setEditingLanguageIndex(index);
    setLanguageFormData(languages[index]); // Load current language data into form
    setShowPersonalDetailsForm(false); // Hide personal details form if open
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
 
    return <PersonalDetailsSkel />;
  }

 

  const renderPersonalDetailsForm = () => (
    <div className="mt-6 p-4 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Edit Personal Details
      </h3>
      <form onSubmit={handlePersonalFormSubmit} className="space-y-4 text-sm">
        <div>
          <label htmlFor="gender" className="block font-medium text-gray-700">
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={personalFormData.gender}
            onChange={handlePersonalFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="maritalStatus"
            className="block font-medium text-gray-700"
          >
            Marital Status
          </label>
          <input
            type="text"
            id="maritalStatus"
            name="maritalStatus"
            value={personalFormData.maritalStatus}
            onChange={handlePersonalFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="dob" className="block font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="text"
            id="dob"
            name="dob"
            value={personalFormData.dob}
            onChange={handlePersonalFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={personalFormData.category}
            onChange={handlePersonalFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="differentlyAbled"
            className="block font-medium text-gray-700"
          >
            Differently Abled
          </label>
          <input
            type="text"
            id="differentlyAbled"
            name="differentlyAbled"
            value={personalFormData.differentlyAbled}
            onChange={handlePersonalFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="careerBreak"
            className="block font-medium text-gray-700"
          >
            Career Break
          </label>
          <input
            type="text"
            id="careerBreak"
            name="careerBreak"
            value={personalFormData.careerBreak}
            onChange={handlePersonalFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="workPermit"
            className="block font-medium text-gray-700"
          >
            Work Permit
          </label>
          <input
            type="text"
            id="workPermit"
            name="workPermit"
            value={personalFormData.workPermit}
            onChange={handlePersonalFormChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={personalFormData.address}
            onChange={handlePersonalFormChange}
            rows="3"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
            required
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handlePersonalFormCancel}
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
            <option value="Proficient">Proficient</option>
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
    <div className="bg-white rounded-md shadow-md p-6" ref={personalRef}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Personal Details
        </h2>
        <button
          className="p-2 text-gray-500 hover:text-yellow-400 transition"
          title="Edit Personal Details"
          onClick={handleEditPersonalDetailsClick}
        >
          <FaPen className="text-lg" />
        </button>
      </div>

      {showPersonalDetailsForm || showLanguageForm ? null : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-sm text-gray-700">
            <div>
              <strong className="text-gray-800">Personal</strong>
              <br />
              {personalDetails.gender}, {personalDetails.maritalStatus},{" "}
              <button
                className="text-yellow-400 hover:text-yellow-600 cursor-pointer"
                title="Add More Info"
                onClick={handleEditPersonalDetailsClick} // Can lead to edit form
              >
                Add more info
              </button>
            </div>
            <div>
              <strong className="text-gray-800">Career Break</strong>
              <br />
              {personalDetails.careerBreak}
            </div>

            <div>
              <strong className="text-gray-800">Date of Birth</strong>
              <br />
              {personalDetails.dob}
            </div>
            <div>
              <strong className="text-gray-800">Work Permit</strong>
              <br />
              {personalDetails.workPermit}
            </div>

            <div>
              <strong className="text-gray-800">Category</strong>
              <br />
              {personalDetails.category}
            </div>
            <div>
              <strong className="text-gray-800">Address</strong>
              <br />
              <span className="font-medium text-gray-800">
                {personalDetails.address}
              </span>
            </div>

            <div>
              <strong className="text-gray-800">Differently Abled</strong>
              <br />
              {personalDetails.differentlyAbled}
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Languages</h3>
            <button
              className="text-sm text-yellow-400 font-medium hover:text-yellow-600 cursor-pointer"
              title="Add Languages"
              onClick={handleAddLanguageClick}
            >
              Add languages
            </button>
          </div>

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

      {showPersonalDetailsForm && renderPersonalDetailsForm()}
      {showLanguageForm && renderLanguageForm()}
    </div>
  );
};

export default PersonalDetails;
