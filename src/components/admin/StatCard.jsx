
const StatCard = ({ label, value, icon}) => {
  return (
    <div className="bg-cream rounded-xl px-4 py-3 flex items-center space-x-4 shadow-sm w-full">
      <div className="w-10 h-10 rounded-full border-2 border-orange-200 flex items-center justify-center">
        <div className="text-orange-500">{icon}</div>
      </div>
      <div>
        <p className=" text-orange-500 font-semibold">{label}</p>
        <p className="text-2xl font-bold text-black">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
