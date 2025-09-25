"use client";

import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
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
        <p className="text-sm text-gray-400">{name}</p>
        <h2 className="text-lg font-bold text-white">{value}</h2>
      </div>
    </motion.div>
  );
};

export default StatCard;
