import React from 'react'

const ProfileSidebarSkel = () => {
  return (
     <div className="w-64 h-screen sticky top-0 bg-white rounded-md shadow-md p-6 animate-pulse flex flex-col justify-between">
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
          <ul className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <li key={index} className="flex justify-between items-center py-2 px-6">
                <div className="flex items-center space-x-2 w-full">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-gray-300" />
          <ul className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <li key={index} className="flex items-center py-2 px-6">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 mt-4">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
  )
}

export default ProfileSidebarSkel