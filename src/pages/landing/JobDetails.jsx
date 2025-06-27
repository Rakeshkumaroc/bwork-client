import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import ButtonsBar from "../../components/landing/job-details/ButtonsBar";
import JobDetailsCard from "../../components/landing/job-details/JobDetailsCard";
import JobDetailsTop from "../../components/landing/job-details/JobDetailsTop";
import JobPosterInfo from "../../components/landing/job-details/JobPosterInfo";
import JobShareSection from "../../components/landing/job-details/JobShareSection";
import SubscribeAlert from "../../components/landing/job-details/SubscribeAlert";
import JobListingCard from "../../components/landing/job/JobListingCard";

const JobDetails = () => {
  return (
    <>
      <Navbar isActive="Job" />
      <div className="md:w-[70vw] mx-auto p-4 space-y-10  ">
        <JobDetailsTop />
        <JobDetailsCard />
        <ButtonsBar />
        <JobPosterInfo />
        <JobShareSection />
        <h3 className="font-bold   text-lg md:text-xl">
          Similar Delivery Jobs
        </h3>
        <JobListingCard />
        <SubscribeAlert />
      </div>
      <Footer />
    </>
  );
};

export default JobDetails;
