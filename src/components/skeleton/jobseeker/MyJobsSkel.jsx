 

const MyJobsSkel = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 animate-pulse">
      <div className="h-7 w-40 bg-gray-200 rounded mb-6"></div>
      <div className="flex space-x-6 text-sm border-b pb-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-4 w-20 bg-gray-200 rounded pb-2"></div>
        ))}
      </div>
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-md shadow-sm border border-gray-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded"></div>
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                <div className="h-5 w-48 bg-gray-200 rounded mb-1"></div>
                <div className="h-4 w-36 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-28 bg-gray-200 rounded mt-1"></div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:text-right">
              <div className="h-8 w-32 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobsSkel;
