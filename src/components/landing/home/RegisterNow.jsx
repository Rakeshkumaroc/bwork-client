 import { Link } from "react-router-dom";
import BgImage from "../../../assets/landing/worker.jpg"; // Replace with your actual image path

const RegisterNow = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[60vh] md:h-[460px] flex items-center justify-center text-white leading-[100%] tracking-[0]"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="absolute inset-0 bg-gray-700/40 "></div>

      <div className="relative z-10 text-center px-4">
        <h2 className="text-xl md:text-5xl font-semibold mb-2 border-t-3 px-10 border-white inline-block pt-4">
          REGISTER <br className="hidden md:block" /> NOW
        </h2>
        <p className="text-sm md:text-base max-w-md mx-auto mb-6">
          We can take your resume to the next stage. Work with us to make your mark!
        </p>
        <Link to={'/signup'} className="bg-white text-black px-10 py-3 text-sm font-medium rounded hover:bg-yellow-400 transition-all">
          Click Here
        </Link>
      </div>
    </section>
  );
};

export default RegisterNow;
