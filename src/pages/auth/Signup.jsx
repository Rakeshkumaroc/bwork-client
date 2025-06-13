import Footer from "../../components/global/Footer";
import Navbar from "../../components/global/Navbar";
import LeftTestimonials from "../../components/landing/LeftTestimonials";
import SignupForm from "../../components/landing/SignupForm";

const Signup = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 md:px-[50px] px-4  ">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Section */}
          <LeftTestimonials />

          {/* Right Section - Form */}
          <SignupForm />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;
