import { createClient } from "https://esm.sh/@supabase/supabase-js@2.102.1";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function getTimeOfDayNow(): string | null {
  const hour = new Date().getHours();
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

    webpush.setVapidDetails(
      "mailto:noreply@meditrack.app",
      vapidPublicKey,
      vapidPrivateKey,
    );

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Allow manual trigger with a specific time_of_day in body
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

    // Get medications for this time
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

    // Send notifications
    let sent = 0;
    for (const [userId, meds] of Object.entries(userMeds)) {
      const { data: subscriptions } = await supabase
        .from("push_subscriptions")
        .select("*")
        .eq("user_id", userId);

      if (!subscriptions || subscriptions.length === 0) continue;

      const medNames = meds.map((m: any) => m.name).join(", ");
      const timeLabel = currentTimeOfDay === "morning" ? "Morgens" : currentTimeOfDay === "noon" ? "Mittags" : "Abends";
      const payload = JSON.stringify({
        title: `💊 ${timeLabel}: Medikamente einnehmen`,
        body: medNames,
        tag: `med-${currentTimeOfDay}-${today}`,
      });

      for (const sub of subscriptions) {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth_key },
            },
            payload,
          );
          sent++;
        } catch (err: any) {
          console.error(`Push failed for ${sub.endpoint}:`, err?.statusCode, err?.body);
          // Remove expired/invalid subscriptions
          if (err?.statusCode === 410 || err?.statusCode === 404) {
            await supabase.from("push_subscriptions").delete().eq("id", sub.id);
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
