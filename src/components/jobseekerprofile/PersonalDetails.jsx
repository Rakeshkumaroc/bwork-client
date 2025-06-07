import { useContext } from "react";
import { FaPen } from "react-icons/fa";
import { MyContext } from "../../App";

const personalDetails = {
  gender: "male",
  maritalStatus: "Single / unmarried",
  dob: "31 Aug 2003",
  category: "OBC - Creamy",
  differentlyAbled: "No",
  careerBreak: "No",
  workPermit: "India",
  address: "Pune, Maharashtra, sheikhupura, bihar , 811105",
};

const languages = [
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
];

const Tick = () => (
  <span className="text-green-600 text-lg font-bold">&#10003;</span>
);

const PersonalDetails = () => {
        const {personalRef } = useContext(MyContext);
  
  return (
    <div className="bg-cream p-6 rounded-xl shadow border " ref={personalRef}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Personal details
        </h2>
        <FaPen size={14} className="text-gray-400 cursor-pointer" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-sm text-gray-700">
        <div>
          <strong>Personal</strong>
          <br />
          {personalDetails.gender}, {personalDetails.maritalStatus},{" "}
          <span className="text-blue-600 cursor-pointer">Add more info</span>
        </div>
        <div>
          <strong>Career break</strong>
          <br />
          {personalDetails.careerBreak}
        </div>

        <div>
          <strong>Date of birth</strong>
          <br />
          {personalDetails.dob}
        </div>
        <div>
          <strong>Work permit</strong>
          <br />
          {personalDetails.workPermit}
        </div>

        <div>
          <strong>Category</strong>
          <br />
          {personalDetails.category}
        </div>
        <div>
          <strong>Address</strong>
          <br />
          <span className="font-medium text-black">
            {personalDetails.address}
          </span>
        </div>

        <div>
          <strong>Differently abled</strong>
          <br />
          {personalDetails.differentlyAbled}
        </div>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">Languages</h3>
        <span className="text-blue-600 text-sm cursor-pointer">
          Add languages
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 pr-4">Languages</th>
              <th className="py-2 pr-4">Proficiency</th>
              <th className="py-2 pr-4">Read</th>
              <th className="py-2 pr-4">Write</th>
              <th className="py-2 pr-4">Speak</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang, idx) => (
              <tr key={idx} className="border-b">
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
