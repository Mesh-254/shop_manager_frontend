"use client";

import { useState } from "react";

const NotificationBar = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      message: "Low stock alert: Denim Jeans (8 units left)",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "success",
      message: "Data sync completed successfully",
      time: "10 min ago",
    },
    {
      id: 3,
      type: "info",
      message: "New sale recorded: $89.99",
      time: "15 min ago",
    },
  ]);

  const [syncStatus, setSyncStatus] = useState("synced"); // 'synced', 'syncing', 'offline'

  const getNotificationColor = (type) => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 border-yellow-200 text-yellow-800";
      case "success":
        return "bg-green-100 border-green-200 text-green-800";
      case "info":
        return "bg-blue-100 border-blue-200 text-blue-800";
      case "error":
        return "bg-red-100 border-red-200 text-red-800";
      default:
        return "bg-gray-100 border-gray-200 text-gray-800";
    }
  };

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case "synced":
        return "text-green-600";
      case "syncing":
        return "text-yellow-600";
      case "offline":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="fixed top-20 right-4 w-80 z-40 space-y-2">
      {/* Sync Status */}
      <div className="bg-white rounded-lg shadow-lg border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                syncStatus === "synced"
                  ? "bg-green-500"
                  : syncStatus === "syncing"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
              }`}
            ></div>
            <span className={`text-sm font-medium ${getSyncStatusColor()}`}>
              {syncStatus === "synced"
                ? "Synced"
                : syncStatus === "syncing"
                ? "Syncing..."
                : "Offline"}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {syncStatus === "synced"
              ? "Last sync: now"
              : syncStatus === "syncing"
              ? "Syncing data..."
              : "Connection lost"}
          </span>
        </div>
      </div>

      {/* Notifications */}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`rounded-lg border p-4 shadow-lg animate-fade-in ${getNotificationColor(
            notification.type
          )}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-xs mt-1 opacity-75">{notification.time}</p>
            </div>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;
