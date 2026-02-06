const InventoryManagement = () => {
  const products = [
    {
      id: 1,
      name: "Classic T-Shirt",
      sku: "TSH-001",
      stock: 45,
      reorderLevel: 10,
      price: "$19.99",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Denim Jeans",
      sku: "JNS-002",
      stock: 8,
      reorderLevel: 15,
      price: "$49.99",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Running Shoes",
      sku: "SHO-003",
      stock: 0,
      reorderLevel: 5,
      price: "$89.99",
      status: "Out of Stock",
    },
    {
      id: 4,
      name: "Baseball Cap",
      sku: "CAP-004",
      stock: 23,
      reorderLevel: 8,
      price: "$24.99",
      status: "In Stock",
    },
    {
      id: 5,
      name: "Leather Wallet",
      sku: "WAL-005",
      stock: 12,
      reorderLevel: 10,
      price: "$34.99",
      status: "In Stock",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Inventory Management
          </h2>
          <p className="text-gray-600">
            Track and manage your product inventory
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Import Products
          </button>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
            Add Product
          </button>
        </div>
      </div>

      {/* Stock Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <span className="text-yellow-600 text-xl mr-3">⚠️</span>
          <div>
            <h3 className="text-yellow-800 font-medium">Stock Alerts</h3>
            <p className="text-yellow-700 text-sm">
              2 products are running low on stock and need reordering
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.stock} units
                    </div>
                    <div className="text-xs text-gray-500">
                      Reorder at {product.reorderLevel}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-900">
                      Edit
                    </button>
                    <button className="text-teal-600 hover:text-teal-900">
                      Adjust Stock
                    </button>
                    <button className="text-purple-600 hover:text-purple-900">
                      Reorder
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

export default InventoryManagement;
