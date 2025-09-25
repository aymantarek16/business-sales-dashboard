"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

// Dummy data for cards
const stats = [
  { name: "Total Sales", value: "$24,300", icon: DollarSign },
  { name: "Orders", value: "1,250", icon: ShoppingCart },
  { name: "Customers", value: "890", icon: Users },
  { name: "Growth", value: "+12%", icon: TrendingUp },
];

// Dummy data for chart
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 4890 },
  { month: "Jun", sales: 6390 },
];

// Dummy data for table
const topProducts = [
  { name: "iPhone 15 Pro", sales: "$320" },
  { name: "MacBook Air M3", sales: "$210" },
  { name: "AirPods Pro 2", sales: "$180" },
  { name: "Apple Watch 9", sales: "$140" },
];

const SalesPage = () => {
  return (
    <div className="flex-1 relative overflow-auto z-10 bg-[#0f0f17] text-gray-200">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-8">

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-4 p-5 rounded-2xl 
                bg-gradient-to-br from-[#1b152a] to-[#14101f] 
                shadow-lg border border-[#2a2340]
                hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.6)]
                transition cursor-pointer"
              >
                <div className="p-3 rounded-full bg-[#2a2540] shadow-inner">
                  <Icon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.name}</p>
                  <h2 className="text-lg font-bold text-white">{stat.value}</h2>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1b152a] to-[#14101f] 
          p-6 rounded-2xl shadow-lg border border-[#2a2340]"
        >
          <h2 className="text-lg font-bold mb-4 text-gray-100">Sales Overview</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1b152a",
                    border: "1px solid #2a2340",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="sales"
                  fill="url(#colorSales)"
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1b152a] to-[#14101f] 
          p-6 rounded-2xl shadow-lg border border-[#2a2340]"
        >
          <h2 className="text-lg font-bold mb-4 text-gray-100">Top Products</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2a2340] text-gray-400 text-sm">
                <th className="py-2">Product</th>
                <th className="py-2">Sales</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, i) => (
                <tr
                  key={i}
                  className="border-b border-[#2a2340] last:border-0 hover:bg-[#1e1b2e] transition"
                >
                  <td className="py-3 text-gray-200">{product.name}</td>
                  <td className="py-3 font-medium text-violet-400">{product.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
};

export default SalesPage;
