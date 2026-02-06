const MetricsCard = ({ title, value, icon, trend, trendValue }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        {trend && (
          <div
            className={`flex items-center text-sm font-semibold ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? "↗" : "↘"} {trendValue}
          </div>
        )}
      </div>

      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default MetricsCard;
