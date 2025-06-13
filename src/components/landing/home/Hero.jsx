import React from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaUserPlus } from "react-icons/fa";
import manWithLaptop from "../../../assets/landing/man-with-laptop.png";
import womanBack from "../../../assets/landing/woman-back.png";

const Hero = () => {
  return (
    <section className="bg-bgYellow/50   ">
      <div className="   mx-auto flex flex-col lg:flex-row items-center justify-between  ">
        {/* Left Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={manWithLaptop}
            alt="Man with Laptop"
            className="  object-contain"
          />
        </div>

        {/* Center Text & Buttons */}
        <div className="flex-1 text-center  space-y-20 leading-[100%] tracking-[0]">
          <h1 className="text-3xl md:text-5xl font-[700]  text-gray-800">
            We Care  
            About Your   <br className="hidden md:block" />
            Daily Needs!
          </h1>
          <div className="flex justify-center font-bold gap-8">
            <Link
              to="/post-job"
              className="bg-black text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition"
            >
              <FaBriefcase />
              Post a Job
            </Link>
            <Link
              to="/find-job"
              className="bg-black text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition"
            >
              <FaUserPlus />
              Find a Job
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={womanBack}
            alt="Woman"
            className="  object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
