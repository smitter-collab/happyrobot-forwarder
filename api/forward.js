export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "Endpoint is alive. Use POST to send JSON." });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = req.body || {};

    return res.status(200).json({
      success: true,
      received_payload: payload,
      processed_at: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
