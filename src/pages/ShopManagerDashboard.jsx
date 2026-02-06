"use client"

import { useState } from "react"
import Header from "../components/dashboard/Header"
import TabNavigation from "../components/dashboard/TabNavigation"
import OverviewSection from "../components/dashboard/OverviewSection"
import ShopManagement from "../components/dashboard/ShopManagement"
import InventoryManagement from "../components/dashboard/InventoryManagement"
import NotificationBar from "../components/dashboard/NotificationBar"
import Footer from "../components/dashboard/Footer"

// Additional components for completeness
const UserManagement = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "manager", shop: "Main Store", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "manager", shop: "Mall Branch", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "cashier", shop: "Online Store", status: "Active" },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Management</h2>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          Invite User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.shop}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-900">Edit</button>
                    <button className="text-teal-600 hover:text-teal-900">Promote</button>
                    <button className="text-red-600 hover:text-red-900">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const SalesManagement = () => {
  const sales = [
    { id: 1, customer: "Alice Cooper", amount: 150.0, date: "2025-07-31", items: 3, status: "Completed" },
    { id: 2, customer: "Bob Wilson", amount: 89.99, date: "2025-07-31", items: 1, status: "Completed" },
    { id: 3, customer: "Carol Davis", amount: 245.5, date: "2025-07-30", items: 5, status: "Completed" },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sales Management</h2>
          <p className="text-gray-600">Track and manage your sales transactions</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          Record New Sale
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">
                    ${sale.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-emerald-600 hover:text-emerald-900">View</button>
                    <button className="text-teal-600 hover:text-teal-900">Print</button>
                    <button className="text-red-600 hover:text-red-900">Refund</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const SubscriptionManagement = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscription Management</h2>
        <p className="text-gray-600">Manage your subscription plan and billing</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Plan */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">Active</span>
          </div>

          <div className="mb-4">
            <div className="text-2xl font-bold text-emerald-600 mb-1">Pro Plan</div>
            <div className="text-gray-600">$19.00 / month</div>
          </div>

          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              3 Shop Locations
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              100 Products
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              5 User Accounts
            </li>
          </ul>

          <div className="text-sm text-gray-500 mb-4">Next billing: August 31, 2025</div>

          <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-medium border-2 border-yellow-400">
            Upgrade to Premium
          </button>
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <div className="text-sm font-medium text-gray-900">Pro Plan</div>
                <div className="text-xs text-gray-500">July 31, 2025</div>
              </div>
              <div className="text-sm font-medium text-gray-900">$19.00</div>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <div className="text-sm font-medium text-gray-900">Pro Plan</div>
                <div className="text-xs text-gray-500">June 30, 2025</div>
              </div>
              <div className="text-sm font-medium text-gray-900">$19.00</div>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>
                <div className="text-sm font-medium text-gray-900">Pro Plan</div>
                <div className="text-xs text-gray-500">May 31, 2025</div>
              </div>
              <div className="text-sm font-medium text-gray-900">$19.00</div>
            </div>
          </div>

          <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            View All Invoices
          </button>
        </div>
      </div>
    </div>
  )
}

const ReportsSection = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h2>
        <p className="text-gray-600">Generate insights and track your business performance</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales Report</h3>
          <p className="text-gray-600 text-sm mb-4">Daily, weekly, and monthly sales analysis</p>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="text-3xl mb-4">📈</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Profit Analysis</h3>
          <p className="text-gray-600 text-sm mb-4">Revenue vs expenses breakdown</p>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
            Generate Report
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
          <div className="text-3xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Report</h3>
          <p className="text-gray-600 text-sm mb-4">Stock levels and movement analysis</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
            Generate Report
          </button>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend (Last 30 Days)</h3>
        <div className="h-64 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-600">Chart visualization will be displayed here</p>
            <p className="text-sm text-gray-500 mt-1">Integration with charting library pending</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShopManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [userRole, setUserRole] = useState("admin") // 'admin' or 'manager'
  const [username, setUsername] = useState("John Doe")

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewSection userRole={userRole} />
      case "shops":
        return userRole === "admin" ? <ShopManagement /> : <InventoryManagement />
      case "users":
        return userRole === "admin" ? <UserManagement /> : <SalesManagement />
      case "subscriptions":
        return userRole === "admin" ? <SubscriptionManagement /> : <SalesManagement />
      case "inventory":
        return <InventoryManagement />
      case "sales":
        return <SalesManagement />
      case "purchases":
        return <SalesManagement /> // Placeholder - would be PurchaseManagement
      case "reports":
        return <ReportsSection />
      default:
        return <OverviewSection userRole={userRole} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-100">
      <Header userRole={userRole} username={username} />
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />

      <main className="container mx-auto px-4 py-6">
        {/* Role Switcher for Demo */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Demo Mode - Switch Role:</span>
            <button
              onClick={() => setUserRole("admin")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                userRole === "admin" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setUserRole("manager")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                userRole === "manager" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Shop Manager
            </button>
          </div>
        </div>

        {renderTabContent()}
      </main>

      <NotificationBar />
      <Footer />
    </div>
  )
}

export default ShopManagerDashboard
