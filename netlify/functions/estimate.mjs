// Netlify Function (v2) — server-side proxy for an AI photo-to-estimate
// provider. Keeps the API key OFF the client (a static site can't hold secrets).
//
// Behaviour:
//   • No ESTIMATE_API_KEY env var set  -> { configured: false }
//        => the client falls back to the guided ballpark. (This is today.)
//   • Key set, provider succeeds       -> { configured: true, lo, hi, source: "ai" }
//   • Key set, provider errors         -> { configured: true, failed: true }
//        => the client still falls back to the guided ballpark. Never breaks.
//
// To go live: create a trial account with a provider (Inspektlabs / Arya / etc.),
// then in Netlify → Site configuration → Environment variables set:
//   ESTIMATE_API_KEY  = <your key>
//   ESTIMATE_API_URL  = <the provider's estimate endpoint>
// and finish the field-mapping in callProvider() using that provider's docs
// (the exact request/response shape is only visible after you sign up).

export default async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "POST only" }, { status: 405 });
  }

  const key = process.env.ESTIMATE_API_KEY;
  if (!key) {
    return Response.json({ configured: false });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "bad json" }, { status: 400 });
  }

  try {
    const result = await callProvider(payload, key);
    return Response.json({ configured: true, ...result });
  } catch (err) {
    // Any provider failure -> client falls back to the guided ballpark.
    return Response.json({ configured: true, failed: true, message: String(err) });
  }
};

// ---------------------------------------------------------------------------
// Provider adapter — the "last mile".
// The generic template below (POST the first photo + the structured damage,
// Bearer auth) is a sensible starting point. Adjust the endpoint, request body,
// and the response field names to match the provider's docs once the account
// exists. Driven by env vars so swapping providers needs no code change beyond
// the response mapping.
// ---------------------------------------------------------------------------
async function callProvider(payload, key) {
  const endpoint = process.env.ESTIMATE_API_URL;
  if (!endpoint) throw new Error("ESTIMATE_API_URL not set");

  const image = Array.isArray(payload.images) ? payload.images[0] : null; // base64 data URL

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ image, damage: payload }),
  });
  if (!res.ok) throw new Error(`provider responded ${res.status}`);

  const data = await res.json();

  // Map provider response -> a low/high dollar range. Tune to the provider.
  const lo = data.cost_low ?? data.estimate?.low ?? data.repair_cost?.min ?? null;
  const hi = data.cost_high ?? data.estimate?.high ?? data.repair_cost?.max ?? null;
  if (lo == null || hi == null) throw new Error("no cost range in provider response");

  return { lo: Math.round(Number(lo)), hi: Math.round(Number(hi)), source: "ai" };
}
