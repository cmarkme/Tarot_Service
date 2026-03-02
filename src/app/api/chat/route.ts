import { NextResponse } from "next/server";
import { findMentionedCards, pickMeaningsSubset } from "@/lib/tarotSearch";
import { isFutureTelling, isOutOfScope, refusal} from "@/lib/guardrails";

export const runtime = "nodejs"; // keep simple (not edge) for fetch + timeouts

const MAX_CHARS = 1200;

// tiny in-memory rate limit (good enough for <5 visits/day)
// For serious use, swap to Upstash/Redis.
const hits = new Map<string, { count: number; reset: number }>();
function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 60_000;
  const limit = 20; // 20 req/min per IP
  const rec = hits.get(ip) ?? { count: 0, reset: now + windowMs };
  if (now > rec.reset) {
    rec.count = 0;
    rec.reset = now + windowMs;
  }
  rec.count += 1;
  hits.set(ip, rec);
  return rec.count <= limit;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ reply: "Rate limit hit. Please try again in a minute." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const message: string = (body?.message ?? "").toString().trim();

  if (!message || message.length > MAX_CHARS) {
    return NextResponse.json({ reply: "Please send a shorter message (max ~1200 characters)." }, { status: 400 });
  }

  if (isOutOfScope(message) || isFutureTelling(message)) {
    return NextResponse.json({ reply: refusal() }, { status: 200 });
  }

  const mentioned = findMentionedCards(message);
  if (mentioned.length === 0) {
    return NextResponse.json(
      { reply: "Which tarot card do you mean? Example: “What does The Fool mean upright?”" },
      { status: 200 }
    );
  }

  const cards = pickMeaningsSubset(mentioned);

  const AI_URL = process.env.AI_SERVICE_URL!;
  const AI_SECRET = process.env.AI_SHARED_SECRET!;
  if (!AI_URL || !AI_SECRET) {
    return NextResponse.json({ reply: "Server is missing AI configuration env vars." }, { status: 500 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 290_000); // keep < 300s

  try {
    const r = await fetch(`${AI_URL}/chat`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-internal-auth": AI_SECRET,
      },
      body: JSON.stringify({ message, context: { cards } }),
      signal: controller.signal,
    });

    const data = await r.json().catch(() => null);
    if (!r.ok) {
      return NextResponse.json({ reply: "AI service error. Try again." }, { status: 502 });
    }

    return NextResponse.json({ reply: data?.reply ?? "No reply." }, { status: 200 });
  } catch {
    return NextResponse.json({ reply: "AI timed out (cold start or slow inference). Try again." }, { status: 504 });
  } finally {
    clearTimeout(timeout);
  }
}
