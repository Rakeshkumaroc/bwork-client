import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";
import FilterBox from "./FilterBox";

const FilterBoxHeader = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-jobcard rounded-md ">
      {/* Header */}
      <div className="p-4 rounded-md flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold text-black">
          Delivery Jobs In All Cities
        </h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-black text-light-cream px-4 cursor-pointer py-1 font-[700] rounded flex items-center gap-2"
        >
          {showFilters ? (
            <FiMinusCircle className="text-lg" />
          ) : (
            <IoIosAddCircleOutline className="text-lg" />
          )}
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Box */}
      {showFilters && <FilterBox />}
    </div>
  );
};

export default FilterBoxHeader;
