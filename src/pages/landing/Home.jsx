import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import ClientLogos from "../../components/landing/home/ClientLogos";
import FAQSection from "../../components/landing/home/FAQSection";
import Hero from "../../components/landing/home/Hero";
import HowItWorks from "../../components/landing/home/HowItWorks";
import JobCategories from "../../components/landing/home/JobCategories";
import JobPlatformSection from "../../components/landing/home/JobPlatformSection";
import RegisterNow from "../../components/landing/home/RegisterNow";
import SearchByCity from "../../components/landing/home/SearchByCity";
import Testimonials from "../../components/landing/home/Testimonials";
import TestimonialSection from "../../components/landing/home/TestimonialSection";

const Home = () => {
  return (
    <>
      <Navbar isActive="Home" />
      <Hero />
      <JobCategories />
      <ClientLogos />
      <HowItWorks />
      <Testimonials />
      <SearchByCity />
      <FAQSection />
      <JobPlatformSection />
      <RegisterNow />
      <Footer />
    </>
  );
};

export default Home;
