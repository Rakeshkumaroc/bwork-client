import { Briefcase, Users, UserCheck, Building } from "lucide-react";
import Topbar from "../../components/admin/Topbar";
import StatCard from "../../components/admin/StatCard";
import ChartCard from "../../components/admin/ChartCard";
import MiniCard from "../../components/admin/MiniCard";


const Dashboard = () => {


  return (
    <div className="flex-1 bg-light-cream pl-8 pr-4 py-4 overflow-auto">
      {/* Topbar */}
      <Topbar />
       {/* Welcome Message */}
      {/* {orgName && (
        <div className="mb-6  md:px-20 text-center">
          <h2 className="lg:text-2xl  sm:text-xl text-lg font-bold text-orange-global">
            Welcome to {orgName}!
          </h2>
        </div>
      )} */}


      {/* Stats Summary */}
      <div className="grid  grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 mb-6 md:px-20">
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
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Total Revenue" year="2025" chartType="bar" />
        <ChartCard title="Sales Overview" year="2025" chartType="line" />
      </div>

      {/* Revenue Widgets */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <MiniCard title="New Employees" value="2500" trend="+10%" />
        <MiniCard title="Earnings" value="Rs. 25000" trend="+20%" />
        <MiniCard title="Expenses" value="Rs. 34000" trend="-5%" />
        <MiniCard title="Profit" value="Rs. 52000" trend="-15%" />
      </div>

      {/* Bottom Widgets */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-cream p-4 rounded-xl shadow-md">
          <h4 className="font-semibold mb-2">Today Leave</h4>
          <p>12/60</p>
          <h4 className="font-semibold mt-4 mb-2">Pending Invoice</h4>
          <p>15/60</p>
        </div>
        <div className="bg-cream p-4 rounded-xl shadow-md text-center">
          <h4 className="font-semibold mb-2">Total Tasks</h4>
          <p className="text-3xl font-bold text-orange-500">476</p>
          <p>
            Overdue: <span className="font-semibold">23</span>
          </p>
        </div>
        <div className="bg-cream p-4 rounded-xl shadow-md">
          <h4 className="font-semibold mb-2">
            Today Absent{" "}
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full ml-2">
              4
            </span>
          </h4>
          <div className="flex items-center gap-3 mt-4">
            <img
              src="https://i.pravatar.cc/40"
              alt="Employee"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Rakesh</p>
              <p className="text-sm text-gray-500">CEO at Dazuche</p>
              <p className="text-xs text-gray-400">30 May 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
