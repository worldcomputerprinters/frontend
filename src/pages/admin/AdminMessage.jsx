import { useEffect, useState } from "react";
import { Mail, MailOpen } from "lucide-react";
import api from "../../lib/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/messages")
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const markRead = async (id) => {
    await api.put(`/messages/${id}/read`);
    setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white">Messages</h1>
      <p className="mt-1 text-muted">
        {messages.length} message{messages.length === 1 ? "" : "s"}
        {unreadCount > 0 && ` — ${unreadCount} unread`}
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="text-muted">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div
              key={m._id}
              className={`glass rounded-2xl p-5 ${!m.read ? "border-accent/40" : ""}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display font-semibold text-white">{m.name}</p>
                  <p className="text-sm text-accent-2">{m.contact}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-subtle">{new Date(m.createdAt).toLocaleString()}</span>
                  {m.read ? (
                    <span className="flex items-center gap-1.5 text-xs text-subtle">
                      <MailOpen size={12} /> Read
                    </span>
                  ) : (
                    <button
                      onClick={() => markRead(m._id)}
                      className="flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-xs text-accent hover:bg-accent hover:text-white"
                    >
                      <Mail size={12} /> Mark Read
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/90">{m.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}