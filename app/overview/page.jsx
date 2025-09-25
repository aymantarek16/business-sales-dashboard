"use client";

import StatCard from "@/components/StatCard";
import { DollarSign, ShoppingBag, SquareActivity, Users } from "lucide-react";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load charts using React.lazy
const SalesOverviewChart = lazy(() => import("@/components/SalesOverviewChart"));
const CategoryDistributionChart = lazy(() => import("@/components/CategoryDistributionChart"));
const OrderDistributionChart = lazy(() => import("@/components/OrderDistributionChart"));
const ProductPerformanceChart = lazy(() => import("@/components/ProductPerformanceChart"));

const statCards = [
  { name: "Total Sales", icon: DollarSign, value: "$182,450" },
  { name: "Total Clients", icon: Users, value: "1,437" },
  { name: "Total Products", icon: ShoppingBag, value: "674" },
  { name: "Stock", icon: SquareActivity, value: "12,845" },
];

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto p-4 lg:px-8 overflow-hidden">
        {/* Stat Cards with stagger animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              aria-label={`${card.name}: ${card.value}`}
            >
              <StatCard name={card.name} icon={card.icon} value={card.value} />
            </motion.div>
          ))}
        </motion.div>

        {/* Charts grid using Suspense for lazy loading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-8">
          <Suspense fallback={<div className="flex justify-center items-center h-64"><LoadingSpinner /></div>}>
            <SalesOverviewChart aria-label="Sales Overview Chart" />
          </Suspense>

          <Suspense fallback={<div className="flex justify-center items-center h-64"><LoadingSpinner /></div>}>
            <CategoryDistributionChart aria-label="Category Distribution Chart" />
          </Suspense>

          <Suspense fallback={<div className="flex justify-center items-center h-64"><LoadingSpinner /></div>}>
            <OrderDistributionChart aria-label="Order Distribution Chart" />
          </Suspense>

          <Suspense fallback={<div className="flex justify-center items-center h-64"><LoadingSpinner /></div>}>
            <ProductPerformanceChart aria-label="Product Performance Chart" />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
