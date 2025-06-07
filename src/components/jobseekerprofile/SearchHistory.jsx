import React from "react";
import ProfileLayout from "../../Layout/ProfileLayout";

const searchHistoryData = [
  {
    keyword: "React Developer",
    location: "Remote",
    date: "2025-06-05",
  },
  {
    keyword: "MERN Stack Developer",
    location: "Bangalore",
    date: "2025-06-03",
  },
  {
    keyword: "Frontend Internship",
    location: "Delhi",
    date: "2025-06-01",
  },
];

const SearchHistory = () => {
  return (
    <ProfileLayout>
      <div className="bg-cream p-6 rounded-xl shadow border">
        <h1 className="text-2xl font-semibold mb-6">Search History</h1>

        {searchHistoryData.length > 0 ? (
          <ul className="space-y-4">
            {searchHistoryData.map((search, index) => (
              <li
                key={index}
                className="bg-light-cream border rounded p-4 shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Keyword:</span> {search.keyword}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span> {search.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Searched on {new Date(search.date).toLocaleDateString()}
                  </p>
                </div>
                <button className="text-sm text-blue-600 hover:underline">
                  Search Again
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recent searches found.</p>
        )}
      </div>
    </ProfileLayout>
  );
};

export default SearchHistory;
