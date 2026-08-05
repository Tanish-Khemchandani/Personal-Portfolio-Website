import { useState } from "react";
import emailjs from "@emailjs/browser";
import Section from "./Section";
import { contact } from "../data";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Builds a subject line that's unique per submission, so replies never
// collide in the inbox: e.g. "Portfolio inquiry — Jane Doe — #A1B2C3"
function buildUniqueSubject(name) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:T]/g, "")
    .slice(0, 12); // YYYYMMDDHHmm
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  const who = name?.trim() ? name.trim() : "Website visitor";
  return `Portfolio inquiry — ${who} — #${stamp}-${rand}`;
}

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const isConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const subject = buildUniqueSubject(form.name);

    if (!isConfigured) {
      // Fallback: open the visitor's email client with everything pre-filled.
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          title: subject,
          message: form.message,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <Section
      id="contact"
      num="07"
      title="Contact"
      subtitle="Send a message and it'll land directly in my inbox, each one with its own unique subject line."
    >
      <form onSubmit={handleSubmit} className="glass-panel rounded-[14px] p-6 sm:p-8 max-w-140 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-mono text-sm text-ink-dim">
            NAME
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="bg-bg-raised/60 border border-line rounded-md px-4 py-3 text-ink-dim text-base focus:outline-none focus:border-accent-dim transition-colors"
            placeholder="Your name"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-mono text-sm text-ink-dim">
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="bg-bg-raised/60 border border-line rounded-md px-4 py-3 text-ink-dim text-base focus:outline-none focus:border-accent-dim transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="font-mono text-sm text-ink-dim">
            MESSAGE
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="bg-bg-raised/60 border border-line rounded-md px-4 py-3 text-ink-dim text-base focus:outline-none focus:border-accent-dim transition-colors resize-none"
            placeholder="What's on your mind?"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="font-mono text-base px-6 py-3.5 rounded-md bg-accent text-white font-semibold hover:bg-accent-dim transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 self-start"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        {status === "sent" && (
          <p className="text-base text-accent font-mono">Sent — thanks, I'll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-base text-accent font-mono">
            Something went wrong. Please try again, or email directly at{" "}
            <a href={`mailto:${contact.email}`} className="underline">
              {contact.email}
            </a>
            .
          </p>
        )}
        {!isConfigured && (
          <p className="text-sm text-ink-dim font-mono max-w-120">
            Direct sending isn't configured yet — submitting will open your email client instead. See README for
            EmailJS setup to enable in-page sending.
          </p>
        )}
      </form>
    </Section>
  );
}
