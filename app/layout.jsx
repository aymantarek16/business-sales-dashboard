import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Business Sales Dashboard",
  description: "A dashboard to visualize business sales data",
  icons: {
    icon: "/images/Business Sales Dashboard.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] text-white`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar Component */}
          <Sidebar />
          <div className="nav&main flex flex-col flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto w-full">
              {/* Header Component */}
              <Header />
              <main>{children}</main>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
