"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ALL_CARDS, type TarotCard } from "@/data/tarotCards";
import { TAROT_MEANINGS } from "@/data/tarotMeanings";
import { animated, to as springTo, useSpring, useSprings } from "@react-spring/web";

const deckX = 50; // origin at center
const deckY = -100; // slightly up looks nicer
const dealY = 0; // final Y (relative to deck origin)
const dealX = [-30, 5, 50]; // past, present, future
const dealRot = [-8, -2, 5];

type Phase = "idle" | "revealing";

type SlotKey = "past" | "present" | "future";
const SLOT_LABELS: { label: string; key: SlotKey }[] = [
  { label: "Past", key: "past" },
  { label: "Present", key: "present" },
  { label: "Future", key: "future" },
];

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  status?: "pending" | "done" | "error";
};

function pick3Unique(cards: TarotCard[]) {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
}

function randomOrientation3(): [boolean, boolean, boolean] {
  // true = reversed, false = upright
  return [Math.random() < 0.5, Math.random() < 0.5, Math.random() < 0.5];
}

function buildPrompt(params: {
  cards: TarotCard[];
  orientations: [boolean, boolean, boolean];
  userQuestion: string;
  history: ChatMsg[];
}) {
  const { cards, orientations, userQuestion, history } = params;

  const lines: string[] = [];
  lines.push("You are a tarot interpreter. This is a 3-card love reading (Past/Present/Future).");
  lines.push("");

  lines.push("Spread:");
  cards.slice(0, 3).forEach((c, idx) => {
    const slot = SLOT_LABELS[idx];
    const reversed = orientations[idx];
    const m = TAROT_MEANINGS[c.id];

    const slotMeaning = m?.[slot.key] ?? "";
    const upright = m?.upright ?? "";
    const rev = m?.reversed ?? "";

    lines.push(
      `${slot.label}: ${c.id}-${c.name} (${reversed ? "reversed" : "upright"})`
    );
    if (slotMeaning) lines.push(`- Position meaning: ${slotMeaning}`);
    if (!reversed && upright) lines.push(`- Card meaning (upright): ${upright}`);
    if (reversed && rev) lines.push(`- Card meaning (reversed): ${rev}`);
    lines.push("");
  });

  if (history.length) {
    lines.push("Conversation so far:");
    history.slice(-6).forEach((msg) => {
      lines.push(`${msg.role.toUpperCase()}: ${msg.content}`);
    });
    lines.push("");
  }

  lines.push(`User question: ${userQuestion}`);
  lines.push(
    "Respond with a helpful, practical interpretation that references all three positions and gives clear advice."
  );

  return lines.join("\n").trim();
}

