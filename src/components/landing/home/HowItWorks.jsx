import React, { useState } from "react";
import { FaUser, FaBuilding } from "react-icons/fa";

 
// Job Seeker Images
import jobseekerStep1 from "../../../assets/how-it-works/jobseekerstep1.png";
import jobseekerStep2 from "../../../assets/how-it-works/jobseekerstep2.png";
import jobseekerStep3 from "../../../assets/how-it-works/jobseekerstep3.png";
import jobseekerStep4 from "../../../assets/how-it-works/jobseekerstep4.png";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("jobSeeker");

  const jobSeekerSteps = [
    {
      id: 1,
      title: "Register at B Work",
      image: jobseekerStep1,
    },
    {
      id: 2,
      title: "Post Required Documents",
      image: jobseekerStep2,
    },
    {
      id: 3,
      title: "Direct Apply OR Call the Recruiter",
      image: jobseekerStep3,
    },
    {
      id: 4,
      title: "Answer Questions & Get Hired",
      image: jobseekerStep4,
    },
  ];

  const recruiterSteps = [
    {
      id: 1,
      title: "Create Recruiter Profile",
      image: jobseekerStep1,
    },
    {
      id: 2,
      title: "Post Job Requirements",
      image: jobseekerStep2,
    },
    {
      id: 3,
      title: "Review Applicants",
      image: jobseekerStep3,
    },
    {
      id: 4,
      title: "Connect & Hire",
      image: jobseekerStep4,
    },
  ];

  const stepsToShow = activeTab === "jobSeeker" ? jobSeekerSteps : recruiterSteps;

  return (
    <section className="bg-bgYellow/50 pt-12 pb-20 px-4">
      <div className="max-w-7xl  mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-14">How It Works?</h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-8   mb-16">
          <button
            onClick={() => setActiveTab("jobSeeker")}
            className={`px-5 py-2 rounded-full flex items-center gap-2 font-semibold ${
              activeTab === "jobSeeker"
                ? "bg-black text-white"
                : "text-gray-700 border border-gray-300"
            }`}
          >
            <FaUser /> Job Seeker
          </button>
          <button
            onClick={() => setActiveTab("recruiter")}
            className={`px-4 py-2 rounded-full flex items-center gap-2 font-semibold ${
              activeTab === "recruiter"
                ? "bg-black text-white"
                : "text-gray-700 border border-gray-300"
            }`}
          >
            <FaBuilding /> For Recruiter
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stepsToShow.map((step) => (
            <div key={step.id} className="flex flex-col items-center space-y-4">
              <div className="text-white bg-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {step.id}
              </div>
              <img
                src={step.image}
                alt={step.title}
                className="w-28 h-28 object-contain"
              />
              <p className="text-center text-lg font-medium text-gray-800">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
