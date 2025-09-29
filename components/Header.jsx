"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Bell, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
   const pathname = usePathname();

  // map routes to page names
  const titles = {
    "/": "Dashboard",
    "/products": "Products",
    "/users": "Clients",
    "/orders": "Orders",
    "/sales": "Sales",
    "/settings": "Settings",
    "/messages": "Messages",
    "/notifications": "Notifications",
    "/help": "Help",
  };

  const pageTitle = titles[pathname] || "Page";

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New order received" },
    { id: 2, text: "Server reboot completed" },
    { id: 3, text: "New user registered" },
  ]);

  // Refs for dropdown
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delete a single notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Delete all notifications
  const clearAll = () => setNotifications([]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-2xl shadow-lg border border-[#2a2340] 
      bg-gradient-to-r from-[#1b152a] to-[#14101f] backdrop-blur-lg relative z-1"
    >
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-100 tracking-wide">
          {pageTitle}
        </h1>

        {/* Right Section */}
        <div className="flex items-center space-x-3 sm:space-x-6 relative">
          {/* Country flag */}
          <Image
            src="/images/eg.png"
            alt="country flag"
            width={28}
            height={20}
            className="rounded shadow-md cursor-pointer hover:scale-105 transition"
          />

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <Bell
              className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 cursor-pointer hover:text-violet-400 transition"
              onClick={() => setShowNotifications((prev) => !prev)}
            />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-violet-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow">
                {notifications.length}
              </span>
            )}

            {/* Dropdown Notifications */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -right-15 sm:-right-0 mt-3 w-72 bg-[#1e1b2e] border border-[#2a2340] rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2340] text-sm text-gray-300">
                    <button
                      onClick={() => setNotifications([])}
                      className="hover:text-violet-400"
                    >
                      Clear all
                    </button>
                    <button
                      onClick={() => alert("All marked as read")}
                      className="hover:text-violet-400"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="flex items-center justify-between px-4 py-2 hover:bg-[#2a2340] text-gray-200 text-sm"
                        >
                          <span>{n.text}</span>
                          <X
                            className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                            onClick={() => deleteNotification(n.id)}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="px-4 py-3 text-center text-gray-400 text-sm">
                        No notifications
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            >
              <Image
                src="/images/admin.jpg"
                alt="admin"
                width={38}
                height={38}
                className="rounded-full border border-violet-500 shadow-md"
              />
              <span className="hidden sm:block text-gray-100 font-medium">
                Ayman Tarek
              </span>
            </motion.div>

            {/* Dropdown Profile */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-48 bg-[#1e1b2e] border border-[#2a2340] rounded-xl shadow-lg overflow-hidden"
                >
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2340] hover:text-violet-400 cursor-pointer"
                  >
                    Settings
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#2a2340] hover:text-violet-400 cursor-pointer"
                  >
                    Log out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
