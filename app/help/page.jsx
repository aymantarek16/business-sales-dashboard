"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Headset,
  Search,
  HelpCircle,
  MessageCircle,
  Copy,
  Check,
  X,
} from "lucide-react";

/* ==========================
   Help Page — Single file
   Features:
   - 3D interactive "Crystal" hero card (tilt on mouse)
   - Floating gradient orbs background
   - Searchable knowledge base (real-time highlight)
   - Animated FAQ accordion
   - Ticket form -> generates ticket ID, persists to localStorage
   - Small simulated Live Chat panel
   - All comments in English
   ========================== */

const FAQS = [
  {
    id: 1,
    q: "How do I reset my password?",
    a: "Go to Settings → Security → Update Password. Choose a strong password and save. If you lost access, request a password reset email.",
  },
  {
    id: 2,
    q: "How to contact support by phone?",
    a: "Open Help → Contact Support. We offer phone support 9:00–18:00 (UTC+2). Use the ticket form for faster tracking.",
  },
  {
    id: 3,
    q: "Where can I find invoices and billing history?",
    a: "Go to Billing page in the sidebar. There you can download invoices and view payment history.",
  },
  {
    id: 4,
    q: "Can I change my account email?",
    a: "Yes — in Profile Settings update your email and verify the new address. Some changes require re-login.",
  },
  {
    id: 5,
    q: "How do I export my data?",
    a: "Visit Settings → Data Export. Submit an export request and you'll receive a downloadable file by email.",
  },
];

