import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jenny",
      location: "Gurgao",
      image: "https://i.pravatar.cc/150?img=47",
      text: "We love B Work! I was struggling to find a job but through B Work we are happily employed now.",
    },
    {
      name: "Devon",
      location: "Delhi",
      image: "https://i.pravatar.cc/150?img=53",
      text: "I love B Work! I was struggling to manage by daily wages but with B Work it became very easy.",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Happy Customer’s
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {/* Left Arrow */}
        <button className="text-3xl text-gray-800 md:self-center self-start">
          <IoIosArrowBack />
        </button>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start gap-4 bg-white p-4 rounded-md"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-28 h-28 object-cover rounded-md"
              />
              <div className="flex flex-col justify-between h-full px-1">
                <div className="space-y-3">
                  <div className="flex items-center text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-black text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">({t.location})</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="text-3xl text-gray-800 md:self-center self-end">
          <IoIosArrowForward />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
