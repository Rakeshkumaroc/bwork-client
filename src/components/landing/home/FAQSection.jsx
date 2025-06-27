import { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { TiMinus } from "react-icons/ti";

export default function FAQSection() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "What is B Work?",
      answer:
        "B Work is a comprehensive platform designed to help businesses streamline their operations and improve productivity through innovative tools and solutions.",
    },
    {
      question: "Who can use B Work?",
      answer:
        "B Work is suitable for businesses of all sizes, from startups to enterprise companies, across various industries looking to optimize their workflow and operations.",
    },
    {
      question: "Is it paid or free?",
      answer:
        "There are no charges for Jobseekers- for pre-applications you pay what you use. All prices are inclusive of 18% GST.",
    },
  ];

  return (
    <div className="  p-6 bg-white  py-16 md:py-32 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 bg-jobcard transition-colors duration-200 flex justify-between items-center text-left"
            >
              <span
                className={`font-medium  ${
                  openItems[index] ? "text-[#1C4EFE]" : "text-gray-800"
                }`}
              >
                {item.question}
              </span>
              {openItems[index] ? (
                <FiMinus className="w-5 h-5 bg-white rounded-full text-black flex-shrink-0" />
              ) : (
                <IoIosAdd className="w-5 h-5 bg-white rounded-full text-black flex-shrink-0" />
              )}
            </button>

            {openItems[index] && (
              <div className="px-6 py-4 bg-jobcard border-t border-yellow-300">
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
