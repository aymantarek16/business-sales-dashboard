"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pie, Cell, Legend, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#FBC02D", "#03A9F4", "#EF4444", "#8BC34A"];

const OrderDistributionChart = () => {
  const [orderStatusData, setOrderStatusData] = useState([]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setOrderStatusData(data.orderStatus))
      .catch((err) => console.error("Failed to load data:", err));
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
      <h2 className="text-base md:text-xl font-semibold text-gray-100 mb-4 text-center md:text-left">
        Order Status Distribution
      </h2>

      <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={orderStatusData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              labelLine={{ stroke: "#9ca3af" }}
            >
              {orderStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 49, 0.8)",
                borderColor: "#4B5563",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
              cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              align="center"
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrderDistributionChart;
