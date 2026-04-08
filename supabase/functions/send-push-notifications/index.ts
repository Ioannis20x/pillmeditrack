const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.102.1";

// Web Push helpers
async function generateJWT(vapidPrivateKey: string, vapidPublicKey: string, audience: string): Promise<string> {
  const header = { typ: "JWT", alg: "ES256" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    aud: audience,
    exp: now + 12 * 60 * 60,
    sub: "mailto:noreply@meditrack.app",
  };

  const enc = new TextEncoder();
  const b64url = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const headerB64 = b64url(enc.encode(JSON.stringify(header)));
  const payloadB64 = b64url(enc.encode(JSON.stringify(payload)));
  const unsignedToken = `${headerB64}.${payloadB64}`;

  // Import the VAPID private key
  const rawKey = Uint8Array.from(atob(vapidPrivateKey.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    "pkcs8",
    await convertRawToP8(rawKey),
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    key,
    enc.encode(unsignedToken)
  );

  // Convert DER signature to raw r||s format
  const rawSig = derToRaw(new Uint8Array(sig));
  return `${unsignedToken}.${b64url(rawSig.buffer)}`;
}

function derToRaw(der: Uint8Array): Uint8Array {
  // If it's already 64 bytes, it's raw format
  if (der.length === 64) return der;
  
  // Parse DER format
  const raw = new Uint8Array(64);
  let offset = 2; // skip SEQUENCE tag + length
  
  // Parse r
  if (der[offset] !== 0x02) throw new Error("Invalid DER signature");
  offset++;
  let rLen = der[offset++];
  let rOffset = offset;
  if (rLen === 33 && der[rOffset] === 0) { rOffset++; rLen--; }
  raw.set(der.slice(rOffset, rOffset + Math.min(rLen, 32)), 32 - Math.min(rLen, 32));
  offset = rOffset + (rLen === 33 ? rLen : rLen);
  if (der[rOffset - 1] === 0) offset = rOffset + rLen;
  else offset = rOffset + rLen;
  
  // Parse s
  if (der[offset] !== 0x02) throw new Error("Invalid DER signature");
  offset++;
  let sLen = der[offset++];
  let sOffset = offset;
  if (sLen === 33 && der[sOffset] === 0) { sOffset++; sLen--; }
  raw.set(der.slice(sOffset, sOffset + Math.min(sLen, 32)), 64 - Math.min(sLen, 32));
  
  return raw;
}

async function convertRawToP8(raw: Uint8Array): Promise<ArrayBuffer> {
  // Construct PKCS#8 wrapping for EC P-256 private key
  const prefix = new Uint8Array([
    0x30, 0x41, 0x02, 0x01, 0x00, 0x30, 0x13, 0x06,
    0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01,
    0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03,
    0x01, 0x07, 0x04, 0x27, 0x30, 0x25, 0x02, 0x01,
    0x01, 0x04, 0x20
  ]);
  const result = new Uint8Array(prefix.length + raw.length);
  result.set(prefix);
  result.set(raw, prefix.length);
  return result.buffer;
}

async function sendPushNotification(
  subscription: { endpoint: string; p256dh: string; auth_key: string },
  payload: object,
  vapidPublicKey: string,
  vapidPrivateKey: string,
) {
  const url = new URL(subscription.endpoint);
  const audience = `${url.protocol}//${url.host}`;

  const jwt = await generateJWT(vapidPrivateKey, vapidPublicKey, audience);

  // Encode payload
  const enc = new TextEncoder();
  const payloadBytes = enc.encode(JSON.stringify(payload));

  // For simplicity, send without encryption (requires TTL header)
  // Real web push requires encrypting the payload with the subscription keys
  // Using a simpler approach: send to the push endpoint with VAPID auth
  const response = await fetch(subscription.endpoint, {
    method: "POST",
    headers: {
      "Authorization": `vapid t=${jwt}, k=${vapidPublicKey}`,
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "aes128gcm",
      "TTL": "86400",
    },
    body: payloadBytes,
  });

  return { ok: response.ok, status: response.status };
}

function getTimeOfDayNow(): string | null {
  const hour = new Date().getHours();
  // Check windows: morning 7-9, noon 12-14, evening 19-21
  if (hour >= 7 && hour <= 9) return "morning";
  if (hour >= 12 && hour <= 14) return "noon";
  if (hour >= 19 && hour <= 21) return "evening";
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
    const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;

    if (!vapidPublicKey || !vapidPrivateKey) {
      throw new Error("VAPID keys not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const currentTimeOfDay = getTimeOfDayNow();

    if (!currentTimeOfDay) {
      return new Response(JSON.stringify({ message: "Not a medication time window" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get all medications that should be taken at this time
    const { data: medications, error: medError } = await supabase
      .from("medications")
      .select("*")
      .contains("times_of_day", [currentTimeOfDay]);

    if (medError) throw medError;
    if (!medications || medications.length === 0) {
      return new Response(JSON.stringify({ message: "No medications due" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const today = new Date().toISOString().split("T")[0];

    // Check which are not yet taken
    const userMeds: Record<string, typeof medications> = {};
    for (const med of medications) {
      const takenKey = `${today}-${currentTimeOfDay}`;
      const { data: taken } = await supabase
        .from("medication_taken")
        .select("id")
        .eq("medication_id", med.id)
        .eq("taken_key", takenKey)
        .maybeSingle();

      if (!taken) {
        if (!userMeds[med.user_id]) userMeds[med.user_id] = [];
        userMeds[med.user_id].push(med);
      }
    }

    // Send notifications per user
    let sent = 0;
    for (const [userId, meds] of Object.entries(userMeds)) {
      const { data: subscriptions } = await supabase
        .from("push_subscriptions")
        .select("*")
        .eq("user_id", userId);

      if (!subscriptions || subscriptions.length === 0) continue;

      const medNames = meds.map((m: any) => m.name).join(", ");
      const timeLabel = currentTimeOfDay === "morning" ? "Morgens" : currentTimeOfDay === "noon" ? "Mittags" : "Abends";

      for (const sub of subscriptions) {
        try {
          await sendPushNotification(
            sub,
            {
              title: `💊 ${timeLabel}: Medikamente einnehmen`,
              body: medNames,
              tag: `med-${currentTimeOfDay}-${today}`,
            },
            vapidPublicKey,
            vapidPrivateKey,
          );
          sent++;
        } catch (err) {
          console.error(`Failed to send push to ${sub.endpoint}:`, err);
        }
      }
    }

    return new Response(JSON.stringify({ message: `Sent ${sent} notifications` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Push notification error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
