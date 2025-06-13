 

const JobSeekerSettingsSkel = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 animate-pulse">
      <div className="h-7 w-40 bg-gray-200 rounded mb-6"></div>
      <div className="mb-8">
        <div className="h-5 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
            <div className="mt-2 sm:mt-0 h-8 w-full sm:w-1/2 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
            <div className="mt-2 sm:mt-0 h-8 w-full sm:w-1/2 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
            <div className="mt-2 sm:mt-0 h-4 w-36 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="h-10 w-36 bg-gray-200 rounded-md"></div>
    </div>
  );
};

export default JobSeekerSettingsSkel;
