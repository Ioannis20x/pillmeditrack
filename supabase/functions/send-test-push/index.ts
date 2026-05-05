import { createClient } from "https://esm.sh/@supabase/supabase-js@2.102.1";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ── FCM helpers (same as send-push-notifications) ────────────────────────────

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
  const tokenJson = await tokenRes.json();
  if (!tokenJson.access_token) {
    throw new Error(`OAuth token exchange failed: ${JSON.stringify(tokenJson)}`);
  }
  return tokenJson.access_token;
}

// ── Main ──────────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
    const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;
    const fcmProjectId = Deno.env.get("FIREBASE_PROJECT_ID");
    const fcmClientEmail = Deno.env.get("FIREBASE_CLIENT_EMAIL");
    const fcmPrivateKey = Deno.env.get("FIREBASE_PRIVATE_KEY");
    const fcmEnabled = !!(fcmProjectId && fcmClientEmail && fcmPrivateKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const userId = userData.user.id;

    const payload = JSON.stringify({
      title: "🧪 Test-Benachrichtigung",
      body: "Push funktioniert! Du erhältst Erinnerungen wie geplant.",
      tag: `test-${Date.now()}`,
    });

    let sent = 0;
    const debug: Record<string, unknown> = {
      fcm_enabled: fcmEnabled,
      fcm_project_id: fcmProjectId ?? null,
      fcm_has_email: !!fcmClientEmail,
      fcm_has_key: !!fcmPrivateKey,
    };

    // ── Web Push ──────────────────────────────────────────────────────────────
    if (vapidPublicKey && vapidPrivateKey) {
      webpush.setVapidDetails("mailto:noreply@meditrack.app", vapidPublicKey, vapidPrivateKey);
      const { data: subs } = await admin
        .from("push_subscriptions").select("*").eq("user_id", userId);
      debug.web_sub_count = (subs ?? []).length;
      for (const sub of subs ?? []) {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
            payload,
          );
          sent++;
        } catch (err: any) {
          if (err?.statusCode === 410 || err?.statusCode === 404) {
            await admin.from("push_subscriptions").delete().eq("id", sub.id);
          }
        }
      }
    }

    // ── FCM (native) ──────────────────────────────────────────────────────────
    if (fcmEnabled) {
      let fcmToken: string | null = null;
      let fcmTokenError: string | null = null;
      try {
        fcmToken = await getFCMAccessToken(fcmClientEmail!, fcmPrivateKey!);
      } catch (e: any) {
        fcmTokenError = e?.message ?? String(e);
        console.error("FCM access token error:", fcmTokenError);
      }
      debug.fcm_access_token_ok = !!fcmToken;
      debug.fcm_access_token_error = fcmTokenError;

      if (fcmToken) {
        const { data: deviceTokens } = await admin
          .from("device_tokens").select("*").eq("user_id", userId);
        debug.device_token_count = (deviceTokens ?? []).length;
        const notifPayload = JSON.parse(payload);
        for (const dt of deviceTokens ?? []) {
          try {
            const res = await fetch(
              `https://fcm.googleapis.com/v1/projects/${fcmProjectId}/messages:send`,
              {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${fcmToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  message: {
                    token: dt.token,
                    notification: { title: notifPayload.title, body: notifPayload.body },
                    android: { notification: { tag: notifPayload.tag, sound: "default" } },
                  },
                }),
              },
            );
            const resBody = await res.json();
            console.log(`FCM send status ${res.status}:`, JSON.stringify(resBody));
            if (res.status === 200) {
              sent++;
            } else {
              debug.fcm_send_error = resBody;
              if (res.status === 404 || res.status === 410) {
                await admin.from("device_tokens").delete().eq("id", dt.id);
              }
            }
          } catch (err: any) {
            console.error("FCM send error:", err);
            debug.fcm_send_exception = err?.message ?? String(err);
          }
        }
      }
    }

    return new Response(JSON.stringify({ sent, debug }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
