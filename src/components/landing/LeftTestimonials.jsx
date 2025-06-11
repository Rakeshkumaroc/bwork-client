 const LeftTestimonials = () => {
  return (
    <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6">
     
      <h1 className="text-3xl hidden md:block sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-global mb-4 sm:mb-6 leading-tight tracking-wide">
        Choose BWork
        <br />
        Business Made
        <br />
        Easy!
      </h1>
      <div className="flex items-center flex-wrap gap-3 sm:gap-5 mt-4">
        <img
          src="https://i.pravatar.cc/50"
          alt="user"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3"
        />
        <p className="text-xs sm:text-sm md:text-base">
          “Since we moved to BWork, we got everything in the same place. It
          really streamlined our business; It helps in managing our whole
          business.”
          <br />
          <span className="block mt-2 font-semibold">-Sakshi</span>
        </p>
      </div>
    </div>
  );
};

export default LeftTestimonials;