const initialTickets = () => {
  try {
    const raw = localStorage.getItem("help-tickets");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export default function HelpPage() {
  // UI & theme states
  const [search, setSearch] = useState("");
  const [faqs, setFaqs] = useState(FAQS);
  const [openFaq, setOpenFaq] = useState(null);
  const [tickets, setTickets] = useState(initialTickets);
  const [showTicketBox, setShowTicketBox] = useState(false);

  // Ticket form
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [lastTicketId, setLastTicketId] = useState(null);

  // Live chat (simulated)
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, who: "bot", text: "Hi! I can help with common tasks — try asking about password reset." },
  ]);
  const [chatInput, setChatInput] = useState("");

  // 3D hero card ref
  const heroRef = useRef(null);

  // Persist tickets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("help-tickets", JSON.stringify(tickets));
    } catch {}
  }, [tickets]);

  // Clear small inputs when ticket box toggled open
  useEffect(() => {
    if (!showTicketBox) {
      setSubject("");
      setDescription("");
      setContactEmail("");
      setPriority("Normal");
    }
  }, [showTicketBox]);

  /* ---------------------
     3D tilt handler for hero card
     --------------------- */
  const handleHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const rx = (-y / (rect.height / 2)) * 8; // tilt x
    const ry = (x / (rect.width / 2)) * 12; // tilt y
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    el.style.boxShadow = `${-ry}px ${rx}px 48px rgba(124,58,237,0.12), ${ry}px ${-rx}px 18px rgba(15,23,42,0.6)`;
  };
  const resetHero = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0)`;
    el.style.boxShadow = `0 8px 30px rgba(10,10,12,0.6)`;
  };

  /* ---------------------
     Knowledge base search + highlight
     --------------------- */
  const highlightMatch = (text, term) => {
    if (!term) return text;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(${escaped})`, "gi");
    const parts = text.split(re);
    return parts.map((part, i) =>
      re.test(part) ? (
        <mark key={i} className="bg-violet-600/40 text-white rounded px-0.5">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------------
     Ticket creation logic
     --------------------- */
  const makeTicketId = () => {
    const now = Date.now().toString(36).toUpperCase();
    const rnd = Math.floor(Math.random() * 900 + 100).toString();
    return `T-${now.slice(-6)}-${rnd}`;
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim() || !contactEmail.trim()) {
      alert("Please fill subject, description and contact email.");
      return;
    }
    const id = makeTicketId();
    const ticket = {
      id,
      subject,
      description,
      email: contactEmail,
      priority,
      createdAt: new Date().toISOString(),
      status: "Open",
    };
    setTickets((t) => [ticket, ...t]);
    setLastTicketId(id);
    setShowTicketBox(false);
    // small success highlight
    setTimeout(() => {
      try {
        navigator.clipboard.writeText(id);
        // briefly notify user that ID is copied
        setLastTicketId((prev) => prev);
      } catch {}
    }, 300);
  };

  const copyLastTicket = async () => {
    if (!lastTicketId) return;
    try {
      await navigator.clipboard.writeText(lastTicketId);
      alert("Ticket ID copied to clipboard");
    } catch {
      alert("Could not copy — try manually");
    }
  };

  /* ---------------------
     Small simulated chat assistant
     --------------------- */
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const msg = { id: Date.now(), who: "me", text: chatInput.trim() };
    setChatMessages((m) => [...m, msg]);
    setChatInput("");
    // simulate bot reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        who: "bot",
        text:
          "Quick tip: Check Settings → Security for password actions. If you want I can open a ticket for you.",
      };
      setChatMessages((m) => [...m, reply]);
    }, 900);
  };

  /* ---------------------
     Small helpers
     --------------------- */
  const markAllTicketsResolved = () => {
    setTickets((prev) => prev.map((t) => ({ ...t, status: "Resolved" })));
  };

  return (
    <div className="min-h-screen p-6 bg-[#0f0f17] text-gray-100">
      {/* background orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -left-20 -top-20 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(124,58,237,0.32), transparent 25%), radial-gradient(circle at 70% 70%, rgba(99,102,241,0.18), transparent 25%)",
          }}
        />
        <div
          className="absolute -right-12 bottom-10 w-72 h-72 rounded-full opacity-20 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(236,72,153,0.2), transparent 25%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Top area — hero + quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 items-stretch">
          {/* Left: big search + KB */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#17121f] to-[#0f0d16] rounded-2xl p-6 border border-[#2a2340] shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <HelpCircle className="w-8 h-8 text-violet-400" />
              <div>
                <h1 className="text-2xl font-semibold">Help Center</h1>
                <p className="text-sm text-gray-400">Search articles, FAQs or create a ticket — we’re here for you.</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex gap-3 items-center mb-6">
              <div className="relative flex-1">
                <input
                  aria-label="Search knowledge base"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#15121a] border border-[#2a2340] rounded-xl placeholder:text-gray-500 px-12 py-3  focus:outline-none focus:ring-2 focus:ring-violet-600 transition"
                  placeholder="Search articles, e.g. 'password', 'invoices'..."
                />
                <Search className="absolute left-4 top-3.5 text-gray-400" />
              </div>
              <button
                onClick={() => {
                  setSearch("");
                }}
                className="cursor-pointer px-4 py-3 rounded-xl bg-[#2a2540] hover:bg-[#3a2a56] transition"
              >
                Clear
              </button>
            </div>

            {/* Knowledge results */}
            <div className="space-y-4">
              <h3 className="text-sm text-gray-400 uppercase tracking-wide">Top articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredFaqs.slice(0, 4).map((f) => (
                  <motion.div
                    key={f.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 bg-[#121018] border border-[#26202c] rounded-xl"
                  >
                    <div className="font-medium mb-1">{highlightMatch(f.q, search)}</div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {highlightMatch(f.a, search)}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => setOpenFaq(f.id === openFaq ? null : f.id)}
                        className="cursor-pointer text-xs px-3 py-1 rounded-md bg-[#2a2540] hover:bg-[#3a2a50] transition"
                      >
                        Read more
                      </button>
                      <button
                        onClick={() => {
                          setShowTicketBox(true);
                          setSubject(`Support: ${f.q}`);
                        }}
                        className="cursor-pointer text-xs px-3 py-1 rounded-md bg-violet-600 hover:bg-violet-500 transition text-white"
                      >
                        Create ticket
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* FAQ Accordion */}
              <div className="mt-6">
                <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-3">Frequently asked</h3>
                <div className="space-y-2">
                  {faqs.map((f) => (
                    <motion.div key={f.id} layout initial={{ borderRadius: 8 }} className="bg-[#0f0d12] border border-[#26202c] rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)}
                        className="cursor-pointer w-full text-left px-4 py-3 flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="font-medium">{highlightMatch(f.q, search)}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{f.a.slice(0, 80)}...</div>
                        </div>
                        <div className="text-gray-400">{openFaq === f.id ? <X /> : <MessageCircle />}</div>
                      </button>

                      <AnimatePresence initial={false}>
                        {openFaq === f.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="px-4 py-3 border-t border-[#26202c] text-gray-300"
                          >
                            <p className="leading-relaxed">{highlightMatch(f.a, search)}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: 3D crystal card + ticket summary + chat toggle */}
          <div className="space-y-6">
            {/* 3D hero card */}
            <div
              ref={heroRef}
              onMouseMove={handleHeroMove}
              onMouseLeave={resetHero}
              className="relative cursor-grab"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-gradient-to-br from-[#1b152a] to-[#0f0d16] p-1"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  ref={heroRef}
                  className="rounded-2xl p-6 shadow-lg"
                  style={{
                    transform: "rotateX(0deg) rotateY(0deg)",
                    transition: "transform 0.12s ease-out, box-shadow 0.12s ease-out",
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(15,23,42,0.6))",
                    border: "1px solid rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#2a2540] to-[#241a36] shadow-inner">
                      <Headset className="w-6 h-6 text-violet-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-lg font-semibold">Support Assistant</div>
                          <div className="text-xs text-gray-400">Fast help, human + AI hybrid</div>
                        </div>
                        <div className="text-xs text-gray-400">24/7</div>
                      </div>

                      <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                        Need help? Create a ticket or start a quick chat. We respond fast — typical SLAs under 1 hour for priority issues.
                      </p>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => {
                            setShowTicketBox(true);
                          }}
                          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02] transition text-white shadow-md"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-90"><path fill="white" d="M12 2L2 7l10 5 10-5-10-5zm0 7.4L5.2 7 12 4.6 18.8 7 12 9.4zM2.1 17.6l9.9 5.1 9.9-5.1V11l-9.9 5.1L2.1 11v6.6z"/></svg>
                          Create Ticket
                        </button>

                        <button
                          onClick={() => setChatOpen((s) => !s)}
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg bg-[#15121a] border border-[#2a2340] hover:scale-[1.02] transition"
                        >
                          <MessageCircle className="w-4 h-4 text-violet-400" />
                          Chat
                        </button>
                      </div>

                      {/* ticket success chip */}
                      {lastTicketId && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-[#0f172a] px-3 py-2 rounded-full border border-[#2a2340]">
                          <div className="text-xs text-gray-400">Last ticket</div>
                          <div className="font-mono text-sm text-white bg-[#141218] px-2 py-1 rounded">
                            {lastTicketId}
                          </div>
                          <button
                            onClick={copyLastTicket}
                            className="cursor-pointer text-gray-300 hover:text-white p-1 rounded"
                            title="Copy ticket ID"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tickets summary */}
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-[#0f0d12] border border-[#26202c]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-400">Your tickets</div>
                <button onClick={markAllTicketsResolved} className="cursor-pointer text-xs bg-[#2a2540] px-2 py-1 rounded">Resolve all</button>
              </div>
              <div className="space-y-2 max-h-40 overflow-auto">
                {tickets.length === 0 ? (
                  <div className="text-sm text-gray-500">No open tickets yet — create one and we'll take care of it.</div>
                ) : (
                  tickets.map((t) => (
                    <div key={t.id} className="flex items-start justify-between bg-[#0b0b0f] p-3 rounded-md border border-[#1f1b22]">
                      <div>
                        <div className="text-sm font-medium">{t.subject}</div>
                        <div className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-semibold ${t.priority === "High" ? "text-red-400" : "text-gray-300"}`}>{t.priority}</div>
                        <div className="text-xs text-gray-400 mt-1">{t.status}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Chat panel small */}
            <AnimatePresence>
              {chatOpen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="p-4 rounded-xl bg-[#0f0d12] border border-[#26202c]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded bg-[#141218]"><MessageCircle className="w-4 h-4 text-violet-400" /></div>
                      <div>
                        <div className="text-sm font-medium">Assistant</div>
                        <div className="text-xs text-gray-500">Simulated replies</div>
                      </div>
                    </div>
                    <button onClick={() => setChatOpen(false)} className="cursor-pointer text-gray-400 px-2 py-1 rounded hover:bg-[#141218]">Close</button>
                  </div>

                  <div className="max-h-40 overflow-auto space-y-2 mb-3">
                    {chatMessages.map((m) => (
                      <div key={m.id} className={`p-2 rounded ${m.who === "bot" ? "bg-[#15121a] text-gray-200" : "bg-violet-600 text-white ml-auto"} max-w-[85%]`}>
                        {m.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendChat()} placeholder="Ask something..." className="flex-1 px-3 py-2 rounded-lg bg-[#121018]" />
                    <button onClick={handleSendChat} className="cursor-pointer px-3 py-2 rounded-lg bg-violet-600">Send</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Ticket creation box (modal-like panel) */}
        <AnimatePresence>
          {showTicketBox && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTicketBox(false)} />
              <motion.form onSubmit={handleCreateTicket} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative z-50 w-full max-w-2xl bg-gradient-to-br from-[#141018] to-[#0b0b10] p-6 rounded-2xl border border-[#2a2340] shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Create Support Ticket</h3>
                  <button type="button" onClick={() => setShowTicketBox(false)} className="text-gray-400 hover:text-white cursor-pointer">Close</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full px-3 py-2 rounded bg-[#0f0d12] border border-[#26202c]" />
                  <input required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Contact email" className="w-full px-3 py-2 rounded bg-[#0f0d12] border border-[#26202c]" />
                </div>

                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your issue..." className="w-full px-3 py-3 rounded bg-[#0f0d12] border border-[#26202c] mb-3" rows={5} />

                <div className="flex items-center justify-between gap-3">
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} className="px-3 py-2 rounded bg-[#0f0d12] border border-[#26202c]">
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>

                  <div className="flex items-center gap-3">
                    <button type="submit" className="cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">Create Ticket</button>
                    <button type="button" onClick={() => setShowTicketBox(false)} className="cursor-pointer px-4 py-2 rounded-lg bg-[#15121a] border border-[#26202c]">Cancel</button>
                  </div>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
