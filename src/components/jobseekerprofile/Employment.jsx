import { useContext, useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { MyContext } from "../../App";
import EmploymentSkel from "../skeleton/jobseeker/EmploymentSkel";

const Employment = () => {
  const { employmentRef } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [employmentData, setEmploymentData] = useState([
    {
      title: "Mern Full Stack Developer",
      company: "Orange Cap Media, pune",
      period: "Full-time | Jan 2025 to Present (6 months)",
      notice: "2 Months Notice Period",
      description:
        "Full Stack Developer Orange Cap Media Pvt Ltd is a Pune-based company operating in the advertising and market research sector. The company focuses on innovative digital solutions, including web development, digital marketing, and media services. - Developing and maintaining web ...",
      skills:
        "React.js, CSS, Javascript, Node.js, Express, MongoDB, MySQL, React Native, Nextjs, TypeScript, Vps",
    },
    {
      title: "Mern Full Stack Developer",
      company: "Botmedia Digital",
      period: "Full-time | Apr 2023 to Jan 2025 (1 year 10 months)",
      description:
        "Full Stack Developer at Botmedia Digital Marketing Company Overview: Botmedia Digital Marketing is a Pune-based digital agency specializing in web development, SEO, and digital marketing solutions. Role & Responsibilities: As a Full Stack Developer, I handle end-to-end web d...",
      projects: [
        "Thousand Keys Property",
        "MasterIQ - Education Loan site",
        "Estate bot",
      ],
    },
  ]);

  // Simulate data fetching (replace with actual API call if needed)
  useEffect(() => {
    const fetchEmploymentData = async () => {
      // Simulate a delay for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust delay as needed
    };

    fetchEmploymentData();
  }, []);

  if (isLoading) {
    return (
     <EmploymentSkel/>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6" ref={employmentRef}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Employment</h2>
        <button
          className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          title="Add Employment"
        >
          Add employment
        </button>
      </div>

      {employmentData.map((job, index) => (
        <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
            <button
              className="p-2 text-gray-500 hover:text-yellow-400 transition"
              title="Edit Employment"
            >
              <FaPen className="text-lg" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-1">{job.company}</p>
          <p className="text-sm text-gray-400 mt-1">{job.period}</p>
          {job.notice && (
            <p className="text-sm text-gray-400 mt-1">{job.notice}</p>
          )}
          <p className="text-sm text-gray-700 mt-2">
            {job.description}
            <button className="text-yellow-400 ml-1 hover:text-yellow-600 cursor-pointer">
              Read More
            </button>
          </p>
          {job.skills && (
            <p className="text-sm text-gray-700 mt-2">
              <strong>Top 5 key skills:</strong>
              <span className="ml-1 text-gray-800">{job.skills}</span>
            </p>
          )}
          {job.projects && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 font-medium">Projects</span>
              {job.projects.map((proj, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  {proj}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Employment;