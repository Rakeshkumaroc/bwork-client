 

const EducationSkel = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-5 w-28 bg-gray-200 rounded"></div>
      </div>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="mb-5">
          <div className="flex items-center justify-between">
            <div className="h-5 w-48 bg-gray-200 rounded"></div>
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-4 w-64 bg-gray-200 rounded mt-2"></div>
          <div className="h-4 w-36 bg-gray-200 rounded mt-2"></div>
        </div>
      ))}
      <div className="mt-6 space-y-2">
        <div className="h-4 w-36 bg-gray-200 rounded"></div>
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default EducationSkel;
