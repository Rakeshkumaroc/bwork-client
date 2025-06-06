import Heroimg from "../../assets/landing/hero-img.png";
import Button from "../common/Button";
import ButtonOutLine from "../common/ButtonOutLine";

const Hero = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center gap-12 px-4 sm:px-6 lg:px-0 py-12 min-h-[80vh]">
      {/* Text Section */}
      <div className="w-full md:w-1/2 space-y-10 text-center md:text-left">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-orange-global mb-6 leading-tight">
            Run Smarter.
            <br /> Scale Faster
          </h1>
          <p className="text-gray-700 text-base sm:text-lg">
            Opmize is your all-in-one business management system designed to
            centralize, automate, and simplify operations across teams, brands,
            and branches—whether you're a startup or an enterprise.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4">
          <Button to={'/signup'} color={'bg-black'}  text={"Try for Free"} />
          <ButtonOutLine to={'#'} borderColor={'border-black'} text={" Book a demo"} />
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={Heroimg}
          alt="Business Dashboard Illustration"
          className="w-full max-w-md sm:max-w-lg lg:max-w-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
