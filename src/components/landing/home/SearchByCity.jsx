import Img1 from "../../../assets/city/1.png";
import Img2 from "../../../assets/city/2.png";
import Img3 from "../../../assets/city/3.png";
import Img4 from "../../../assets/city/4.png";
import Img5 from "../../../assets/city/5.png";
import Img6 from "../../../assets/city/6.png";
import RightArrow from "../../../assets/right-arrow.png";
import { HiArrowLongRight } from "react-icons/hi2";

// Sample city data
const cities = [
  { name: "Bangalore", image: Img1, size: "w-[90%]" },
  { name: "Chennai", image: Img2, size: "w-[90%]" },
  { name: "Mumbai", image: Img4, size: "w-[90%]" },
  { name: "Hyderabad", image: Img6, size: "w-[45%]" },
  { name: "Ahmedabad", image: Img3, size: "w-[90%]" },
  { name: "Delhi", image: Img5, size: "w-[55%]" },
];

const SearchByCity = () => {
  return (
    <section className="bg-bgYellow/50 pt-12 pb-20 px-4">
      <div className="max-w-7xl  mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-14">
          Search Jobs By Cities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-40  gap-y-14 max-w-5xl mx-auto">
          {cities.map((city, index) => (
            <div
              key={index}
              className="bg-white shadow-[0px_4px_4px_0px_#00000040] w-[342px] relative h-[275px] rounded-xl overflow-hidden p-6 text-center   hover:shadow-xl transition"
            >
              <img
                src={city.image}
                alt={city.name}
                className={`${city.size} mx-auto mb-4 "`}
              />
              <p className="font-medium text-lg absolute bottom-0 left-0 right-0 pb-5 pt-1 bg-white text-center">
                Jobs In {city.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-end flex items-center justify-end">
          <button className="flex flex-col items-start justify-start font-bold  text-sm text-black hover:underline">
            <img src={RightArrow} alt="..." className="w-14 h-3" />
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchByCity;
