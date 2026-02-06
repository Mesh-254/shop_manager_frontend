"use client";

const TabNavigation = ({ activeTab, setActiveTab, userRole }) => {
  const adminTabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "shops", label: "Shop Management", icon: "🏪" },
    { id: "users", label: "User Management", icon: "👥" },
    { id: "subscriptions", label: "Subscriptions", icon: "💳" },
    { id: "reports", label: "Reports", icon: "📈" },
  ];

  const managerTabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "inventory", label: "Inventory", icon: "📦" },
    { id: "sales", label: "Sales", icon: "🧾" },
    { id: "purchases", label: "Purchases", icon: "🛒" },
    { id: "reports", label: "Reports", icon: "📈" },
  ];

  const tabs = userRole === "admin" ? adminTabs : managerTabs;

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-emerald-600 text-emerald-600 bg-emerald-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
