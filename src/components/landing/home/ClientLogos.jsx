import React from "react";

// Replace with actual imports for each logo image
import sbLogo from "../../../assets/clients/sb-logo.png";
import malhotraLogo from "../../../assets/clients/malhotra-logo.png";
import biharBuzzLogo from "../../../assets/clients/biharbuzz-logo.jpg";
import naradLogo from "../../../assets/clients/narad-logo.png";
import italnoloLogo from "../../../assets/clients/italnolo-logo.png";

const ClientLogos = () => {
  const logos = [
    { src: sbLogo, alt: "SB Logo" },
    { src: malhotraLogo, alt: "Malhotra Logo" },
    { src: biharBuzzLogo, alt: "Bihar Buzz Logo" },
    { src: naradLogo, alt: "Narad Logo" },
    { src: italnoloLogo, alt: "Italnolo Logo" },
  ];

  return (
    <section className="bg-white py-10 px-4 leading-[100%] tracking-[0]">
      <div className=" max-w-7xl mx-auto   text-center">
        <p className="  text-gray-600 mb-8 text-xl">
          Loved by 2,000+ Startups & Enterprises
        </p>
        <div className="flex flex-wrap justify-around  items-center  ">
          <img
            src={sbLogo}
            alt="SB Logo"
            className="h-[99px] w-[99px] rounded-full object-contain"
          />
          <img
            src={malhotraLogo}
            alt="Malhotra Logo"
            className=" w-[268px] object-contain"
          />
          <img
            src={biharBuzzLogo}
            alt="Bihar Buzz Logo"
            className="  w-[136px] object-contain"
          />
          <img
            src={naradLogo}
            alt="Narad Logo"
            className="  w-[180px] object-contain"
          />
          <img
            src={italnoloLogo}
            alt="Italnolo Logo"
            className="  w-[253px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
