"use client";

import React, { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#FF6B6B", "#4D96FF", "#FFD166", "#06D6A0", "#A29BFE"];

const CategoryDistributionChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(false);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setCategoryData(data.categories));
  }, []);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallOrMediumScreen(window.innerWidth < 768);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const outerRadius = isSmallOrMediumScreen ? 60 : 100;

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
        Category Distribution
      </h2>
      <div className="h-64 md:h-80 overflow-hidden rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={outerRadius}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4b5563",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Legend
              iconType="circle"
              layout="horizontal"
              align="center"
              wrapperStyle={{ fontSize: 12, paddingTop: "30px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
