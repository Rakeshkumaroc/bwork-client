import { useContext } from "react";
import { MdClose } from "react-icons/md";
import { GlobalContext } from "../../App";

const JobseekerLogin = () => {
  const { setCreateAccountPopUp } = useContext(GlobalContext);

  return (
    <div className="flex items-center justify-center fixed bg-black/10 top-0 left-0 p-5 right-0 bottom-0">
      <div className="bg-white w-full relative md:w-[35vw] mx-auto mt-20 md:px-16 p-5 md:py-10 rounded-xl shadow-lg  ">
        <MdClose
          className="absolute right-3 top-3 cursor-pointer text-2xl text-black"
          onClick={() => {
            setCreateAccountPopUp(false);
          }}
        />
        {/* Header */}
        <h4 className="text-yellow-400 font-semibold mb-1">B Work</h4>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Create Jobseeker Account
        </h1>
        <p className="text-gray-600 mb-6">Find the best jobs near you</p>

        {/* Phone Number */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mb-6">
          <select className="bg-gray-100 text-sm px-3 py-2 border-r border-gray-300 outline-none">
            <option value="IN">IN</option>
            <option value="US">US</option>
            <option value="UK">UK</option>
            {/* Add more if needed */}
          </select>
          <input
            type="tel"
            defaultValue="+91 9316659597"
            className="w-full px-3 py-2 text-gray-800 outline-none"
          />
        </div>

        {/* Continue Button */}
        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded shadow-md transition">
          Continue
        </button>
      </div>
    </div>
  );
};

export default JobseekerLogin;
