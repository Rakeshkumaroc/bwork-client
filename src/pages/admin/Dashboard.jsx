import { Briefcase, Users, UserCheck, Building } from "lucide-react";
import Topbar from "../../components/admin/Topbar";
import StatCard from "../../components/admin/StatCard";
import ChartCard from "../../components/admin/ChartCard";
import MiniCard from "../../components/admin/MiniCard";

const Dashboard = () => {
  return (
  <div className="flex-1 bg-gray-100 pl-4 sm:pl-6 pr-4 py-6 overflow-auto">
    <Topbar />

    {/* Stats Summary */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      <StatCard label="Branch" value="4005" icon={<Building size={24} />} />
      <StatCard label="User" value="1620" icon={<Users size={24} />} />
      <StatCard
        label="Job Opening"
        value="3270"
        icon={<Briefcase size={24} />}
      />
      <StatCard
        label="Applicants"
        value="5420"
        icon={<UserCheck size={24} />}
      />
    </div>

    {/* Charts */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <ChartCard title="Total Revenue" year="2025" chartType="bar" />
      <ChartCard title="Sales Overview" year="2025" chartType="line" />
    </div>

    {/* Revenue Widgets */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <MiniCard title="New Employees" value="2500" trend="+10%" />
      <MiniCard title="Earnings" value="Rs. 25000" trend="+20%" />
      <MiniCard title="Expenses" value="Rs. 34000" trend="-5%" />
      <MiniCard title="Profit" value="Rs. 52000" trend="-15%" />
    </div>

    {/* Bottom Widgets */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Today Leave</h4>
        <p className="text-gray-800">12/60</p>
        <h4 className="font-semibold text-sm text-gray-700 mt-4 mb-2">Pending Invoice</h4>
        <p className="text-gray-800">15/60</p>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md text-center">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Total Tasks</h4>
        <p className="text-3xl font-bold text-gray-800">476</p>
        <p className="text-gray-600">
          Overdue: <span className="font-semibold text-gray-800">23</span>
        </p>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">
          Today Absent{" "}
          <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full ml-2">
            4
          </span>
        </h4>
        <div className="flex items-center gap-3 mt-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="Rakesh's Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <div>
            <p className="font-semibold text-gray-800">Rakesh</p>
            <p className="text-sm text-gray-600">CEO at Dazuche</p>
            <p className="text-xs text-gray-500">30 May 2025</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Dashboard;
