 

const ProfileHeaderSkel = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 flex items-center gap-6 animate-pulse">
        {/* Profile Picture Skeleton */}
        <div className="relative w-24 h-24">
          <div className="rounded-full w-full h-full bg-gray-200 border-4 border-yellow-400"></div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-200 px-4 py-1 rounded-full"></div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-4 w-36 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProfileHeaderSkel