import {
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import Topbar from "../../components/admin/Topbar";

const ProfileCard = () => {
  return (
    <div className="min-h-screen bg-light-cream p-8">
      <Topbar />
     
      <div className="w-full mx-auto p-6 bg-cream rounded-xl shadow-md space-y-6 text-[#333]">
        <div className="flex flex-wrap gap-5 items-start justify-between">
          <div className="flex gap-4 items-center">
            <img
              src="https://i.imgur.com/0y8Ftya.png"
              alt="Sakshi"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
            />
            <div>
              <h2 className="text-xl font-semibold">Sakshi</h2>
              <p className="text-sm text-gray-600">UI/UX Designer</p>
              <p className="text-sm text-gray-500">Bangalore, Karnataka</p>
            </div>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-orange-600">
            SEND A MESSAGE
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
          <div>
            <h4 className="font-semibold mb-1">Contact Info</h4>
            <div className="flex items-center gap-2 text-gray-700 mb-1">
              <FaPhoneAlt className="text-xs" />
              <span>+91 9136659597</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-xs" />
              <span>sakshi.shrivastava0212@gmail.com</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Experience</h4>
            <div className="flex items-center gap-2 text-gray-700">
              <IoMdTime className="text-xl" />
              <span>2+ Years</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Education</h4>
            <p>B.Sc with Physics – 7 CGPA</p>
            <p>B.Des in Interaction Design – 9.02 CGPA</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Summary</h4>
          <p className="text-sm text-gray-800 leading-relaxed">
            Hey, I'm Sakshi from Bangalore. I'm a UI/UX Designer. I create great
            User Experience not just focusing on visually aesthetic part but I
            also take care of how functional the website/app is.
            <br />
            <br />
            Previously I had worked with a digital marketing agency called
            BloomlT Solutions where my work was to handle their social media
            posts and design posts for them as well as designing website for
            their clients. I was also the Head Of Design in my college club
            called Shunya Maths Club.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium">
            <FaCheckCircle /> ACCEPT
          </button>
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium">
            <FaTimesCircle /> REJECT
          </button>
          <button className="flex items-center gap-2 border border-gray-400 px-6 py-2 rounded-md font-medium text-gray-700">
            <IoMdTime /> PENDING
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
