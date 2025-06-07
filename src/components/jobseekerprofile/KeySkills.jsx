import { useContext } from "react";
import { FaPen } from "react-icons/fa";
import { MyContext } from "../../App";

const KeySkills = () => {
  const skills = [
    "Sockets", "Hosting", "Vps", "Node", "Firebase", "Mean Stack",
    "Html/Css", "MongoDB", "Mern Stack", "Nestjs", "Tailwind",
    "React Native", "Express", "MySQL", "MongoDB Atlas", "Nodejs Scripting",
    "Javascript", "TypeScript", "Redux", "Nextjs", "React.js"
  ];
  const {keySkillsRef } = useContext(MyContext);

  return (
    <div className="bg-cream p-6 rounded-xl shadow border" ref={keySkillsRef}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Key skills</h2>
        <FaPen className="text-gray-400 hover:text-gray-600 cursor-pointer" size={14} />
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-1 text-sm border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeySkills;
