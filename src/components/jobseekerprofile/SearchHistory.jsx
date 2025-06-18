import { useState, useEffect } from "react";
import ProfileLayout from "../../Layout/ProfileLayout";
import SearchHistorySkel from "../skeleton/jobseeker/SearchHistorySkel";
import { fetchData } from "../../utils/api";
import { deleteForm } from "../../utils/form";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_APP_URL || "http://localhost:5000";

const SearchHistory = () => { 
  const [isLoading, setIsLoading] = useState(true);
  const [searchHistoryData, setSearchHistoryData] = useState([]);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const jobSeekerId = userData._id || null;

  useEffect(() => {
    const getSearchHistory = async () => {
      if (!jobSeekerId) {
        setError("User ID not found. Please log in again.");
        setIsLoading(false);
        toast.error("User ID not found. Please log in again.");
        return;
      }

      setError(null);

      try {
        const url = `${baseUrl}/job-seeker-search-history/get-search-history-by-id/${jobSeekerId}`;
        console.log("Fetching search history from:", url);

        await fetchData(url, setSearchHistoryData, setIsLoading, (err) => {
          setError(err);
          console.error("Error fetching search history:", err);
          toast.error(err || "Failed to fetch search history.");
        });
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        console.error("Unexpected error in getSearchHistory:", err);
        toast.error(err.message || "An unexpected error occurred.");
      }
    };

    getSearchHistory();
  }, [jobSeekerId]);

  const handleClearHistory = async () => {
    if (!jobSeekerId) {
      setError("User ID not found. Please log in again.");
      toast.error("User ID not found. Please log in again.");
      return;
    }

    try {
      await deleteForm({
        url: `${baseUrl}/job-seeker-search-history/clear-search-history/${jobSeekerId}`,
        setIsLoading,
        successMessage: "Search history cleared successfully!",
        onSuccess: () => setSearchHistoryData([]),
      });
    } catch (err) {
      setError(err.message || "Failed to clear search history.");
      console.error("Error clearing search history:", err);
      toast.error(err.message || "Failed to clear search history.");
    }
  };

 

  const handleSearchAgain = (keyword) => {
    console.log(`Searching again for: ${keyword}`);
    toast.info(`Performing search for: ${keyword}`);
    // Optional: Implement navigation or search trigger
    // Example: window.location.href = `/search?query=${encodeURIComponent(keyword)}`;
  };

  if (isLoading) {
    return (
      <ProfileLayout>
        <SearchHistorySkel />
      </ProfileLayout>
    );
  }

  if (error) {
    return (
      <ProfileLayout>
        <div className="bg-white rounded-md shadow-md p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Search History</h1>
          <p className="text-red-600 text-sm mt-4">{error}</p>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="bg-white rounded-md shadow-md p-6"  >
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
            {searchHistoryData.map((search) => (
              <li
                key={search._id}
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
                <div className="flex items-center gap-2">
                  <button
                    className="text-sm text-yellow-400 hover:text-yellow-600"
                    title="Search Again"
                    onClick={() => handleSearchAgain(search.keyword)}
                  >
                    Search Again
                  </button>
                  {console.log('search',search)}
                
                </div>
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