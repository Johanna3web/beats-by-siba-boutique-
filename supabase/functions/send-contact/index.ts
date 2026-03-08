import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

const ContactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(255),
  message: z.string().min(1).max(2000).trim(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const WEB3FORMS_ACCESS_KEY = "ef41f083-3894-4312-9486-312e5e437624";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    const validationResult = ContactSchema.safeParse(rawData);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input. Please check your data." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, message } = validationResult.data;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to database
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });

    if (error) throw error;

    // Send email notification via Web3Forms
    const web3Response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Contact Message from ${escapeHtml(name)}`,
        from_name: "Beats by Siba",
        name: escapeHtml(name),
        email: escapeHtml(email),
        message: escapeHtml(message),
      }),
    });

    const web3Result = await web3Response.json();
    console.log("Web3Forms result:", JSON.stringify(web3Result));

    if (!web3Response.ok) {
      console.error("Web3Forms error:", web3Result);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
