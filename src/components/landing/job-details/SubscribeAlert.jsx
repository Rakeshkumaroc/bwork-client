import { FaBell } from "react-icons/fa";

const SubscribeAlert = () => {
  return (
    <div className="bg-black rounded-md text-white w-full max-w-full">
      <button className="font-bold justify-center text-center w-full text-sm sm:text-base md:text-lg flex items-center gap-2 bg-black text-white   px-6 py-3 rounded-md shadow-md hover:bg-gray-900 transition duration-300">
        <FaBell className="text-white" />
        <span>Subscribe for Free Weekly Job Alerts via SMS</span>
      </button>
       
    </div>
  );
};

export default SubscribeAlert;
