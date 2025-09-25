"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Search, Trash2, Check } from "lucide-react";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/data/data.json");
        const data = await res.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error Fetching Orders", error);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => setEditingRow(id);
  const handleSave = () => setEditingRow(null);

  const handleChange = (id, field, value) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, [field]: value } : order
      )
    );
  };

  const handleDelete = (id) => setConfirmDelete(id);

  const confirmDeleteRow = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
    setConfirmDelete(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-gradient-to-br from-[#1a0b2e] via-[#12081f] to-[#1a0b2e] shadow-xl rounded-2xl p-6 border border-violet-900/40"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-violet-200 text-center sm:text-left">
          Orders
        </h2>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#241034] text-white placeholder-gray-400 border border-violet-800/50 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-violet-600 transition duration-200"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-violet-900/30">
        <table className="min-w-full divide-y divide-violet-900/40">
          <thead className="bg-[#2b1645]/60">
            <tr>
              {[
                "Order ID",
                "Client",
                "Email",
                "Total",
                "Status",
                "Date",
                "Country",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 sm:px-6 py-3 text-left text-sm font-medium text-violet-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-violet-900/30">
            {filteredOrders.map((order) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="hover:bg-violet-950/30 transition-colors"
              >
                {/* Order ID */}
                <td className="px-6 py-4 text-sm text-violet-100 font-medium">
                  {order.id}
                </td>

                {/* Client */}
                <td className="px-6 py-4 text-sm text-gray-300">
                  {editingRow === order.id ? (
                    <input
                      type="text"
                      value={order.client}
                      onChange={(e) =>
                        handleChange(order.id, "client", e.target.value)
                      }
                      className="bg-[#241034] border border-violet-800/50 text-white rounded px-2 py-2 w-full"
                    />
                  ) : (
                    order.client
                  )}
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-sm text-gray-300">
                  {editingRow === order.id ? (
                    <input
                      type="text"
                      value={order.email}
                      onChange={(e) =>
                        handleChange(order.id, "email", e.target.value)
                      }
                      className="bg-[#241034] border border-violet-800/50 text-white rounded px-2 py-2 w-full"
                    />
                  ) : (
                    order.email
                  )}
                </td>

                {/* Total */}
                <td className="px-6 py-4 text-sm text-gray-300">
                  {editingRow === order.id ? (
                    <input
                      type="number"
                      value={order.total}
                      onChange={(e) =>
                        handleChange(order.id, "total", e.target.value)
                      }
                      className="bg-[#241034] border border-violet-800/50 text-white rounded px-2 py-2 w-[70px]"
                    />
                  ) : (
                    `$${order.total}`
                  )}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                      ${
                        order.status === "Pending"
                          ? "bg-yellow-600/80 text-yellow-100"
                          : order.status === "Delivered"
                          ? "bg-green-600/80 text-green-100"
                          : order.status === "Canceled"
                          ? "bg-red-600/80 text-red-100"
                          : "bg-blue-600/80 text-blue-100"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-sm text-gray-300">
                  {editingRow === order.id ? (
                    <input
                      type="text"
                      value={order.date}
                      onChange={(e) =>
                        handleChange(order.id, "date", e.target.value)
                      }
                      className="bg-[#241034] border border-violet-800/50 text-white rounded px-2 py-2 w-[90px]"
                    />
                  ) : (
                    order.date
                  )}
                </td>

                {/* Country */}
                <td className="px-6 py-4 text-sm text-gray-300">
                  {editingRow === order.id ? (
                    <input
                      type="text"
                      value={order.country}
                      onChange={(e) =>
                        handleChange(order.id, "country", e.target.value)
                      }
                      className="bg-[#241034] border border-violet-800/50 text-white rounded px-2 py-2 w-[90px]"
                    />
                  ) : (
                    order.country
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex gap-3 relative">
                  {editingRow === order.id ? (
                    <button
                      onClick={handleSave}
                      className="cursor-pointer flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm"
                    >
                      <Check size={16} /> Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(order.id)}
                        className="cursor-pointer flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded text-sm"
                      >
                        <Edit size={16} /> Edit
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="cursor-pointer flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-sm"
                        >
                          <Trash2 size={16} /> Delete
                        </button>

                        {/* Delete Confirmation */}
                        <AnimatePresence>
                          {confirmDelete === order.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.95 }}
                              animate={{ opacity: 1, y: -12, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-3/2 bg-[#1e0f2f] border border-violet-800/50 p-3 rounded shadow-lg flex items-center gap-2 z-20"
                            >
                              <span className="text-violet-100 text-sm">
                                Sure?
                              </span>
                              <button
                                onClick={() => confirmDeleteRow(order.id)}
                                className="cursor-pointer bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs"
                              >
                                Cancel
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrdersTable;
