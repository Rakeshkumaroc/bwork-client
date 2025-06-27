import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jenny",
      location: "Gurgaon",
      image: "https://i.pravatar.cc/150?img=47",
      text: "We love B Work! I was struggling to find a job but through B Work we are happily employed now.",
    },
    {
      name: "Devon",
      location: "Delhi",
      image: "https://i.pravatar.cc/150?img=53",
      text: "I love B Work! I was struggling to manage by daily wages but with B Work it became very easy.",
    },
    {
      name: "Priya",
      location: "Mumbai",
      image: "https://i.pravatar.cc/150?img=32",
      text: "B Work transformed my career! Within weeks I found my dream job. The platform is incredibly user-friendly.",
    },
    {
      name: "Rahul",
      location: "Bangalore",
      image: "https://i.pravatar.cc/150?img=12",
      text: "Amazing platform! B Work helped me connect with employers who value my skills. Highly recommended!",
    },
    {
      name: "Anita",
      location: "Chennai",
      image: "https://i.pravatar.cc/150?img=25",
      text: "Thanks to B Work, I secured a part-time job that fits perfectly with my schedule. Great experience!",
    },
    {
      name: "Vikram",
      location: "Pune",
      image: "https://i.pravatar.cc/150?img=68",
      text: "B Work made job searching so simple. I found multiple opportunities and landed my ideal position!",
    },
    {
      name: "Sneha",
      location: "Hyderabad",
      image: "https://i.pravatar.cc/150?img=16",
      text: "Excellent service! B Work's support team helped me throughout the process. Now I'm earning well!",
    },
    {
      name: "Amit",
      location: "Kolkata",
      image: "https://i.pravatar.cc/150?img=59",
      text: "B Work is a game-changer! From freelance to full-time, I found exactly what I was looking for.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  // Update itemsPerPage based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile: 1 testimonial per page
      } else {
        setItemsPerPage(2); // Desktop: 2 testimonials per page
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= testimonials.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, testimonials.length - itemsPerPage) : prevIndex - itemsPerPage
    );
  };

  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="bg-white py-16 md:py-32 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Happy Customer's
      </h2>

      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="text-2xl sm:text-3xl text-gray-800 hover:text-yellow-600 transition-colors duration-200"
        >
          <IoIosArrowBack />
        </button>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 w-full min-h-[200px]">
          {currentTestimonials.map((t, index) => (
            <div
              key={currentIndex + index}
              className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-md"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-md"
              />
              <div className="flex flex-col justify-between h-full px-1">
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center text-yellow-500 mb-1 sm:mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-sm sm:text-base" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-black text-xs sm:text-sm">{t.name}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">({t.location})</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="text-2xl sm:text-3xl text-gray-800 hover:text-yellow-600 transition-colors duration-200"
        >
          <IoIosArrowForward />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 sm:mt-8 gap-2">
        {Array.from({ length: Math.ceil(testimonials.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerPage)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
              Math.floor(currentIndex / itemsPerPage) === index
                ? 'bg-yellow-600'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;