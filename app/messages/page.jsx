"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MoreVertical, Trash2 } from "lucide-react";

const themes = {
  dark: {
    bg: "#1e1e1e",
    bubbleMe: "bg-violet-600 text-white",
    bubbleOther: "bg-[#2a2540] text-gray-200",
  },
  blue: {
    bg: "#0f172a",
    bubbleMe: "bg-blue-600 text-white",
    bubbleOther: "bg-blue-900 text-blue-100",
  },
  green: {
    bg: "#064e3b",
    bubbleMe: "bg-green-600 text-white",
    bubbleOther: "bg-green-900 text-green-100",
  },
  pink: {
    bg: "#4c0519",
    bubbleMe: "bg-pink-600 text-white",
    bubbleOther: "bg-pink-900 text-pink-100",
  },
  orange: {
    bg: "#431407",
    bubbleMe: "bg-orange-600 text-white",
    bubbleOther: "bg-orange-900 text-orange-100",
  },
};

const MessagesPage = () => {
  const [contacts] = useState([
    { id: 1, name: "John Doe", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Sarah Smith", lastMessage: "Can we reschedule?" },
    { id: 3, name: "Mike Johnson", lastMessage: "Thanks for your help!" },
  ]);

  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", text: "Hey, how are you?" },
    { id: 2, sender: "Me", text: "I'm good, thanks! How about you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [theme, setTheme] = useState("dark");

  const menuRef = useRef(null);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("chat-theme");
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("chat-theme", theme);
  }, [theme]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = { id: Date.now(), sender: "Me", text: newMessage };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSelectMessage = (id) => {
    if (selectedMessages.includes(id)) {
      setSelectedMessages(selectedMessages.filter((msgId) => msgId !== id));
    } else {
      setSelectedMessages([...selectedMessages, id]);
    }
  };

  const deleteSelected = () => {
    setMessages(messages.filter((msg) => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
    setSelectMode(false);
  };

  const deleteAll = () => {
    setMessages([]);
    setSelectedMessages([]);
    setSelectMode(false);
  };

  return (
    <div className="flex mt-6 h-[80vh] bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#2a2540]">
      {/* Contacts Sidebar */}
      <div className="w-64 bg-[#2a2540] p-4 flex flex-col">
        <h2 className="text-lg font-bold text-gray-100 mb-4">Contacts</h2>
        <div className="space-y-2 overflow-y-auto">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                activeContact.id === contact.id
                  ? "bg-violet-600 text-white"
                  : "bg-[#1e1e1e] text-gray-300 hover:bg-[#3a3350]"
              }`}
            >
              <p className="font-medium">{contact.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {contact.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className="flex-1 flex flex-col"
        style={{ backgroundColor: themes[theme].bg }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#2a2540] flex items-center justify-between">
          <h2 className="text-gray-100 font-bold">{activeContact.name}</h2>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white cursor-pointer"
            >
              <MoreVertical />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#2a2540] border border-[#3a3350] rounded-lg shadow-lg z-20 p-3">
                <button
                  onClick={() => {
                    setSelectMode(true);
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-[#3a3350] cursor-pointer"
                >
                  Select messages
                </button>
                <button
                  onClick={() => {
                    deleteAll();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#3a3350] cursor-pointer"
                >
                  Delete all
                </button>
                <div className="border-t border-[#3a3350] my-2" />
                <div className="px-2 py-1 text-xs text-gray-400">Themes</div>
                <div className="flex gap-2 px-2 py-2">
                  {Object.keys(themes).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t);
                        setMenuOpen(false);
                      }}
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                        theme === t ? "border-white" : "border-transparent"
                      }`}
                      style={{ backgroundColor: themes[t].bg }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No messages yet...</p>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => selectMode && toggleSelectMessage(msg.id)}
                className={`max-w-xs px-4 py-2 rounded-lg cursor-pointer ${
                  msg.sender === "Me"
                    ? `${themes[theme].bubbleMe} ml-auto`
                    : themes[theme].bubbleOther
                } ${
                  selectMode && selectedMessages.includes(msg.id)
                    ? "ring-2 ring-yellow-400"
                    : ""
                }`}
              >
                {msg.text}
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2a2540] flex items-center gap-2">
          {selectMode ? (
            <>
              <button
                onClick={deleteSelected}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
              >
                <Trash2 size={18} /> Delete Selected
              </button>
              <button
                onClick={() => {
                  setSelectMode(false);
                  setSelectedMessages([]);
                }}
                className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg bg-[#2a2540] text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-violet-600 hover:bg-violet-500 text-white p-2 rounded-lg transition cursor-pointer"
              >
                <Send className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
