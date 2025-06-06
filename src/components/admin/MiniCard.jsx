 


const MiniCard = ({ title, value, trend }) => (
  <div className="bg-cream p-4 rounded-xl shadow-md">
    <h4 className="text-sm text-gray-500">{title}</h4>
    <p className="text-xl font-bold">{value}</p>
    <p
      className={`text-sm ${
        trend.startsWith("+") ? "text-green-500" : "text-red-500"
      }`}
    >
      {trend}
    </p>
  </div>
);

export default MiniCard