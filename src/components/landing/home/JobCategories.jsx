import Cook from "../../../assets/job-categories/cook.svg";
import Sales from "../../../assets/job-categories/sales.svg";
import Delivery from "../../../assets/job-categories/delivery.svg";
import Driver from "../../../assets/job-categories/driver.svg";
import Tailoring from "../../../assets/job-categories/tailoring.svg";
import Accountant from "../../../assets/job-categories/accountant.svg";
import Beautician from "../../../assets/job-categories/beautician.svg";
import Bpo from "../../../assets/job-categories/bpo.svg";
import Marketing from "../../../assets/job-categories/marketing.svg";
import Receptionist from "../../../assets/job-categories/receptionist.svg";

const jobs = [
  { label: "Cook Jobs", count: "22800 Jobs", img: Cook },
  { label: "Sales Jobs", count: "19000 Jobs", img: Sales },
  { label: "Delivery Jobs", count: "11900 Jobs", img: Delivery },
  { label: "Driver Jobs", count: "10915 Jobs", img: Driver },
  { label: "Tailoring Jobs", count: "10170 Jobs", img: Tailoring },
  { label: "Accountant Jobs", count: "9395 Jobs", img: Accountant },
  { label: "Beautician Jobs", count: "7850 Jobs", img: Beautician },
  { label: "BPO Jobs", count: "5830 Jobs", img: Bpo },
  { label: "Marketing Jobs", count: "4615 Jobs", img: Marketing },
  { label: "Receptionist Jobs", count: "3835 Jobs", img: Receptionist },
];

const JobCategories = () => {
  return (
    <section className=" py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-14">Search Jobs By Categories</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-[2px] border-jobcard shadow-sm p-6 flex flex-col items-center hover:shadow-md transition"
            >
              <img src={job.img} alt={job.label} className="w-32 h-32 mb-4" />
              <p className="font-semibold text-gray-800">{job.label}</p>
              <p className="text-sm text-gray-500">{job.count}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          <button className="px-6 py-2 border border-black text-black bg-bgYellow/50 rounded hover:bg-blue-50 transition font-medium">
            Browse All Jobs
          </button>
          <button className="px-6 py-2 border border-black text-black bg-bgYellow/50 rounded hover:bg-blue-50 transition font-medium">
            Jobs By Categories
          </button>
          <button className="px-6 py-2 border border-black text-black bg-bgYellow/50 rounded hover:bg-blue-50 transition font-medium">
            Jobs By Cities
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
