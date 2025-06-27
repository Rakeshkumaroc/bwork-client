import magnifierIcon from "../../assets/landing/jobsearch.png"; // Replace with actual path if using local image

const JobseekerRegistrationCard = () => {
  return (
    <div className="flex items-center rounded-lg mt-8 md:px-[50px] shadow-sm px-4  ">
      <div className="w-full flex flex-col md:flex-row max-w-7xl mx-auto gap-4  ">
        {/* Icon Section */}
        <div className="h-28 w-full md:w-52 rounded-xl bg-jobcard flex items-center justify-center">
          <img
            src={magnifierIcon}
            alt="Jobseeker Icon"
            className="size-20 object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="bg-jobcard rounded-xl w-full flex flex-col justify-center px-5 md:px-7 py-3">
          <h3 className="font-bold text-lg md:text-xl mb-2">
            Jobseeker Registration
          </h3>
          <p className="text-sm text-gray-700">
            Sign-up to apply on local & verified driver, delivery, beautician,
            office boy, tailor, and cook jobs.
            <br />
            <span className="text-black font-medium">#NaukriMatlaBWork</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobseekerRegistrationCard;
