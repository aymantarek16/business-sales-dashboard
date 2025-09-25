"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Search, Trash2, Check } from "lucide-react";
import Image from "next/image";

const UsersTable = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/data/data.json");
        const data = await res.json();
        setClients(data.clients);
      } catch (error) {
        console.error("Error Fetching Clients", error);
      }
    };
    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => setEditingRow(id);
  const handleSave = () => setEditingRow(null);

  const handleChange = (id, field, value) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, [field]: value } : client
      )
    );
  };

  const handleDelete = (id) => setConfirmDelete(id);

  const confirmDeleteRow = (id) => {
    setClients((prev) => prev.filter((client) => client.id !== id));
    setConfirmDelete(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-[#1e1e1e] backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-100 text-center sm:text-left">
          Clients
        </h2>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Clients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#2f2f2f] text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-[#2a2a2a]">
            <tr>
              {["Name", "Email", "Phone Numbers", "Country", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-3 sm:px-6 py-3 text-left text-sm font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredClients.map((client) => (
              <motion.tr
                key={client.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="hover:bg-gray-800 relative"
              >
                {/* Name + Avatar */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <Image
                    src={client.image}
                    alt="client image"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-gray-100">{client.name}</span>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-sm text-gray-300">
                  {editingRow === client.id ? (
                    <input
                      type="text"
                      value={client.email}
                      onChange={(e) =>
                        handleChange(client.id, "email", e.target.value)
                      }
                      className="bg-gray-700 text-white rounded px-2 py-2"
                    />
                  ) : (
                    client.email
                  )}
                </td>

                {/* Phone */}
                <td className="px-6 py-4 text-sm text-gray-300">
                  {editingRow === client.id ? (
                    <input
                      type="text"
                      value={client.phoneNumber}
                      onChange={(e) =>
                        handleChange(client.id, "phoneNumber", e.target.value)
                      }
                      className="bg-gray-700 text-white rounded px-2 py-2"
                    />
                  ) : (
                    client.phoneNumber
                  )}
                </td>

                {/* Country */}
                <td className="px-6 py-4 text-sm text-gray-300">
                  {editingRow === client.id ? (
                    <input
                      type="text"
                      value={client.country}
                      onChange={(e) =>
                        handleChange(client.id, "country", e.target.value)
                      }
                      className="bg-gray-700 text-white rounded px-2 py-2"
                    />
                  ) : (
                    client.country
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex gap-3 relative bottom-1">
                  {editingRow === client.id ? (
                    <button
                      onClick={handleSave}
                      className="cursor-pointer flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm relative bottom-0.5"
                    >
                      <Check size={16} /> Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(client.id)}
                        className="cursor-pointer flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded text-sm"
                      >
                        <Edit size={16} /> Edit
                      </button>

                      <div className="relative">
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="cursor-pointer flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded text-sm"
                        >
                          <Trash2 size={16} /> Delete
                        </button>

                        {/* Delete Confirmation */}
                        <AnimatePresence>
                          {confirmDelete === client.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.95 }}
                              animate={{ opacity: 1, y: -12, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-3/2 bg-gray-800 border border-gray-700 p-3 rounded shadow-lg flex items-center gap-2 z-20"
                            >
                              <span className="text-gray-100 text-base">
                                Sure?
                              </span>
                              <button
                                onClick={() => confirmDeleteRow(client.id)}
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

export default UsersTable;
