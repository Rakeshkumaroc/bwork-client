import { useContext } from "react";
import { FaPen } from "react-icons/fa";
import { MyContext } from "../../App";

const educationData = [
  {
    degree: "MCA Computers",
    institution: "Swami Vivekananda University, Kolkata",
    duration: "2024–2026",
    mode: "correspondence",
  },
  {
    degree: "BCA Computers",
    institution: "Aryabhatta Knowledge University, Patna",
    duration: "2020–2023",
    mode: "Full Time",
  },
  {
    degree: "Class XII",
    institution: "Bihar",
    duration: "2020",
  },
];

const Education = () => {
    const {educationRef } = useContext(MyContext);
  
  return (
   <div className="bg-cream p-6 rounded-xl shadow border " ref={educationRef}> 
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Education</h2>
        <span className="text-sm text-blue-600 font-medium cursor-pointer">
          Add education
        </span>
      </div>

      {educationData.map((edu, index) => (
        <div key={index} className="mb-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
            <FaPen className="text-gray-400 hover:text-gray-600 cursor-pointer" size={14} />
          </div>
          <p className="text-sm text-gray-700 mt-1">{edu.institution}</p>
          <p className="text-sm text-gray-500 mt-1">
            {edu.duration}
            {edu.mode && <span className="ml-2">| {edu.mode}</span>}
          </p>
        </div>
      ))}

      <div className="mt-6 space-y-2">
        <span className="text-sm text-blue-600 font-medium cursor-pointer block">
          Add doctorate/PhD
        </span>
        <span className="text-sm text-blue-600 font-medium cursor-pointer block">
          Add class X
        </span>
      </div>
    </div>
  );
};

export default Education;
