import LeftTestimonials from "../../components/landing/LeftTestimonials"; 
import LoginForm from "../../components/landing/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 sm:px-6 lg:px-0">
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Section */}
        <LeftTestimonials />

        {/* Right Section - Form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login; 