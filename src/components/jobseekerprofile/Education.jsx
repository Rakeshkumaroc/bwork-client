import { useContext, useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { MyContext } from "../../App";
import EducationSkel from "../skeleton/jobseeker/EducationSkel";

const Education = () => {
  const { educationRef } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [educationData, setEducationData] = useState([
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
  ]);

  // Simulate data fetching (replace with actual API call if needed)
  useEffect(() => {
    const fetchEducationData = async () => {
      // Simulate a delay for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust delay as needed
    };

    fetchEducationData();
  }, []);

  if (isLoading) {
    return (
     <EducationSkel/>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6" ref={educationRef}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
        <button
          className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          title="Add Education"
        >
          Add education
        </button>
      </div>

      {educationData.map((edu, index) => (
        <div key={index} className="mb-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
            <button
              className="p-2 text-gray-500 hover:text-yellow-400 transition"
              title="Edit Education"
            >
              <FaPen className="text-lg" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">{edu.institution}</p>
          <p className="text-sm text-gray-400 mt-1">
            {edu.duration}
            {edu.mode && <span className="ml-2">| {edu.mode}</span>}
          </p>
        </div>
      ))}

      <div className="mt-6 space-y-2">
        <button
          className="text-sm text-yellow-400 font-medium hover:text-yellow-600 cursor-pointer block"
          title="Add Doctorate/PhD"
        >
          Add doctorate/PhD
        </button>
        <button
          className="text-sm text-yellow-400 font-medium hover:text-yellow-600 cursor-pointer block"
          title="Add Class X"
        >
          Add class X
        </button>
      </div>
    </div>
  );
};

export default Education;