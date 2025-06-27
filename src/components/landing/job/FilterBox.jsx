import { RiResetLeftFill } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";

const FilterBox = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-4 py-3 rounded-md shadow-md">
      {/* Categories */}
      <div className="flex flex-col gap-2 justify-center md:items-center items-start">
        <p className="font-semibold mb-2  w-48 py-2 bg-black text-white text-center rounded-md md:rounded-full text-sm">
          Select Categories
        </p>
        <div className="flex flex-col gap-1 bg-white rounded-xl p-4 w-full md:w-48">
          <label>
            <input type="checkbox" /> All Categories
          </label>
          <label>
            <input type="checkbox" /> Baby Sitting Job
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Delivery Boy
          </label>
          <label>
            <input type="checkbox" /> Driver
          </label>
          <label>
            <input type="checkbox" /> Waiter
          </label>
          <label>
            <input type="checkbox" /> Plumber
          </label>
          <label>
            <input type="checkbox" /> Electrician
          </label>
          <label>
            <input type="checkbox" /> Car Mechanics
          </label>
        </div>
        <button className="bg-apply  text-light-cream mt-5 px-7 py-1 font-[700] text-md rounded-[4px] hidden md:flex items-center justify-center gap-2 hover:bg-[#306142] whitespace-nowrap w-full sm:w-auto">
          <FaCircleCheck className="text-sm sm:text-md" />
          <span>Apply</span>
        </button>
      </div>

      {/* Cities */}
      <div className="flex flex-col gap-2 justify-center md:items-center items-start">
        <p className="font-semibold mb-2  w-48 py-2 bg-black text-white text-center rounded-md md:rounded-full text-sm">
          Select Cities
        </p>
        <div className="flex flex-col gap-1 bg-white rounded-xl p-4 w-full md:w-48">
          <label>
            <input type="checkbox" /> All Cities
          </label>
          <label>
            <input type="checkbox" /> Delhi
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Bangalore
          </label>
          <label>
            <input type="checkbox" /> Pune
          </label>
          <label>
            <input type="checkbox" /> Mumbai
          </label>
          <label>
            <input type="checkbox" /> Hyderabad
          </label>
          <label>
            <input type="checkbox" /> Patna
          </label>
          <label>
            <input type="checkbox" /> Indore
          </label>
        </div>
        <button className="bg-red-400 text-light-cream mt-5 px-7 py-1 font-[700] text-md rounded-[4px] hidden md:flex items-center justify-center gap-2 hover:bg-[#306142] whitespace-nowrap w-full sm:w-auto">
          <RiResetLeftFill className="text-md sm:text-lg" />
          <span> Reset</span>
        </button>
      </div>

      {/* Salary Range */}
      <div className="flex flex-col  items-start">
        <p className="font-semibold mb-2 w-40 py-2 bg-black text-white text-center rounded-md md:rounded-full text-sm">
          Salary Range
        </p>
        <div className="flex flex-col gap-1 bg-white rounded-xl p-4 w-72 sm:w-80">
          <input type="range" min="15000" max="20000" className="w-full mb-2" />
          <p>INR Rs. 20,000/-</p>
        </div>
        <div className="md:hidden flex  mt-5 gap-5">
          <button className="bg-apply  text-light-cream mt-5 px-7 py-1 font-[700] text-md rounded-[4px]  flex items-center justify-center gap-2 hover:bg-[#306142] whitespace-nowrap w-full sm:w-auto">
            <FaCircleCheck className="text-sm sm:text-md" />
            <span>Apply</span>
          </button>
          <button className="bg-red-400 text-light-cream mt-5 px-7 py-1 font-[700] text-md rounded-[4px]  flex items-center justify-center gap-2 hover:bg-[#306142] whitespace-nowrap w-full sm:w-auto">
            <RiResetLeftFill className="text-md sm:text-lg" />
            <span> Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
