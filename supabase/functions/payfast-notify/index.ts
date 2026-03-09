import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // PayFast sends ITN as application/x-www-form-urlencoded
    const formData = await req.formData();
    const data: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value.toString();
    }

    console.log("PayFast ITN received:", JSON.stringify(data));

    const MERCHANT_ID = Deno.env.get("PAYFAST_MERCHANT_ID")!;
    const PASSPHRASE = Deno.env.get("PAYFAST_PASSPHRASE")!;
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1. Verify signature
    const receivedSignature = data.signature;
    const signatureString = Object.keys(data)
      .filter((key) => key !== "signature" && data[key] !== "")
      .sort()
      .map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
      .join("&");

    const withPassphrase = signatureString + `&passphrase=${encodeURIComponent(PASSPHRASE).replace(/%20/g, "+")}`;

    const { createHash } = await import("https://deno.land/std@0.177.0/hash/mod.ts");
    const hash = createHash("md5");
    hash.update(withPassphrase);
    const expectedSignature = hash.toString();

    if (receivedSignature !== expectedSignature) {
      console.error("Signature mismatch");
      return new Response("Invalid signature", { status: 400 });
    }

    // 2. Verify merchant ID
    if (data.merchant_id !== MERCHANT_ID) {
      console.error("Merchant ID mismatch");
      return new Response("Invalid merchant", { status: 400 });
    }

    // 3. Verify with PayFast server (sandbox)
    const pfHost = "sandbox.payfast.co.za";
    const verifyUrl = `https://${pfHost}/eng/query/validate`;
    const verifyResponse = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    });
    const verifyResult = await verifyResponse.text();

    if (verifyResult !== "VALID") {
      console.error("PayFast validation failed:", verifyResult);
      return new Response("Validation failed", { status: 400 });
    }

    // 4. Update order in database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const orderId = data.m_payment_id;
    const paymentStatus = data.payment_status;

    let dbPaymentStatus: string;
    if (paymentStatus === "COMPLETE") {
      dbPaymentStatus = "paid";
    } else if (paymentStatus === "FAILED") {
      dbPaymentStatus = "failed";
    } else if (paymentStatus === "CANCELLED") {
      dbPaymentStatus = "failed";
    } else {
      dbPaymentStatus = "pending";
    }

    const { error } = await supabase
      .from("orders")
      .update({
        payment_status: dbPaymentStatus,
        payfast_payment_id: data.pf_payment_id || null,
        payfast_token: data.token || null,
      })
      .eq("id", orderId);

    if (error) {
      console.error("Database update error:", error);
      return new Response("Database error", { status: 500 });
    }

    console.log(`Order ${orderId} updated to ${dbPaymentStatus}`);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("ITN processing error:", error);
    return new Response("Server error", { status: 500 });
  }
});
