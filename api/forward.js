// api/forward.js
// Vercel serverless function that echoes POST bodies and supports CORS (OPTIONS)

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // or restrict to your origin
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  // Always set CORS headers (important for browser POSTs)
  setCorsHeaders(res);

  // Respond to preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end(); // No Content
  }

  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "Endpoint is alive. Use POST to send JSON." });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = req.body || {};

    // For demo: echo the payload and add timestamp
    return res.status(200).json({
      success: true,
      received_payload: payload,
      processed_at: new Date().toISOString()
    });
  } catch (err) {
    console.error("Forwarder error:", err);
    return res.status(500).json({ error: String(err) });
  }
}
