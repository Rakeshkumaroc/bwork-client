import Lookingfor1 from "../../../assets/landing/lookingfor1.jpg";
import Lookingfor2 from "../../../assets/landing/lookingfor2.jpg";

export default function JobPlatformSection() {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className=" max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-600 text-sm mb-2">Get Started</p>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-14">
         What are you looking for?
        </h2>
        </div>

        {/* Two Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-20 max-w-6xl mx-auto">
          {/* Hire Staff Card */}
          <div className="bg-jobcard rounded-xl p-12 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-gray-700 text-sm mb-2">I want Staff</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Hire Staff
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="text-green-600 mr-3 mt-0.5">✓</div>
                  <p className="text-gray-800">
                    Fill the form, Select the Plan & Post the Job
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="text-green-600 mr-3 mt-0.5">✓</div>
                  <p className="text-gray-800">
                    Filter the Applicants & access the Database
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="text-green-600 mr-3 mt-0.5">✓</div>
                  <p className="text-gray-800">
                    Take the Interview & Hire the Best staff
                  </p>
                </div>
              </div>

              <button className="bg-black text-white px-6 py-1 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Post a Job
              </button>
            </div>

            {/* Profile Image */}
            <div className="absolute top-4 right-4 size-24 bg-gray-300 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <img
                  src={Lookingfor2}
                  alt="lookingfor1"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Search Jobs Card */}
          <div className="bg-jobcard rounded-xl p-12 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-gray-700 text-sm mb-2">I want Job</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Search Jobs
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="text-green-600 mr-3 mt-0.5">✓</div>
                  <p className="text-gray-800">Register, Job search, & apply</p>
                </div>
                <div className="flex items-start">
                  <div className="text-green-600 mr-3 mt-0.5">✓</div>
                  <p className="text-gray-800">
                    Call directly to employer or Whatsapp them
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="text-green-600 mr-3 mt-0.5">✓</div>
                  <p className="text-gray-800">Give Interview & get Job</p>
                </div>
              </div>

              <button className="bg-black text-white px-6 py-1 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Search a Job
              </button>
            </div>

            {/* Profile Image */}
            <div className="absolute top-4 right-4 size-24 bg-gray-300 rounded-full overflow-hidden">
               <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <img
                  src={Lookingfor1}
                  alt="lookingfor1"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
