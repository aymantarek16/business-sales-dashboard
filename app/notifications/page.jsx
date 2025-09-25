"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCheck,
  Trash2,
  UserPlus,
  AtSign,
  AlertCircle,
} from "lucide-react";

const NotificationsPage = () => {
  const [filter, setFilter] = useState("All");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "mention",
      text: "Sarah mentioned you in a comment",
      time: "2m ago",
    },
    {
      id: 2,
      type: "system",
      text: "Your password was changed successfully",
      time: "10m ago",
    },
    {
      id: 3,
      type: "friend",
      text: "Mike sent you a friend request",
      time: "1h ago",
    },
    {
      id: 4,
      type: "mention",
      text: "John tagged you in a post",
      time: "2h ago",
    },
    {
      id: 5,
      type: "system",
      text: "New update available. Please refresh.",
      time: "1d ago",
    },
  ]);

  // Filter notifications based on selected tab
  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.type === filter.toLowerCase());

  // Delete a single notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // Delete all notifications
  const clearAll = () => setNotifications([]);

  return (
    <div className="flex mt-6 h-[80vh] bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#2a2540]">
      {/* Sidebar */}
      <div className="w-64 bg-[#2a2540] p-4 flex flex-col">
        <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" /> Notifications
        </h2>
        <div className="space-y-2">
          {["All", "Mentions", "System", "Friend"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`w-full text-left px-3 py-2 rounded-lg transition ${
                filter === tab
                  ? "bg-violet-600 text-white"
                  : "bg-[#1e1e1e] text-gray-300 hover:bg-[#3a3350]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-auto space-y-2">
          <button
            onClick={clearAll}
            className="w-[calc(100%-25px)] mx-auto cursor-pointer px-3 py-2 rounded-lg flex items-center justify-center gap-2 bg-red-800 text-white hover:bg-red-500 transition"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e]">
        <div className="px-4 py-3 border-b border-[#2a2540] flex justify-between items-center">
          <h2 className="text-gray-100 font-bold">{filter} Notifications</h2>
          <button
            onClick={() => setNotifications([])}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-violet-400 transition"
          >
            <CheckCheck className="w-4 h-4" /> Mark all as read
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <AnimatePresence>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between bg-[#2a2540] p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3 text-gray-200">
                    {n.type === "mention" && (
                      <AtSign className="w-5 h-5 text-violet-400" />
                    )}
                    {n.type === "system" && (
                      <AlertCircle className="w-5 h-5 text-blue-400" />
                    )}
                    {n.type === "friend" && (
                      <UserPlus className="w-5 h-5 text-green-400" />
                    )}
                    <div>
                      <p className="font-medium">{n.text}</p>
                      <p className="text-xs text-gray-400">{n.time}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => deleteNotification(n.id)}
                    whileHover={{ scale: 1.05}}
                    whileTap={{ scale: 0.9}}
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl 
             bg-gradient-to-r from-red-600 via-pink-600 to-violet-700
             text-white font-semibold shadow-lg shadow-red-800/50
             hover:shadow-red-500/80 transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Delete</span>
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-10">
                No notifications here 🎉
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
