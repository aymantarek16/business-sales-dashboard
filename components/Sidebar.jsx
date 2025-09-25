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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  // localStorage state (safe for SSR)
  const [isSideBarOpen, setisSideBarOpen] = useState(true);

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

  if (!mounted) return null; //  Hydration fix for localStorage

  return (
    <div
      className={`sidBar relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 
      ${isSideBarOpen ? "w-55" : "w-20"}`}
    >
      <div className="h-full bg-[#1e1e1e] backdrop-blur-md flex flex-col border-r border-[#2f2f2f]">
        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={`flex items-center  p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${
                    pathname === item.href ? "bg-purple-800 hover:bg-purple-800" : ""
                  }
                  ${isSideBarOpen ? "justify-start gap-1 mx-3" : "justify-center mx-2"}`}
                >
                  <IconComponent size={20} style={{ minWidth: "22px" }} />
                  {isSideBarOpen && (
                    <span className="ml-4 hidden md:block whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button >> Show only on desktop */}
        <button
          onClick={() => setisSideBarOpen(!isSideBarOpen)}
          className="hidden md:flex w-full items-center justify-center py-3 cursor-pointer border-t border-white/10 hover:bg-zinc-800 transition-colors"
        >
          {isSideBarOpen ? (
            <ChevronLeft size={22} />
          ) : (
            <ChevronRight size={22} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
