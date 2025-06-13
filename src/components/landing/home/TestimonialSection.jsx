import { BiSolidLike } from "react-icons/bi";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Armando McClure",
      title: "Senior Marketing Architect",
      text: "Website design did exactly what it does. Just looking for a website design. Nice work on your website design!",
      rating: 5,
      avtar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Jamie Wilkinson",
      title: "Business Consultant",
      text: "Dude, your stuff is the bomb! House rent is the real deal! I STRONGLY recommend house rent to EVERYONE interested in running a successful online business!",
      rating: 4,
      avtar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Tracy Schuppe",
      title: "Sales Supervisor",
      text: "Since I invested in software I made over 108,000 dollars in profits. The service is excellent. I wish I would have thought of it first.",
      rating: 5,
      avtar: "https://randomuser.me/api/portraits/women/46.jpg",
    },
    {
      name: "Tracy Schuppe",
      title: "Sales Supervisor",
      text: "Since I invested over 108,000 dollars in profits. The service is excellent. I wish I would have thought of it first.",
      rating: 5,
      avtar: "https://randomuser.me/api/portraits/women/47.jpg",
    },
  ];

  return (
    <div className="bg-bgYellow/50 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between mb-10 items-center">
              <div className="flex items-center ">
                {Array(testimonial.rating)
                  .fill("★")
                  .map((star, i) => (
                    <span key={i} className="text-[#3E66DF] text-2xl">
                      {star}
                    </span>
                  ))}
              </div>
              <div className="flex items-center justify-center font-semibold gap-2 text-sm">
                <BiSolidLike className="border bg-[#3E66DF] text-white rounded-full text-lg  p-1" />
                <p>Testimonial</p>
              </div>
            </div>
            <p className="  mb-4">{testimonial.text}</p>
            <div className="flex items-center">
              <img
                src={testimonial.avtar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
