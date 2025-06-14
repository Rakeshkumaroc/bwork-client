import {
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdHourglassEmpty } from "react-icons/md"; // Added for "In Process"
import Topbar from "../../components/admin/Topbar";

const ProfileCard = () => {
 return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
    <Topbar />
    <div className=" mx-auto bg-white rounded-md shadow-md p-6 space-y-6 text-gray-800">
      <div className="flex flex-wrap gap-4 sm:gap-6 items-start justify-between">
        <div className="flex gap-4 items-center">
          <img
            src="https://i.imgur.com/0y8Ftya.png"
            alt="Sakshi's Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Sakshi</h2>
            <p className="text-sm text-gray-600">UI/UX Designer</p>
            <p className="text-sm text-gray-600">Bangalore, Karnataka</p>
          </div>
        </div>
        <button
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
          title="Send a Message"
        >
          SEND A MESSAGE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Contact Info</h4>
          <div className="flex items-center gap-2 text-gray-800 mb-1">
            <FaPhoneAlt className="text-xs" />
            <span>+91 9136659597</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <FaEnvelope className="text-xs" />
            <span>sakshi.shrivastava0212@gmail.com</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Experience</h4>
          <div className="flex items-center gap-2 text-gray-800">
            <IoMdTime className="text-xl" />
            <span>2+ Years</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Education</h4>
          <p className="text-sm text-gray-800">B.Sc with Physics – 7 CGPA</p>
          <p className="text-sm text-gray-800">B.Des in Interaction Design – 9.02 CGPA</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Summary</h4>
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
        <button
          className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-md font-semibold text-sm text-gray-700 hover:bg-gray-100"
          title="Pending"
        >
          <IoMdTime className="text-base" /> Pending
        </button>
        <button
          className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold text-sm hover:bg-yellow-500"
          title="In Process"
        >
          <MdHourglassEmpty className="text-base" /> In Process
        </button>
        <button
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-red-700"
          title="Reject"
        >
          <FaTimesCircle className="text-base" /> Reject
        </button>
        <button
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-green-700"
          title="Approved"
        >
          <FaCheckCircle className="text-base" /> Approved
        </button>
      </div>
    </div>
  </div>
);
};

export default ProfileCard;