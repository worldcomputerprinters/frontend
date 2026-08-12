import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import api from "../../lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", contact: "", message: "", company: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.message) return;
    setSubmitting(true);
    setError("");
    try {
      await api.post("/messages", form);
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your message — please try calling or WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass flex flex-col items-center gap-3 rounded-2xl px-6 py-16 text-center"
      >
        <CheckCircle2 className="text-accent" size={32} />
        <p className="font-display text-lg font-semibold">Thanks, {form.name}!</p>
        <p className="text-muted">We&rsquo;ll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass flex flex-col gap-5 rounded-2xl p-8">
      {/* Honeypot — invisible to real visitors, most simple spam bots fill
          in every field they find. Never shown, never focusable. */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange("company")}
        autoComplete="off"
        tabIndex="-1"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
          Name
        </label>
        <input
          id="name"
          value={form.name}
          onChange={handleChange("name")}
          required
          className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white placeholder:text-subtle focus:border-accent focus:outline-none"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="contact" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
          Phone or Email
        </label>
        <input
          id="contact"
          value={form.contact}
          onChange={handleChange("contact")}
          required
          className="w-full rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white placeholder:text-subtle focus:border-accent focus:outline-none"
          placeholder="How should we reach you?"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wide text-subtle">
          Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={handleChange("message")}
          required
          rows={5}
          className="w-full resize-none rounded-xl border border-white/10 bg-panel/60 px-4 py-3 text-sm text-white placeholder:text-subtle focus:border-accent focus:outline-none"
          placeholder="What do you need help with?"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-all hover:bg-accent-hover hover:scale-[1.02] disabled:opacity-60"
      >
        <Send size={16} /> {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}