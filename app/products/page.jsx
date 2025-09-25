"use client";

import React from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";
import {
  ChartBarStacked,
  DollarSign,
  ShoppingBag,
  SquareActivity,
} from "lucide-react";
import ProductsTable from "@/components/ProductsTable";

const stats = [
  { name: "Total Products", icon: ShoppingBag, value: "4,352" },
  { name: "Total Stock", icon: SquareActivity, value: "18,450" },
  { name: "Total Sold", icon: DollarSign, value: "12,780" },
  { name: "Total Categories", icon: ChartBarStacked, value: 8 },
];

const ProductsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 overflow-x-hidden">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              name={stat.name}
              icon={stat.icon}
              value={stat.value}
            />
          ))}

          <ProductsTable />
        </motion.div>
      </main>
    </div>
  );
};

export default ProductsPage;