export default function TarotThreeCardDraw() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [drawn, setDrawn] = useState<TarotCard[]>(() => pick3Unique(ALL_CARDS));
  const [revealed, setRevealed] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [orientations, setOrientations] = useState<[boolean, boolean, boolean]>(() => randomOrientation3());

  const [deckSpring, deckApi] = useSpring(() => ({
    from: { rot: 0, scale: 1 },
    config: { tension: 260, friction: 18 },
  }));

  const [cardSprings, cardApi] = useSprings(3, (i) => ({
    // rest state = in spread position (so clicking doesn't move them)
    x: dealX[i],
    y: dealY,
    rot: dealRot[i],
    scale: 1,
    opacity: 1,
    config: { tension: 5000, friction: 402 },
  }));

  // Monetisation placeholder for now (later: from auth/stripe)
  const isSubscribed = false;
  const [showDeep, setShowDeep] = useState(false);

  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");

  const backSrc = "/tarot/stack.png";

  const cards = useMemo(() => drawn.slice(0, 3), [drawn]);
  const allRevealed = revealed.every(Boolean);

  const onShuffle = async () => {
    setDrawn(pick3Unique(ALL_CARDS));
    setOrientations(randomOrientation3());
    setRevealed([false, false, false]);
    setShowDeep(false);
    setPhase("idle");

    // Reset chat
    setChatInput("");
    setChatMessages([]);
    setChatLoading(false);
    setChatError("");

    // Reset card positions to deck origin
    cardApi.start(() => ({
      x: deckX,
      y: 220,
      rot: 0,
      scale: 0.98,
      opacity: 0,
      immediate: false,
    }));

    // Deck shuffle wobble
    await deckApi.start({
      to: async (next) => {
        for (let k = 0; k < 10; k++) {
          await next({
            rot: (Math.random() - 0.5) * 10,
            scale: 1 + Math.random() * 0.02,
          });
        }
        await next({ rot: 0, scale: 1 });
      },
    });

    // Deal cards one-by-one from deck to slots
    await cardApi.start((i) => ({
      to: async (next) => {
        await next({
          opacity: 1,
          x: deckX,
          y: deckY,
          rot: (Math.random() - 0.5) * 8,
          scale: 1,
        });

        await next({
          x: dealX[i],
          y: dealY,
          rot: dealRot[i],
          scale: 1,
          delay: i * 120,
        });
      },
    }));
  };

  const revealIndex = (idx: 0 | 1 | 2) => {
    setRevealed((prev) => {
      const next = [...prev] as [boolean, boolean, boolean];
      next[idx] = true;
      return next;
    });
  };

  // Combined reading (optional): join combined blurbs if available
  const combinedReading = useMemo(() => {
    if (!allRevealed) return "";
    const parts = cards
      .map((c) => TAROT_MEANINGS[c.id]?.combined)
      .filter((x): x is string => Boolean(x));
    return parts.join(" ");
  }, [allRevealed, cards]);

  const sendChat = async () => {
  const question = chatInput.trim();
  if (!question || chatLoading) return;

  setChatError("");
  setChatLoading(true);

  const userMsg: ChatMsg = {
    id: crypto.randomUUID(),
    role: "user",
    content: question,
    status: "done",
  };

  const pendingId = crypto.randomUUID();
  const pendingBot: ChatMsg = {
    id: pendingId,
    role: "assistant",
    content: "",           // empty because we'll render dots
    status: "pending",
  };

  const nextHistory = [...chatMessages, userMsg];
  setChatMessages([...nextHistory, pendingBot]);
  setChatInput("");

  try {
    const prompt = buildPrompt({
      cards,
      orientations,
      userQuestion: question,
      history: nextHistory,
    });

    const res = await fetch("/api/tarot/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });

    const text = await res.text();
    let reply = text;

    try {
      const json = JSON.parse(text);
      reply = json.reply ?? json.message ?? json.output ?? text;
    } catch {}

    // Replace the pending bubble with the real reply
    setChatMessages((prev) =>
      prev.map((m) =>
        m.id === pendingId
          ? {
              ...m,
              content: res.ok ? reply : `Error from server (${res.status}): ${reply}`,
              status: res.ok ? "done" : "error",
            }
          : m
      )
    );
  } catch (e: any) {
    setChatMessages((prev) =>
      prev.map((m) =>
        m.status === "pending"
          ? { ...m, content: e?.message || "Failed to send chat message.", status: "error" }
          : m
      )
    );
  } finally {
    setChatLoading(false);
  }
};

  return (
    <section className="panel">
      <div className="inner">
        <h1 className="title">TAROT Card Counsel: Let the Tarot be your guide under the stars :</h1>

        <p className="desc">
          Click each card to reveal it. Meanings appear below each card. Shuffle to draw again.
        </p>

        <div className="actions">
          <button className="btn" onClick={onShuffle}>
            Shuffle
          </button>
        </div>

        <div className="deckRow">
          <animated.div
            className="deck"
            style={{
              transform: springTo([deckSpring.rot, deckSpring.scale], (r, s) => `rotate(${r}deg) scale(${s})`),
            }}
          >
            <div className="deckStack">
              <Image src={backSrc} alt="Deck" width={140} height={240} className="deckImg" />
              <div className="deckShadow deckShadow2" />
              <div className="deckShadow deckShadow3" />
            </div>
          </animated.div>
        </div>

        <div className="grid">
          {cards.map((card, i) => {
            const idx = i as 0 | 1 | 2;
            const isRevealed = revealed[idx];
            const slot = SLOT_LABELS[idx];

            const meaning = TAROT_MEANINGS[card.id];
            const slotText = meaning?.[slot.key];
            const reversed = orientations[idx];

            return (
              <div key={card.id} className="col">
                <div className="copyright">All Images ©Labyrinthos LLC</div>

                <animated.div
                  style={{
                    opacity: cardSprings[idx].opacity,
                    transform: springTo(
  [cardSprings[idx].x, cardSprings[idx].y, cardSprings[idx].rot, cardSprings[idx].scale],
  (x, y, r, s) => {
    const extra = isRevealed && reversed ? 180 : 0; // <- upside-down when reversed
    return `translate3d(${x}px, ${y}px, 0) rotate(${r + extra}deg) scale(${s})`;
  }
),
                  }}
                >
                  <button
                    type="button"
                    className="cardBtn"
                    onClick={() => revealIndex(idx)}
                    aria-label={isRevealed ? card.name : "Reveal card"}
                  >
                    <div className={`cardFrame ${isRevealed ? "revealed" : ""}`}>
                      <Image
                        src={isRevealed ? card.src : backSrc}
                        alt={isRevealed ? card.name : "Tarot card back"}
                        width={240}
                        height={410}
                        className="cardImg"
                        priority={i === 0}
                      />
                    </div>
                  </button>
                </animated.div>

                <div className="slotLabel">
                  {slot.label}
                  {isRevealed ? <span className="orient"> • {reversed ? "Reversed" : "Upright"}</span> : null}
                </div>

                <div className="meaningTitle">{isRevealed ? card.name : ""}</div>

                <div className="meaningText">
                  {isRevealed ? slotText ?? "Meaning not found yet for this card." : ""}
                </div>
              </div>
            );
          })}
        </div>

        {allRevealed && (
          <section className="combined">
            <h2 className="combinedTitle">Your Daily Reading</h2>

            <p className="combinedText">
              {combinedReading || "Combined reading not available yet for these cards."}
            </p>

            {!showDeep && (
              <div className="deepRow">
                <button className="btnSecondary" onClick={() => setShowDeep(true)}>
                  🔒 Reveal Deeper Meaning (Subscribers)
                </button>
                <div className="deepHint">
                  Deeper meaning includes a fuller interpretation + advice and patterns across all three cards.
                </div>
              </div>
            )}
          </section>
        )}

        {/* ✅ NEW: Chat box (works even if you keep the paywall UI) */}
        {allRevealed && (
          <section className="chat">
            <h2 className="chatTitle">Ask a question about your reading</h2>

            <div className="chatBox" role="log" aria-live="polite">
              {chatMessages.length === 0 ? (
                <div className="chatEmpty">
                  Try: “What does the Future card suggest I should do next?” or “What is the main theme across all three?”
                </div>
              ) : (
                chatMessages.map((m, idx) => (
                  <div key={idx} className={`chatMsg ${m.role}`}>
                    <div className="chatRole">{m.role === "user" ? "You" : "Tarot AI"}</div>
                    <div className="chatText">
  {m.status === "pending" ? (
    <span className="typing" aria-label="Tarot AI is typing">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      <span className="typingLabel">Tarot dealer is typing…</span>
    </span>
  ) : (
    m.content
  )}
</div>
                  </div>
                ))
              )}
            </div>

            {chatError ? <div className="chatError">{chatError}</div> : null}

            <div className="chatRow">
              <input
                className="chatInput"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendChat();
                }}
              />
              <button className="chatSend" onClick={sendChat} disabled={chatLoading}>
                {chatLoading ? <div className="thinkingBar">Shuffling the deck… interpreting symbols…</div> : "reading...."}
              </button>
            </div>

            <div className="chatNote">
              This sends your 3-card spread (Past/Present/Future + upright/reversed + meanings) to the AI so it can answer accurately.
            </div>
          </section>
        )}

        {allRevealed && showDeep && (
          <section className="deep">
            {isSubscribed ? (
              <>
                <h2 className="deepTitle">Deep Interpretation</h2>

                <div className="deepCards">
                  {cards.map((c, idx) => (
                    <div key={c.id} className="deepCard">
                      <div className="deepCardHead">
                        <span className="deepSlot">{SLOT_LABELS[idx].label}</span>
                        <span className="deepName">{c.name}</span>
                      </div>

                      <p className="deepText">{TAROT_MEANINGS[c.id]?.deep ?? "Deep meaning not added yet."}</p>
                    </div>
                  ))}
                </div>

                <button className="btnSecondary" onClick={() => setShowDeep(false)}>
                  Hide Deep Reading
                </button>
              </>
            ) : (
              <>
                <h2 className="deepTitle">Deeper Meaning is for Subscribers</h2>
                <p className="deepText">
                  You’ve unlocked the free reading. Subscribe to reveal deeper interpretation, patterns across the spread,
                  and guided advice for your next step.
                </p>

                <div className="paywallBox">
                  <div className="paywallBullets">
                    <div>✅ Full interpretation for each card</div>
                    <div>✅ Spread pattern analysis (themes + advice)</div>
                    <div>✅ Better “overall” daily reading</div>
                  </div>

                  <button
                    className="btnPay"
                    onClick={() => alert("Next step: wire this button to your /subscribe page (Stripe).")}
                  >
                    Subscribe to Unlock
                  </button>

                  <button className="btnSecondary" onClick={() => setShowDeep(false)}>
                    Not now
                  </button>
                </div>
              </>
            )}
          </section>
        )}
      </div>

      <style>{`
.typing {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: rgba(255,255,255,0.75);
  animation: bounce 1.1s infinite;
  display: inline-block;
}

.dot:nth-child(1) { animation-delay: 0ms; }
.dot:nth-child(2) { animation-delay: 150ms; }
.dot:nth-child(3) { animation-delay: 300ms; }

.typingLabel {
  font-size: 12px;
  opacity: 0.75;
  margin-left: 6px;
}

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.55; }
  40% { transform: translateY(-4px); opacity: 1; }
}

        .deckRow {
          display: grid;
          place-items: center;
          margin: 0 0 26px;
        }

        .deck {
          width: 160px;
          height: 260px;
          position: relative;
        }

        .deckStack {
          position: relative;
          width: 140px;
          height: 240px;
          margin: 0 auto;
        }

        .deckImg {
          width: 140px;
          height: 240px;
          object-fit: cover;
          border-radius: 14px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.35);
          display: block;
        }

        .deckShadow {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.12);
          transform: translate(6px, 6px);
          opacity: 0.25;
          pointer-events: none;
        }
        .deckShadow2 { transform: translate(6px, 6px); }
        .deckShadow3 { transform: translate(10px, 10px); opacity: 0.18; }

        .panel {
          background: linear-gradient(180deg, #2a0a3f 0%, #2a0a3f 55%, #1d0730 100%);
          padding: 48px 16px 64px;
          color: #fff;
        }

        .inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }

        .title {
          margin: 0 0 18px;
          font-size: 44px;
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .desc {
          max-width: 980px;
          margin: 0 auto 26px;
          font-size: 18px;
          line-height: 1.65;
          opacity: 0.95;
        }

        .actions {
          margin: 0 0 34px;
        }

        .btn {
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          padding: 10px 16px;
          border-radius: 10px;
          font-weight: 650;
          cursor: pointer;
        }

        .btn:hover {
          background: rgba(255,255,255,0.14);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 46px;
          align-items: start;
          justify-items: center;
        }

        .col {
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .copyright {
          font-size: 18px;
          opacity: 0.35;
          margin-bottom: 14px;
          white-space: nowrap;
        }

        .cardBtn {
          background: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
        }

        .cardFrame {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
          transform: translateZ(0);
          transition: transform 220ms ease;
        }

        .cardFrame:hover {
          transform: translateY(-2px);
        }

        .cardImg {
          width: 240px;
          height: 410px;
          object-fit: cover;
          display: block;
        }

        .slotLabel {
          margin-top: 14px;
          font-size: 14px;
          opacity: 0.75;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .orient {
          opacity: 0.95;
          font-weight: 700;
        }

        .meaningTitle {
          min-height: 24px;
          margin-top: 8px;
          font-size: 18px;
          font-weight: 700;
          opacity: 0.98;
        }

        .meaningText {
          margin-top: 10px;
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.92;
          max-width: 260px;
        }

        .combined {
          margin-top: 44px;
          padding: 22px 18px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.06);
          border-radius: 16px;
          text-align: center;
        }

        .combinedTitle {
          margin: 0 0 10px;
          font-size: 22px;
          font-weight: 800;
        }

        .combinedText {
          margin: 0;
          font-size: 15px;
          line-height: 1.7;
          opacity: 0.95;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .deepRow {
          margin-top: 16px;
          display: grid;
          place-items: center;
          gap: 10px;
        }

        .btnSecondary {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          padding: 10px 14px;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .btnSecondary:hover {
          background: rgba(255,255,255,0.12);
        }

        .deepHint {
          font-size: 13px;
          opacity: 0.75;
          max-width: 760px;
          line-height: 1.5;
        }

        .deep {
          margin-top: 22px;
          padding: 22px 18px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(0,0,0,0.12);
          border-radius: 16px;
          text-align: left;
        }

        .deepTitle {
          margin: 0 0 12px;
          font-size: 20px;
          font-weight: 800;
          text-align: center;
        }

        .deepCards {
          display: grid;
          gap: 14px;
          margin: 12px 0 18px;
        }

        .deepCard {
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 14px;
        }

        .deepCardHead {
          display: flex;
          gap: 10px;
          align-items: baseline;
          margin-bottom: 8px;
        }

        .deepSlot {
          font-size: 12px;
          opacity: 0.7;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .deepName {
          font-weight: 800;
          font-size: 15px;
        }

        .deepText {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.95;
        }

        .paywallBox {
          margin-top: 14px;
          display: grid;
          place-items: center;
          gap: 12px;
        }

        .paywallBullets {
          display: grid;
          gap: 6px;
          padding: 14px;
          border-radius: 14px;
          width: 100%;
          max-width: 520px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.06);
          text-align: left;
          font-size: 14px;
          opacity: 0.95;
        }

        .btnPay {
          background: rgba(255,255,255,0.92);
          border: 0;
          color: #1d0730;
          padding: 10px 16px;
          border-radius: 10px;
          font-weight: 900;
          cursor: pointer;
        }

        .btnPay:hover {
          background: rgba(255,255,255,1);
        }

        /* ✅ Chat styling */
        .chat {
          margin-top: 22px;
          padding: 22px 18px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          text-align: left;
        }

        .chatTitle {
          margin: 0 0 12px;
          font-size: 18px;
          font-weight: 900;
          text-align: center;
        }

        .chatBox {
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(0,0,0,0.18);
          border-radius: 14px;
          padding: 12px;
          min-height: 140px;
          max-height: 320px;
          overflow: auto;
        }

        .chatEmpty {
          opacity: 0.75;
          font-size: 14px;
          line-height: 1.6;
          text-align: center;
          padding: 10px;
        }

        .chatMsg {
          padding: 10px 10px;
          border-radius: 12px;
          margin-bottom: 10px;
          border: 1px solid rgba(255,255,255,0.10);
        }

        .chatMsg.user {
          background: rgba(255,255,255,0.06);
        }

        .chatMsg.assistant {
          background: rgba(0,0,0,0.22);
        }

        .chatRole {
          font-size: 12px;
          opacity: 0.75;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .chatText {
          font-size: 14px;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .chatRow {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          margin-top: 12px;
        }

        .chatInput {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.18);
          color: #fff;
          outline: none;
        }

        .chatSend {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.10);
          color: #fff;
          font-weight: 800;
          cursor: pointer;
        }

        .chatSend:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .chatError {
          margin-top: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(255, 80, 80, 0.15);
          border: 1px solid rgba(255, 80, 80, 0.25);
          font-size: 13px;
        }

        .chatNote {
          margin-top: 10px;
          font-size: 12px;
          opacity: 0.75;
          line-height: 1.5;
          text-align: center;
        }

        @media (max-width: 980px) {
          .title { font-size: 36px; }
          .desc { font-size: 16px; }
          .grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .copyright { font-size: 16px; }
        }
      `}</style>
    </section>
  );
}