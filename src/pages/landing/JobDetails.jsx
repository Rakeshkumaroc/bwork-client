import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import JobDetailsCard from "../../components/landing/job-details/JobDetailsCard";
import JobDetailsTop from "../../components/landing/job-details/JobDetailsTop";

const JobDetails = () => {
  
  return (
    <>
      <Navbar isActive="Job" />
      <div className="md:w-[70vw] mx-auto p-4 space-y-10  ">
        <JobDetailsTop  />
        <JobDetailsCard/>
      </div>
      <Footer />
    </>
  );
};

export default JobDetails;
