import MetricsCard from "./MetricsCard";

const OverviewSection = ({ userRole }) => {
  const adminMetrics = [
    {
      title: "Total Revenue",
      value: "$25,430",
      icon: "💰",
      trend: "up",
      trendValue: "12%",
    },
    {
      title: "Active Shops",
      value: "8",
      icon: "🏪",
      trend: "up",
      trendValue: "2",
    },
    {
      title: "Total Users",
      value: "24",
      icon: "👥",
      trend: "up",
      trendValue: "4",
    },
    {
      title: "Subscriptions",
      value: "$1,890",
      icon: "💳",
      trend: "up",
      trendValue: "8%",
    },
  ];

  const managerMetrics = [
    {
      title: "Today's Sales",
      value: "$1,250",
      icon: "🧾",
      trend: "up",
      trendValue: "5%",
    },
    {
      title: "Products in Stock",
      value: "156",
      icon: "📦",
      trend: "down",
      trendValue: "3",
    },
    {
      title: "Pending Orders",
      value: "7",
      icon: "🛒",
      trend: "up",
      trendValue: "2",
    },
    {
      title: "Low Stock Items",
      value: "12",
      icon: "⚠️",
      trend: "up",
      trendValue: "4",
    },
  ];

  const metrics = userRole === "admin" ? adminMetrics : managerMetrics;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-600">
          {userRole === "admin"
            ? "Monitor your entire business performance across all shops"
            : "Track your shop's daily operations and inventory status"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricsCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {userRole === "admin" ? (
            <>
              <button className="bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                Add New Shop
              </button>
              <button className="bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                Invite User
              </button>
              <button className="bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                View Reports
              </button>
              <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                Manage Plans
              </button>
            </>
          ) : (
            <>
              <button className="bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                Add Product
              </button>
              <button className="bg-teal-600 text-white px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                Record Sale
              </button>
              <button className="bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium">
                New Purchase
              </button>
              <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                Stock Report
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
