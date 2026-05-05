// v3 – respects per-user reminder times from reminder_settings
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.102.1";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ── FCM helpers ───────────────────────────────────────────────────────────────

async function getFCMAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const body = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const pem = privateKey.replace(/\\n/g, "\n");
  const pemBody = pem.replace(/-----.*?-----/g, "").replace(/\s/g, "");
  const keyBuffer = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8", keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"],
  );
  const signingInput = `${header}.${body}`;
  const signatureBuffer = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(signingInput),
  );
  const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const jwt = `${signingInput}.${signature}`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const { access_token } = await tokenRes.json();
  return access_token;
}

async function sendFCM(
  token: string,
  payload: { title: string; body: string; tag: string },
  projectId: string,
  accessToken: string,
): Promise<number> {
  const res = await fetch(
    `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
    {
      method: "POST",
      headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          token,
          notification: { title: payload.title, body: payload.body },
          android: { notification: { tag: payload.tag, sound: "default" } },
          apns: { payload: { aps: { sound: "default", badge: 1 } } },
        },
      }),
    },
  );
  return res.status;
}

// ── Time helpers ──────────────────────────────────────────────────────────────

function getBerlinMinutes(): number {
  const now = new Date();
  const berlinStr = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  const [h, m] = berlinStr.split(":").map(Number);
  return h * 60 + m;
}

// Returns true if timeStr (e.g. "08:00:00") falls within the last WINDOW minutes
function isInWindow(timeStr: string | null, nowMinutes: number, windowMinutes = 5): boolean {
  if (!timeStr) return false;
  const parts = timeStr.split(":");
  const t = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  return t > nowMinutes - windowMinutes && t <= nowMinutes;
}

// Default times (minutes since midnight) if user has no reminder_settings
const DEFAULTS = { morning: 8 * 60, noon: 13 * 60, evening: 20 * 60 };

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // Auth: cron secret, anon key, or service role key
  const cronSecret = Deno.env.get("CRON_SECRET");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = req.headers.get("authorization") ?? "";
  const isAuthed = (cronSecret && req.headers.get("x-cron-secret") === cronSecret)
    || (anonKey && authHeader === `Bearer ${anonKey}`)
    || (serviceKey && authHeader === `Bearer ${serviceKey}`);
  if (!isAuthed) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
    const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;
    const fcmProjectId = Deno.env.get("FIREBASE_PROJECT_ID");
    const fcmClientEmail = Deno.env.get("FIREBASE_CLIENT_EMAIL");
    const fcmPrivateKey = Deno.env.get("FIREBASE_PRIVATE_KEY");
    const fcmEnabled = !!(fcmProjectId && fcmClientEmail && fcmPrivateKey);

    webpush.setVapidDetails("mailto:noreply@meditrack.app", vapidPublicKey, vapidPrivateKey);
    const supabase = createClient(supabaseUrl, supabaseKey);

    const nowMinutes = getBerlinMinutes();
    const today = new Date().toISOString().split("T")[0];

    // Load all reminder settings
    const { data: allSettings } = await supabase
      .from("reminder_settings")
      .select("user_id, morning_time, noon_time, evening_time");

    // Load all medications with their users
    const { data: allMedications } = await supabase
      .from("medications")
      .select("*");

    if (!allMedications?.length) {
      return new Response(JSON.stringify({ message: "No medications configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build map: userId → settings
    const settingsMap = new Map<string, { morning_time: string | null; noon_time: string | null; evening_time: string | null }>();
    for (const s of allSettings ?? []) {
      settingsMap.set(s.user_id, s);
    }

    // Determine which userId+timeOfDay pairs need notifications now
    const toNotify = new Map<string, string[]>(); // userId → [timeOfDay]

    const uniqueUserIds = [...new Set(allMedications.map((m: any) => m.user_id))];
    for (const userId of uniqueUserIds) {
      const s = settingsMap.get(userId);
      const periods: Array<{ key: string; time: string | null; defaultMin: number }> = [
        { key: "morning", time: s?.morning_time ?? null, defaultMin: DEFAULTS.morning },
        { key: "noon", time: s?.noon_time ?? null, defaultMin: DEFAULTS.noon },
        { key: "evening", time: s?.evening_time ?? null, defaultMin: DEFAULTS.evening },
      ];
      for (const { key, time, defaultMin } of periods) {
        const matches = time
          ? isInWindow(time, nowMinutes)
          : (nowMinutes > defaultMin - 5 && nowMinutes <= defaultMin);
        if (matches) {
          if (!toNotify.has(userId)) toNotify.set(userId, []);
          toNotify.get(userId)!.push(key);
        }
      }
    }

    if (toNotify.size === 0) {
      return new Response(JSON.stringify({ message: "No reminders due now" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get FCM access token once
    let fcmAccessToken: string | null = null;
    if (fcmEnabled) {
      try {
        fcmAccessToken = await getFCMAccessToken(fcmClientEmail!, fcmPrivateKey!);
      } catch (e) {
        console.error("FCM token error:", e);
      }
    }

    let sent = 0;

    for (const [userId, periods] of toNotify.entries()) {
      for (const timeOfDay of periods) {
        const userMeds = allMedications.filter(
          (m: any) => m.user_id === userId && m.times_of_day?.includes(timeOfDay),
        );
        if (!userMeds.length) continue;

        // Filter out already-taken medications
        const takenKey = `${today}-${timeOfDay}`;
        const unTaken: typeof userMeds = [];
        for (const med of userMeds) {
          const { data: taken } = await supabase
            .from("medication_taken")
            .select("id")
            .eq("medication_id", med.id)
            .eq("taken_key", takenKey)
            .maybeSingle();
          if (!taken) unTaken.push(med);
        }
        if (!unTaken.length) continue;

        const timeLabel = timeOfDay === "morning" ? "Morgens" : timeOfDay === "noon" ? "Mittags" : "Abends";
        const notifPayload = {
          title: `💊 ${timeLabel}: Medikamente einnehmen`,
          body: unTaken.map((m: any) => m.name).join(", "),
          tag: `med-${timeOfDay}-${today}`,
        };

        // Web push
        const { data: webSubs } = await supabase
          .from("push_subscriptions").select("*").eq("user_id", userId);
        for (const sub of webSubs ?? []) {
          try {
            await webpush.sendNotification(
              { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
              JSON.stringify(notifPayload),
            );
            sent++;
          } catch (err: any) {
            if (err?.statusCode === 410 || err?.statusCode === 404) {
              await supabase.from("push_subscriptions").delete().eq("id", sub.id);
            }
          }
        }

        // FCM
        if (fcmAccessToken && fcmProjectId) {
          const { data: deviceTokens } = await supabase
            .from("device_tokens").select("*").eq("user_id", userId);
          for (const dt of deviceTokens ?? []) {
            const status = await sendFCM(dt.token, notifPayload, fcmProjectId, fcmAccessToken);
            if (status === 200) sent++;
            else if (status === 404 || status === 410) {
              await supabase.from("device_tokens").delete().eq("id", dt.id);
            }
          }
        }
      }
    }

    return new Response(JSON.stringify({ message: `Sent ${sent} notifications` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
