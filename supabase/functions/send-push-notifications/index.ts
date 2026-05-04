import { createClient } from "https://esm.sh/@supabase/supabase-js@2.102.1";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function getTimeOfDayNow(): string | null {
  const now = new Date();
  const hour = parseInt(
    new Intl.DateTimeFormat("de-DE", {
      timeZone: "Europe/Berlin",
      hour: "numeric",
      hour12: false,
    }).format(now),
    10,
  );
  if (hour >= 7 && hour <= 9) return "morning";
  if (hour >= 12 && hour <= 14) return "noon";
  if (hour >= 19 && hour <= 21) return "evening";
  return null;
}

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
    "pkcs8",
    keyBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signingInput = `${header}.${body}`;
  const signatureBuffer = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput),
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
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          token,
          notification: { title: payload.title, body: payload.body },
          android: { notification: { tag: payload.tag, sound: "default" } },
          apns: {
            payload: { aps: { sound: "default", badge: 1 } },
          },
        },
      }),
    },
  );
  return res.status;
}

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Auth: accept service-role JWT or cron secret
  const cronSecret = Deno.env.get("CRON_SECRET");
  const isFromCron = cronSecret && req.headers.get("x-cron-secret") === cronSecret;
  const authHeader = req.headers.get("authorization") ?? "";
  const isFromAdmin = authHeader === `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`;
  if (!isFromCron && !isFromAdmin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
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

    if (!vapidPublicKey || !vapidPrivateKey) {
      throw new Error("VAPID keys not configured");
    }

    webpush.setVapidDetails("mailto:noreply@meditrack.app", vapidPublicKey, vapidPrivateKey);

    const supabase = createClient(supabaseUrl, supabaseKey);

    let currentTimeOfDay: string | null = null;
    try {
      const body = await req.json();
      if (body?.time_of_day) currentTimeOfDay = body.time_of_day;
    } catch { /* no body */ }
    if (!currentTimeOfDay) currentTimeOfDay = getTimeOfDayNow();

    if (!currentTimeOfDay) {
      return new Response(JSON.stringify({ message: "Not a medication time window" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

    // Group untaken meds by user
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

    // Get FCM access token once (reused for all FCM sends)
    let fcmAccessToken: string | null = null;
    if (fcmEnabled) {
      try {
        fcmAccessToken = await getFCMAccessToken(fcmClientEmail!, fcmPrivateKey!);
      } catch (e) {
        console.error("FCM access token error:", e);
      }
    }

    let sent = 0;
    const timeLabel =
      currentTimeOfDay === "morning" ? "Morgens" :
      currentTimeOfDay === "noon" ? "Mittags" : "Abends";

    for (const [userId, meds] of Object.entries(userMeds)) {
      const medNames = meds.map((m: any) => m.name).join(", ");
      const notifPayload = {
        title: `💊 ${timeLabel}: Medikamente einnehmen`,
        body: medNames,
        tag: `med-${currentTimeOfDay}-${today}`,
      };

      // ── Web Push ────────────────────────────────────────────────────────────
      const { data: webSubs } = await supabase
        .from("push_subscriptions")
        .select("*")
        .eq("user_id", userId);

      for (const sub of webSubs ?? []) {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
            JSON.stringify(notifPayload),
          );
          sent++;
        } catch (err: any) {
          console.error(`Web push failed:`, err?.statusCode, err?.body);
          if (err?.statusCode === 410 || err?.statusCode === 404) {
            await supabase.from("push_subscriptions").delete().eq("id", sub.id);
          }
        }
      }

      // ── FCM (native) ────────────────────────────────────────────────────────
      if (fcmAccessToken && fcmProjectId) {
        const { data: deviceTokens } = await supabase
          .from("device_tokens")
          .select("*")
          .eq("user_id", userId);

        for (const dt of deviceTokens ?? []) {
          try {
            const status = await sendFCM(dt.token, notifPayload, fcmProjectId, fcmAccessToken);
            if (status === 200) {
              sent++;
            } else if (status === 404 || status === 410) {
              await supabase.from("device_tokens").delete().eq("id", dt.id);
            }
          } catch (err) {
            console.error(`FCM failed for token ${dt.token}:`, err);
          }
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
