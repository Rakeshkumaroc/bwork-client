import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import FilterBoxHeader from "../../components/landing/job/FilterBoxHeader";
import JobListingCard from "../../components/landing/job/JobListingCard";

const JobListContainer = () => {
  return (
    <>
      <Navbar isActive="Job" />
      <div className="md:w-[70vw] mx-auto p-4 space-y-10  ">
        <FilterBoxHeader />
        <button className="bg-jobcard text-black px-4 py-1 font-[700] rounded  ">
          Latest Jobs
        </button>

        <div className="space-y-4 ">
          <JobListingCard />
          <JobListingCard /> 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobListContainer;
