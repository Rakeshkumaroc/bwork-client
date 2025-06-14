import { useContext, useState, useEffect } from "react"; 
import ResumeSkel from "../skeleton/jobseeker/ResumeSkel";
import { MyContext } from "../../Layout/ProfileLayout";

const Resume = () => {
  const { resumeRef } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [resumeData, setResumeData] = useState({
    fileName: "My Resume 2.pdf",
    uploadDate: "2025-02-06",
  });

  // Simulate data fetching (replace with actual API call if needed)
  useEffect(() => {
    const fetchResumeData = async () => {
      // Simulate a delay for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust delay as needed
    };

    fetchResumeData();
  }, []);

  if (isLoading) {
    return (
    <ResumeSkel/>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6" ref={resumeRef}>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">Resume</h3>
      <p className="text-sm text-gray-600">{resumeData.fileName}</p>
      <p className="text-xs text-gray-400 mb-4">
        Uploaded on {new Date(resumeData.uploadDate).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
      <button className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition">
        Update resume
      </button>
      <p className="text-xs text-gray-400 mt-2">
        Supported Formats: doc, docx, rtf, pdf, up to 2 MB
      </p>
    </div>
  );
};

export default Resume;