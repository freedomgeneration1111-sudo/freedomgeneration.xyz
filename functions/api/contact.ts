// Cloudflare Pages Function: POST /api/contact
// Seam to Resend — sends to the school inbox when RESEND_API_KEY is configured,
// falls back to console.log so the form still "works" in every environment.
// Deployed automatically by `wrangler pages deploy` from this functions/ directory.

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
};

type EventContext = {
  request: Request;
  env: Env;
};

const CONTACT_TO_DEFAULT = "freedomgenerationschool@gmail.com";

// Basic per-isolate rate limiting: max 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const { request, env } = context;
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (rateLimited(ip)) {
    return json({ error: "Too many messages. Please try again later." }, 429);
  }

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  const name = String(data.name ?? "").trim().slice(0, 200);
  const contact = String(data.contact ?? "").trim().slice(0, 200);
  const subject = String(data.subject ?? "general").trim().slice(0, 50);
  const message = String(data.message ?? "").trim().slice(0, 5000);
  const honeypot = String(data.website ?? "");

  // Honeypot filled → almost certainly a bot; pretend success.
  if (honeypot) return json({ ok: true });

  if (!name || !contact || !message) {
    return json({ error: "Name, contact, and message are required." }, 400);
  }

  const to = env.CONTACT_TO ?? CONTACT_TO_DEFAULT;
  const text = `New message from freedomgeneration.xyz

Name: ${name}
Contact: ${contact}
Subject: ${subject}

${message}`;

  if (env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Freedom Generation Website <onboarding@resend.dev>",
        to: [to],
        subject: `[Website contact — ${subject}] ${name}`,
        text,
      }),
    });
    if (!res.ok) {
      console.log("Resend send failed", res.status, await res.text());
      return json({ error: "Could not send the message." }, 502);
    }
    return json({ ok: true });
  }

  // No API key configured — log so the submission is visible in wrangler logs.
  console.log("Contact form submission (no RESEND_API_KEY configured):", text);
  return json({ ok: true });
}
