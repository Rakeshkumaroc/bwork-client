import React from "react";

const SearchHistorySkel = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 animate-pulse">
      <div className="h-7 w-48 bg-gray-200 rounded mb-6"></div>
      <ul className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <li
            key={index}
            className="bg-white border border-gray-300 rounded-md p-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="h-4 w-64 bg-gray-200 rounded mb-1"></div> 
              <div className="h-3 w-28 bg-gray-200 rounded mt-1"></div>
            </div>
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistorySkel;
