
const StatCard = ({ label, value, icon}) => {
   return (
    <div className="bg-white rounded-md p-4 flex items-center space-x-4 shadow-md w-full">
      <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
        <div className="text-gray-800">{icon}</div>
      </div>
      <div>
        <p className="text-gray-700 font-semibold text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
