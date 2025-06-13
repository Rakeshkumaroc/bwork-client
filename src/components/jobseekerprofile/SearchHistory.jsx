import { useState, useEffect } from "react";
import ProfileLayout from "../../Layout/ProfileLayout";
import SearchHistorySkel from "../skeleton/jobseeker/SearchHistorySkel";

const SearchHistory = () => {
  const [isLoading, setIsLoading] = useState(true); // Added for skeleton loading
  const [searchHistoryData, setSearchHistoryData] = useState([
    {
      keyword: "React Developer",
      date: "2025-06-05",
    },
    {
      keyword: "MERN Stack Developer",
      date: "2025-06-03",
    },
    {
      keyword: "Frontend Internship",
      date: "2025-06-01",
    },
  ]);

  // Simulate data fetching (replace with actual API call if needed)
  useEffect(() => {
    const fetchSearchHistory = async () => {
      // Simulate a delay for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Adjust delay as needed
    };

    fetchSearchHistory();
  }, []);

  const handleClearHistory = () => {
    setSearchHistoryData([]); // Clear search history (replace with API call if needed)
  };

  if (isLoading) {
    return (
      <ProfileLayout>
       <SearchHistorySkel/>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="bg-white rounded-md shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Search History</h1>
          {searchHistoryData.length > 0 && (
            <button
              className="px-4 py-2 text-sm bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
              onClick={handleClearHistory}
              title="Clear Search History"
            >
              Clear History
            </button>
          )}
        </div>

        {searchHistoryData.length > 0 ? (
          <ul className="space-y-4">
            {searchHistoryData.map((search, index) => (
              <li
                key={index}
                className="bg-white border border-gray-300 rounded-md p-4 shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Keyword:</span> {search.keyword}
                  </p>
                 
                  <p className="text-xs text-gray-400 mt-1">
                    Searched on {new Date(search.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="text-sm text-yellow-400 hover:text-yellow-600"
                  title="Search Again"
                >
                  Search Again
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm">No recent searches found.</p>
        )}
      </div>
    </ProfileLayout>
  );
};

export default SearchHistory;