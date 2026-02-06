const ShopManagement = () => {
  const shops = [
    {
      id: 1,
      name: "Main Store",
      description: "Downtown location",
      status: "Active",
      manager: "John Doe",
      sales: "$5,200",
    },
    {
      id: 2,
      name: "Mall Branch",
      description: "Shopping center outlet",
      status: "Active",
      manager: "Jane Smith",
      sales: "$3,800",
    },
    {
      id: 3,
      name: "Online Store",
      description: "E-commerce platform",
      status: "Active",
      manager: "Mike Johnson",
      sales: "$7,100",
    },
    {
      id: 4,
      name: "Warehouse",
      description: "Storage and distribution",
      status: "Inactive",
      manager: "Unassigned",
      sales: "$0",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Shop Management
          </h2>
          <p className="text-gray-600">
            Manage all your shop locations and assign managers
          </p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          Add New Shop
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {shops.map((shop) => (
                <tr key={shop.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {shop.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {shop.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {shop.manager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        shop.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {shop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {shop.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-900">
                      Edit
                    </button>
                    <button className="text-teal-600 hover:text-teal-900">
                      Assign Manager
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShopManagement;
