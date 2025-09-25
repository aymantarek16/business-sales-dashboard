"use client";

import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";

const SalesOverviewChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setSalesData(data.sales));
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-[#1b152a] to-[#14101f]
                 shadow-lg border border-[#2a2340]
                 rounded-2xl p-5 cursor-pointer
                 hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.6)]
                 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-100 text-center md:text-left">
        Sales Overview
      </h2>
      <div className="h-64 md:h-80 overflow-hidden rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2340" />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#9ca3af"
              tickCount={5}
              tick={{ fontSize: 12 }}
              width={40}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#9c27b0"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#9c27b0" }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
