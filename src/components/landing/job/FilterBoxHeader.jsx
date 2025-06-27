import { IoIosAddCircleOutline } from "react-icons/io";


const FilterBoxHeader = () => {
  return (
    <div className="bg-jobcard p-4 rounded-md flex items-center justify-between">
      <h2 className="text-lg font-bold text-black">Delivery Jobs In All Cities</h2>
      <button className="bg-black text-light-cream px-4 py-1 font-[700] rounded flex items-center gap-2"> 
        <IoIosAddCircleOutline className="text-lg"/>
        <span>Filters</span>
      </button>
    </div>
  );
};

export default FilterBoxHeader;