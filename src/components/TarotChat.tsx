"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function TarotChat() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "Ask about a tarot card meaning (example: “The Fool upright”)." },
  ]);
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await r.json();
      setMsgs((m) => [...m, { role: "assistant", text: data.reply ?? "No reply." }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "Network error. Try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <div style={{ border: "1px solid #222", borderRadius: 12, padding: 12, minHeight: 260 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ margin: "10px 0" }}>
            <div style={{ fontWeight: 700, opacity: 0.85 }}>{m.role === "user" ? "You" : "Tarot Bot"}</div>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.35 }}>{m.text}</div>
          </div>
        ))}
        {loading && <div style={{ opacity: 0.7 }}>Thinking…</div>}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about a card (e.g., The Magician reversed)…"
          style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #222" }}
        />
        <button
          onClick={send}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #222" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
