import Navbar from "../../components/global/Navbar";
import EmployersLoginForm from "../../components/landing/EmployersLoginForm";
import LeftTestimonials from "../../components/landing/LeftTestimonials";

const EmployersLogin = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 md:px-[50px] px-4  ">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Section */}
          <LeftTestimonials />

          {/* Right Section - Form */}
          <EmployersLoginForm />
        </div>
      </div>
    </>
  );
};
export default EmployersLogin;
