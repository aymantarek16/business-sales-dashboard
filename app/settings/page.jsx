"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Bell, Mail, Smartphone, Lock } from "lucide-react";

const SettingsPage = () => {
  // States
  const [profile, setProfile] = useState({
    name: "Ayman Tarek",
    email: "ayman@example.com",
  });
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [password, setPassword] = useState("");

  // Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = () => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    alert("Password updated successfully!");
    setPassword("");
  };

  return (
    <div className="flex-1 relative overflow-auto z-10 bg-[#0f0f17] text-gray-200">
      <main className="max-w-5xl mx-auto py-8 px-4 lg:px-8 space-y-8">

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1b152a] to-[#14101f] p-6 rounded-2xl shadow-lg border border-[#2a2340]"
        >
          <h2 className="text-lg font-bold mb-4 text-gray-100">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 rounded-lg bg-[#1e1e1e] border border-[#2a2340] text-gray-100 focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 rounded-lg bg-[#1e1e1e] border border-[#2a2340] text-gray-100 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </motion.div>


        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-[#1b152a] to-[#14101f] p-6 rounded-2xl shadow-lg border border-[#2a2340]"
        >
          <h2 className="text-lg font-bold mb-4 text-gray-100">Notifications</h2>
          <div className="space-y-3">
            {[
              { key: "email", label: "Email Notifications", icon: Mail },
              { key: "sms", label: "SMS Notifications", icon: Smartphone },
              { key: "push", label: "Push Notifications", icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-violet-400" />
                    <span>{item.label}</span>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key],
                      }))
                    }
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                      notifications[item.key] ? "bg-violet-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                        notifications[item.key] ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-[#1b152a] to-[#14101f] p-6 rounded-2xl shadow-lg border border-[#2a2340]"
        >
          <h2 className="text-lg font-bold mb-4 text-gray-100">Security</h2>
          <div>
            <label className="block text-sm text-gray-400 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#1e1e1e] border border-[#2a2340] text-gray-100 focus:outline-none focus:border-violet-500"
            />
            <button
              onClick={handlePasswordChange}
              className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg shadow transition cursor-pointer flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Update Password
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SettingsPage;
