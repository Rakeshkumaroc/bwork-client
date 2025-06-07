import { useContext } from "react";
import { MyContext } from "../../App";

const Resume = () => {
  const { resumeRef } = useContext(MyContext);
  return (
    <div className="bg-cream p-6 rounded-xl shadow border" ref={resumeRef}>
      <h3 className="text-xl font-semibold mb-2">Resume</h3>
      <p className="text-sm text-gray-500">My Resume 2.pdf</p>
      <p className="text-xs text-gray-400 mb-4">Uploaded on Feb 06, 2025</p>
      <button className="px-4 py-2 text-sm border border-blue-500 text-blue-600 rounded hover:bg-blue-50">
        Update resume
      </button>
      <p className="text-xs text-gray-400 mt-2">
        Supported Formats: doc, docx, rtf, pdf, upto 2 MB
      </p>
    </div>
  );
};

export default Resume;
