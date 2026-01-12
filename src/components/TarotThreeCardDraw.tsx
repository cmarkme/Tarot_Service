"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Card = {
  id: string;
  name: string;
  src: string;
};

// Keep your big ALL_CARDS list exactly as you already have it.
// (I’m keeping just a few here as an example — paste your full list back in.)
const ALL_CARDS: Card[] = [
  // ───────────── Major Arcana ─────────────
  { id: "00", name: "The Fool", src: "/tarot/00-TheFool.png" },
  { id: "01", name: "The Magician", src: "/tarot/01-TheMagician.png" },
  { id: "02", name: "The High Priestess", src: "/tarot/02-TheHighPriestess.png" },
  { id: "03", name: "The Empress", src: "/tarot/03-TheEmpress.png" },
  { id: "04", name: "The Emperor", src: "/tarot/04-TheEmperor.png" },
  { id: "05", name: "The Hierophant", src: "/tarot/05-TheHierophant.png" },
  { id: "06", name: "The Lovers", src: "/tarot/06-TheLovers.png" },
  { id: "07", name: "The Chariot", src: "/tarot/07-TheChariot.png" },
  { id: "08", name: "Strength", src: "/tarot/08-Strength.png" },
  { id: "09", name: "The Hermit", src: "/tarot/09-TheHermit.png" },
  { id: "10", name: "Wheel of Fortune", src: "/tarot/10-WheelOfFortune.png" },
  { id: "11", name: "Justice", src: "/tarot/11-Justice.png" },
  { id: "12", name: "The Hanged Man", src: "/tarot/12-TheHangedMan.png" },
  { id: "13", name: "Death", src: "/tarot/13-Death.png" },
  { id: "14", name: "Temperance", src: "/tarot/14-Temperance.png" },
  { id: "15", name: "The Devil", src: "/tarot/15-TheDevil.png" },
  { id: "16", name: "The Tower", src: "/tarot/16-TheTower.png" },
  { id: "17", name: "The Star", src: "/tarot/17-TheStar.png" },
  { id: "18", name: "The Moon", src: "/tarot/18-TheMoon.png" },
  { id: "19", name: "The Sun", src: "/tarot/19-TheSun.png" },
  { id: "20", name: "Judgement", src: "/tarot/20-Judgement.png" },
  { id: "21", name: "The World", src: "/tarot/21-TheWorld.png" },

  // ───────────── Cups ─────────────
  { id: "Cups01", name: "Ace of Cups", src: "/tarot/Cups01.png" },
  { id: "Cups02", name: "Two of Cups", src: "/tarot/Cups02.png" },
  { id: "Cups03", name: "Three of Cups", src: "/tarot/Cups03.png" },
  { id: "Cups04", name: "Four of Cups", src: "/tarot/Cups04.png" },
  { id: "Cups05", name: "Five of Cups", src: "/tarot/Cups05.png" },
  { id: "Cups06", name: "Six of Cups", src: "/tarot/Cups06.png" },
  { id: "Cups07", name: "Seven of Cups", src: "/tarot/Cups07.png" },
  { id: "Cups08", name: "Eight of Cups", src: "/tarot/Cups08.png" },
  { id: "Cups09", name: "Nine of Cups", src: "/tarot/Cups09.png" },
  { id: "Cups10", name: "Ten of Cups", src: "/tarot/Cups10.png" },
  { id: "Cups11", name: "Page of Cups", src: "/tarot/Cups11.png" },
  { id: "Cups12", name: "Knight of Cups", src: "/tarot/Cups12.png" },
  { id: "Cups13", name: "Queen of Cups", src: "/tarot/Cups13.png" },
  { id: "Cups14", name: "King of Cups", src: "/tarot/Cups14.png" },

  // ───────────── Pentacles ─────────────
  { id: "Pentacles01", name: "Ace of Pentacles", src: "/tarot/Pentacles01.png" },
  { id: "Pentacles02", name: "Two of Pentacles", src: "/tarot/Pentacles02.png" },
  { id: "Pentacles03", name: "Three of Pentacles", src: "/tarot/Pentacles03.png" },
  { id: "Pentacles04", name: "Four of Pentacles", src: "/tarot/Pentacles04.png" },
  { id: "Pentacles05", name: "Five of Pentacles", src: "/tarot/Pentacles05.png" },
  { id: "Pentacles06", name: "Six of Pentacles", src: "/tarot/Pentacles06.png" },
  { id: "Pentacles07", name: "Seven of Pentacles", src: "/tarot/Pentacles07.png" },
  { id: "Pentacles08", name: "Eight of Pentacles", src: "/tarot/Pentacles08.png" },
  { id: "Pentacles09", name: "Nine of Pentacles", src: "/tarot/Pentacles09.png" },
  { id: "Pentacles10", name: "Ten of Pentacles", src: "/tarot/Pentacles10.png" },
  { id: "Pentacles11", name: "Page of Pentacles", src: "/tarot/Pentacles11.png" },
  { id: "Pentacles12", name: "Knight of Pentacles", src: "/tarot/Pentacles12.png" },
  { id: "Pentacles13", name: "Queen of Pentacles", src: "/tarot/Pentacles13.png" },
  { id: "Pentacles14", name: "King of Pentacles", src: "/tarot/Pentacles14.png" },

  // ───────────── Swords ─────────────
  { id: "Swords01", name: "Ace of Swords", src: "/tarot/Swords01.png" },
  { id: "Swords02", name: "Two of Swords", src: "/tarot/Swords02.png" },
  { id: "Swords03", name: "Three of Swords", src: "/tarot/Swords03.png" },
  { id: "Swords04", name: "Four of Swords", src: "/tarot/Swords04.png" },
  { id: "Swords05", name: "Five of Swords", src: "/tarot/Swords05.png" },
  { id: "Swords06", name: "Six of Swords", src: "/tarot/Swords06.png" },
  { id: "Swords07", name: "Seven of Swords", src: "/tarot/Swords07.png" },
  { id: "Swords08", name: "Eight of Swords", src: "/tarot/Swords08.png" },
  { id: "Swords09", name: "Nine of Swords", src: "/tarot/Swords09.png" },
  { id: "Swords10", name: "Ten of Swords", src: "/tarot/Swords10.png" },
  { id: "Swords11", name: "Page of Swords", src: "/tarot/Swords11.png" },
  { id: "Swords12", name: "Knight of Swords", src: "/tarot/Swords12.png" },
  { id: "Swords13", name: "Queen of Swords", src: "/tarot/Swords13.png" },
  { id: "Swords14", name: "King of Swords", src: "/tarot/Swords14.png" },

  // ───────────── Wands ─────────────
  { id: "Wands01", name: "Ace of Wands", src: "/tarot/Wands01.png" },
  { id: "Wands02", name: "Two of Wands", src: "/tarot/Wands02.png" },
  { id: "Wands03", name: "Three of Wands", src: "/tarot/Wands03.png" },
  { id: "Wands04", name: "Four of Wands", src: "/tarot/Wands04.png" },
  { id: "Wands05", name: "Five of Wands", src: "/tarot/Wands05.png" },
  { id: "Wands06", name: "Six of Wands", src: "/tarot/Wands06.png" },
  { id: "Wands07", name: "Seven of Wands", src: "/tarot/Wands07.png" },
  { id: "Wands08", name: "Eight of Wands", src: "/tarot/Wands08.png" },
  { id: "Wands09", name: "Nine of Wands", src: "/tarot/Wands09.png" },
  { id: "Wands10", name: "Ten of Wands", src: "/tarot/Wands10.png" },
  { id: "Wands11", name: "Page of Wands", src: "/tarot/Wands11.png" },
  { id: "Wands12", name: "Knight of Wands", src: "/tarot/Wands12.png" },
  { id: "Wands13", name: "Queen of Wands", src: "/tarot/Wands13.png" },
  { id: "Wands14", name: "King of Wands", src: "/tarot/Wands14.png" },
];


