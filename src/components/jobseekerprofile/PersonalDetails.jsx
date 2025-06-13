import { useContext, useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { MyContext } from "../../App";
import PersonalDetailsSkel from "../skeleton/jobseeker/PersonalDetailsSkel";

const Tick = () => (
  <span className="text-yellow-400 text-lg font-bold">✓</span>
);

const PersonalDetails = () => {
  const { personalRef } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [personalDetails, setPersonalDetails] = useState({
    gender: "male",
    maritalStatus: "Single / unmarried",
    dob: "31 Aug 2003",
    category: "OBC - Creamy",
    differentlyAbled: "No",
    careerBreak: "No",
    workPermit: "India",
    address: "Pune, Maharashtra, sheikhupura, bihar , 811105",
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

  // Simulate data fetching (replace with actual API call if needed)
  useEffect(() => {
    const fetchPersonalData = async () => {
      // Simulate a delay for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust delay as needed
    };

    fetchPersonalData();
  }, []);

  if (isLoading) {
    return (
     <PersonalDetailsSkel/>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6" ref={personalRef}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Personal Details</h2>
        <button
          className="p-2 text-gray-500 hover:text-yellow-400 transition"
          title="Edit Personal Details"
        >
          <FaPen className="text-lg" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-sm text-gray-700">
        <div>
          <strong className="text-gray-800">Personal</strong>
          <br />
          {personalDetails.gender}, {personalDetails.maritalStatus},{" "}
          <button
            className="text-yellow-400 hover:text-yellow-600 cursor-pointer"
            title="Add More Info"
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
          <span className="font-medium text-gray-800">{personalDetails.address}</span>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalDetails;