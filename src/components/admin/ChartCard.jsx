import { BarChart2, LineChart } from "lucide-react";

const ChartCard = ({ title, year, chartType }) =>  (
  <div className="bg-white p-4 rounded-md shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-semibold text-sm text-gray-700">{title}</h4>
      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
        {year}
      </span>
    </div>
    <div className="h-40 flex items-center justify-center text-gray-500">
      {chartType === "bar" ? <BarChart2 size={64} /> : <LineChart size={64} />}
    </div>
  </div>
);

export default ChartCard;
