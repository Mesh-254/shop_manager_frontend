export const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "manager", shop: "Main Store", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "manager", shop: "Mall Branch", status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "manager", shop: "Online Store", status: "Active" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "cashier", shop: "Main Store", status: "Active" },
  { id: 5, name: "Tom Brown", email: "tom@example.com", role: "cashier", shop: "Mall Branch", status: "Inactive" },
]

export const mockSales = [
  { id: 1, customer: "Alice Cooper", amount: 150.0, date: "2025-07-31", items: 3, status: "Completed" },
  { id: 2, customer: "Bob Wilson", amount: 89.99, date: "2025-07-31", items: 1, status: "Completed" },
  { id: 3, customer: "Carol Davis", amount: 245.5, date: "2025-07-30", items: 5, status: "Completed" },
  { id: 4, customer: "David Miller", amount: 67.25, date: "2025-07-30", items: 2, status: "Refunded" },
  { id: 5, customer: "Eva Garcia", amount: 123.75, date: "2025-07-29", items: 4, status: "Completed" },
]

export const mockPurchases = [
  { id: 1, supplier: "Fashion Wholesale Co.", amount: 2500.0, date: "2025-07-28", status: "Delivered", items: 50 },
  { id: 2, supplier: "Shoe Distributors Inc.", amount: 1800.0, date: "2025-07-25", status: "Pending", items: 20 },
  { id: 3, supplier: "Accessories Plus", amount: 750.0, date: "2025-07-22", status: "Delivered", items: 30 },
  { id: 4, supplier: "Denim Factory", amount: 3200.0, date: "2025-07-20", status: "In Transit", items: 80 },
]

export const mockSubscriptionPlans = [
  {
    id: 1,
    name: "Pro Plan",
    price: 19.0,
    billing: "monthly",
    features: ["3 Shops", "100 Products", "5 Users", "Advanced Analytics"],
    status: "Active",
    nextBilling: "2025-08-31",
  },
]
