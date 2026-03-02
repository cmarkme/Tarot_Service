export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message : "";

  if (!message.trim()) {
    return Response.json({ error: "Missing `message` in request body." }, { status: 400 });
  }

  const base = process.env.CLOUD_RUN_BASE_URL;
  const secret = process.env.AI_SHARED_SECRET;

  if (!base || !secret) {
    return Response.json(
      { error: "Server missing CLOUD_RUN_BASE_URL or AI_SHARED_SECRET env vars." },
      { status: 500 }
    );
  }

  const upstream = await fetch(`${base}/chat`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-ai-shared-secret": secret,
    },
    body: JSON.stringify({ message }),
  });

  const text = await upstream.text();

  return new Response(text, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") || "application/json",
    },
  });
}