function pick3Unique(cards: Card[]) {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
}

export default function TarotThreeCardDraw() {
  const [drawn, setDrawn] = useState<Card[]>(() => pick3Unique(ALL_CARDS));
  const [revealed, setRevealed] = useState<[boolean, boolean, boolean]>([false, false, false]);

  const backSrc = "/tarot/back.png"; // change to "/tarot/back.png" if that’s where you stored it

  const onShuffle = () => {
    setDrawn(pick3Unique(ALL_CARDS));
    setRevealed([false, false, false]);
  };

  const revealIndex = (idx: 0 | 1 | 2) => {
    setRevealed((prev) => {
      const next: [boolean, boolean, boolean] = [...prev] as any;
      next[idx] = true;
      return next;
    });
  };

  const cards = useMemo(() => drawn.slice(0, 3), [drawn]);

  return (
    <section className="panel">
      <div className="inner">
        <h1 className="title">Get Your Personal Free Love Tarot Reading</h1>

        <p className="desc">
          Click the cards below to reveal a tarot card from the deck. Repeat until you draw all cards visible.
          The meaning of the cards for your Free Love Tarot Reading will appear below each card. These cards in
          your Free Love Tarot Reading will give you lessons and wisdom that can guide you into making the most
          of your present circumstances.
        </p>

        <div className="actions">
          <button className="btn" onClick={onShuffle}>Shuffle</button>
        </div>

        <div className="grid">
          {cards.map((card, i) => {
            const idx = i as 0 | 1 | 2;
            const isRevealed = revealed[idx];

            return (
              <div key={card.id} className="col">
                <div className="copyright">All Images ©Labyrinthos LLC</div>

                <button
                  type="button"
                  className="cardBtn"
                  onClick={() => revealIndex(idx)}
                  aria-label={isRevealed ? card.name : "Reveal card"}
                >
                  <div className="cardFrame">
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

                <div className="meaning">
                  {isRevealed ? card.name : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
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
        }

        .cardImg {
          width: 240px;
          height: 410px;
          object-fit: cover;
          display: block;
        }

        .meaning {
          min-height: 32px;
          margin-top: 14px;
          font-size: 16px;
          opacity: 0.95;
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
