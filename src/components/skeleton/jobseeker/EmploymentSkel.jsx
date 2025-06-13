 

const EmploymentSkel = () => {
  return (
   <div className="bg-white rounded-md shadow-md p-6 animate-pulse"  >
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="h-5 w-28 bg-gray-200 rounded"></div>
        </div>
        {[...Array(2)].map((_, index) => (
          <div key={index} className="mb-6 border-b pb-4 last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="h-5 w-48 bg-gray-200 rounded"></div>
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-4 w-64 bg-gray-200 rounded mt-2"></div>
            <div className="h-4 w-40 bg-gray-200 rounded mt-2"></div>
            <div className="h-4 w-36 bg-gray-200 rounded mt-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mt-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mt-2"></div>
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-8 w-36 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-48 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-32 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
  )
}

export default EmploymentSkel