 

const MyReviewSkel = () => {
  return (
  <div className="bg-white rounded-md shadow-md p-6 animate-pulse">
          <div className="h-7 w-40 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-6">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-sm border border-gray-300">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="h-5 w-64 bg-gray-200 rounded mb-1"></div>
                    <div className="h-4 w-36 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gray-200 rounded-full mr-1"></div>
                    ))}
                  </div>
                </div>
                <div className="h-4 w-48 bg-gray-200 rounded mt-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded mt-2"></div>
                <div className="h-3 w-28 bg-gray-200 rounded mt-2"></div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default MyReviewSkel