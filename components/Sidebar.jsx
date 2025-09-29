"use client";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  House,
  Info,
  Mail,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ICONS = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,
};

const Sidebar = () => {
  const pathname = usePathname();
  const [sidebarItems, setSidebarItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  // localStorage state (desktop only)
  const [isSideBarOpen, setisSideBarOpen] = useState(true);

  // mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sidebarOpen");
    if (saved !== null) setisSideBarOpen(saved === "true");
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sidebarOpen", isSideBarOpen);
    }
  }, [isSideBarOpen, mounted]);

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setSidebarItems(data.sidebarItems));
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ====== Mobile Burger Button ====== */}
      <div className="sm:hidden fixed top-8 left-35 z-500">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md bg-violet-600 text-white shadow-lg"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ========= Mobile Sidebar ======== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-full w-64 z-400 pt-5
              bg-gradient-to-b from-[#2a1f4d]/85 via-[#4c1d95]/70 to-[#14101f]/90 
              border-r border-white/10 shadow-2xl backdrop-blur-2xl overflow-y-auto"
          >
            <nav className="mt-16 px-3">
              {sidebarItems.map((item) => {
                const IconComponent = ICONS[item.icon];
                const isActive = pathname === item.href;

                return (
                  <Link key={item.name} href={item.href} onClick={() => setMobileOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center p-3 rounded-xl transition-all duration-200 mb-2 cursor-pointer
                        ${
                          isActive
                            ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-700/40"
                            : "text-gray-300 hover:bg-white/10 hover:text-violet-300"
                        }
                      `}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <span className="ml-2 text-sm font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== Desktop Sidebar ====== */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`hidden sm:block sidBar relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 
        ${isSideBarOpen ? "w-56" : "w-20"}`}
      >
        <div
          className="h-full flex flex-col border-r border-white/10 shadow-2xl
    bg-gradient-to-b from-[#2a1f4d]/85 via-[#4c1d95]/70 to-[#14101f]/90 
    backdrop-blur-2xl relative overflow-hidden"
          style={{
            backgroundImage: `url('https://www.transparenttextures.com/patterns/hexellence.png')`,
            backgroundSize: "180px",
            backgroundColor: "#181129",
            backgroundBlendMode: "overlay",
          }}
        >
          {/* Nav Links */}
          <nav className="mt-8 flex-grow">
            {sidebarItems.map((item) => {
              const IconComponent = ICONS[item.icon];
              const isActive = pathname === item.href;

              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center p-3 rounded-xl transition-all duration-200 mb-2 cursor-pointer
                      ${
                        isActive
                          ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-700/40"
                          : "text-gray-300 hover:bg-white/10 hover:text-violet-300"
                      }
                      ${
                        isSideBarOpen
                          ? "justify-start gap-3 mx-3"
                          : "justify-center mx-2"
                      }
                    `}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    {isSideBarOpen && (
                      <span className="ml-1 text-sm font-medium whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Collapse Button */}
          <button
            onClick={() => setisSideBarOpen(!isSideBarOpen)}
            className="flex w-full items-center justify-center py-3 cursor-pointer 
            border-t border-white/10 hover:bg-white/10 text-gray-400 hover:text-violet-300 transition-colors"
          >
            {isSideBarOpen ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
