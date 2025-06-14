const MiniCard = ({ title, value, trend }) => (
  <div className="bg-white p-4 rounded-md shadow-md">
    <h4 className="text-sm text-gray-600">{title}</h4>
    <p className="text-xl font-bold text-gray-800">{value}</p>
    <p
      className={`text-sm ${
        trend.startsWith("+") ? "text-green-600" : "text-red-600"
      }`}
    >
      {trend}
    </p>
  </div>
);

export default MiniCard