"use client";

import React, { useState } from "react";
import productData from "../public/data/data.json";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Edit, Trash2, Check } from "lucide-react";
import Image from "next/image";

const ProductsTable = () => {
  const [products, setProducts] = useState(productData.products);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = productData.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    setProducts(filtered);
  };

  const handleDelete = (id) => setConfirmDelete(id);
  const confirmDeleteRow = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setConfirmDelete(null);
  };

  const handleEdit = (id) => setEditingRow(id);
  const handleSaveClick = () => setEditingRow(null);

  const handleChange = (id, field, value) => {
    if (!/^\d*\.?\d+$/.test(value)) return;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: Number(value) } : product
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-gradient-to-br from-[#1b152a] to-[#14101f] 
      shadow-lg rounded-2xl p-4 md:p-8 border border-[#2a2340] mx-auto mb-8 relative w-full"
    >
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 md:gap-0 w-full">
        <h2 className="text-lg md:text-xl font-semibold text-gray-100 text-center md:text-left">
          Products List
        </h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-[#2a2540] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-3 w-full
            focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200 text-sm md:text-base"
          />
          <Search
            className="absolute left-3 top-3 md:top-3.5 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto divide-y divide-[#2a2340]">
          <thead className="bg-[#1e1b2e]">
            <tr>
              {[
                "ID",
                "Name",
                "Category",
                "Price",
                "Stock",
                "Sales",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm md:text-base font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#2a2340]">
            {products.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="hover:bg-[#1e1b2e] relative"
              >
                <td className="px-4 py-3 text-xs md:text-base text-gray-200 whitespace-nowrap">
                  {product.id}
                </td>
                <td className="px-2 py-3 text-xs md:text-base relative top-1 text-gray-200 flex items-center gap-2 whitespace-nowrap">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span
                    className="max-w-[120px] md:max-w-xs lg:max-w-sm truncate"
                    title={product.name}
                  >
                    {product.name}
                  </span>
                </td>

                <td className="px-2 pl-7 py-3 text-xs md:text-base text-gray-200 whitespace-nowrap">
                  {product.category}
                </td>

                {/* Editable Fields */}
                <td className="px-2 pl-7 py-3 text-xs md:text-base text-gray-200 whitespace-nowrap">
                  {editingRow === product.id ? (
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) =>
                        handleChange(product.id, "price", e.target.value)
                      }
                      className="w-24 md:w-28 bg-[#2a2540] text-white rounded px-2 py-1 md:py-2 text-sm md:text-base"
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>

                <td className="px-4 py-3 text-sm md:text-base text-gray-200 whitespace-nowrap">
                  {editingRow === product.id ? (
                    <input
                      type="text"
                      value={product.stock}
                      onChange={(e) =>
                        handleChange(product.id, "stock", e.target.value)
                      }
                      className="w-20 md:w-24 bg-[#2a2540] text-white rounded px-2 py-1 md:py-2 text-sm md:text-base"
                    />
                  ) : (
                    product.stock
                  )}
                </td>

                <td className="px-4 py-3 text-sm md:text-base text-gray-200 whitespace-nowrap">
                  {editingRow === product.id ? (
                    <input
                      type="text"
                      value={product.sales || 0}
                      onChange={(e) =>
                        handleChange(product.id, "sales", e.target.value)
                      }
                      className="w-20 md:w-24 bg-[#2a2540] text-white rounded px-2 py-1 md:py-2 text-sm md:text-base"
                    />
                  ) : (
                    product.sales || 0
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-sm md:text-base text-gray-200 flex gap-2 md:gap-3 relative whitespace-nowrap">
                  {editingRow === product.id ? (
                    <button
                      onClick={handleSaveClick}
                      className="flex items-center gap-1 md:gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 md:px-5 md:py-2 rounded cursor-pointer text-sm md:text-base"
                    >
                      <Check size={16} /> Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="flex items-center gap-1 md:gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 md:px-5 md:py-2 rounded cursor-pointer text-sm md:text-base"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex items-center gap-1 md:gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 md:px-5 md:py-2 rounded cursor-pointer text-sm md:text-base"
                        >
                          <Trash2 size={16} /> Delete
                        </button>

                        {/* Popover */}
                        <AnimatePresence>
                          {confirmDelete === product.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.9 }}
                              animate={{ opacity: 1, y: -15, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.9 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-3/2 bg-[#1e1b2e] border border-[#2a2340] p-3 rounded shadow-lg flex items-center gap-2 z-20"
                            >
                              <span className="text-gray-200 text-base">
                                Sure?
                              </span>
                              <button
                                onClick={() => confirmDeleteRow(product.id)}
                                className="cursor-pointer bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-sm"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded text-sm"
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

export default ProductsTable;
