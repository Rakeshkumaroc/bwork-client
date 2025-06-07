import { useContext } from "react";
import { FaPen } from "react-icons/fa";
import { MyContext } from "../../App";

const employmentData = [
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
];

const Employment = () => {
      const {employmentRef } = useContext(MyContext);
  
  return ( 
        <div className="bg-cream p-6 rounded-xl shadow border " ref={employmentRef}> 
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Employment</h2>
        <span className="text-sm text-blue-600 font-medium cursor-pointer">
          Add employment
        </span>
      </div>

      {employmentData.map((job, index) => (
        <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">
              {job.title}
            </h3>
            <FaPen className="text-gray-400 hover:text-gray-600 cursor-pointer" size={14} />
          </div>

          <p className="text-sm text-gray-700 mt-1">{job.company}</p>
          <p className="text-sm text-gray-500 mt-1">{job.period}</p>
          {job.notice && (
            <p className="text-sm text-gray-500 mt-1">{job.notice}</p>
          )}
          <p className="text-sm text-gray-700 mt-2">
            {job.description}
            <span className="text-blue-600 ml-1 cursor-pointer">Read More</span>
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
                  className="px-3 py-1 text-sm border border-gray-300 rounded-full text-gray-700 bg-white"
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
