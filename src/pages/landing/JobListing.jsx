import { useContext } from "react";
import Footer from "../../components/global/Footer";
import JobseekerLogin from "../../components/global/JobseekerLogin";
import Navbar from "../../components/global/Navbar";
import FilterBoxHeader from "../../components/landing/job/FilterBoxHeader";
import JobListingCard from "../../components/landing/job/JobListingCard";
import { GlobalContext } from "../../App"; 
import JobByCategories from "../../components/landing/job/JobByCategories";

const JobListContainer = () => {
  const { createAccountPopUp } = useContext(GlobalContext);
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
          <JobListingCard />
          <JobListingCard />
          <JobListingCard />
          <JobListingCard />
        </div>
        <JobByCategories />
      </div>
      <Footer />
      {createAccountPopUp ? <JobseekerLogin /> : ""}
    </>
  );
};

export default JobListContainer;
