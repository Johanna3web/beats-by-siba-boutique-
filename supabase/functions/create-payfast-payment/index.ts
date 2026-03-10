import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const checkoutSchema = z.object({
  customerName: z.string().trim().min(1).max(200),
  customerEmail: z.string().trim().email().max(255),
  customerPhone: z.string().trim().max(20).optional(),
  shippingAddress: z.string().trim().min(1).max(500),
  shippingCity: z.string().trim().min(1).max(100),
  shippingProvince: z.string().trim().min(1).max(100),
  shippingPostalCode: z.string().trim().min(1).max(10),
  items: z.array(
    z.object({
      productId: z.string(),
      productName: z.string().max(200),
      productImage: z.string().optional(),
      quantity: z.number().int().min(1).max(99),
      unitPrice: z.number().min(0),
      selectedLength: z.string().optional(),
    })
  ).min(1).max(50),
  shippingCost: z.number().min(0).default(0),
});

async function generatePayFastSignature(data: Record<string, string>, passphrase: string): Promise<string> {
  const paramString = Object.keys(data)
    .filter((key) => data[key] !== "" && key !== "signature")
    .sort()
    .map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
    .join("&");

  const withPassphrase = paramString + `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}`;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(withPassphrase);
  const hashBuffer = await crypto.subtle.digest("MD5", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const parsed = checkoutSchema.parse(body);

    const MERCHANT_ID = Deno.env.get("PAYFAST_MERCHANT_ID")!;
    const MERCHANT_KEY = Deno.env.get("PAYFAST_MERCHANT_KEY")!;
    const PASSPHRASE = Deno.env.get("PAYFAST_PASSPHRASE")!;
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Prices are stored as whole Rands (integers)
    const subtotal = parsed.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const total = subtotal + parsed.shippingCost;

    const { data: orderNumber } = await supabase.rpc("generate_order_number");

    // Get user_id from auth header if present
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const anonClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data } = await anonClient.auth.getUser();
      userId = data?.user?.id ?? null;
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: userId,
        customer_name: parsed.customerName,
        customer_email: parsed.customerEmail,
        customer_phone: parsed.customerPhone || null,
        shipping_address: parsed.shippingAddress,
        shipping_city: parsed.shippingCity,
        shipping_province: parsed.shippingProvince,
        shipping_postal_code: parsed.shippingPostalCode,
        shipping_country: "South Africa",
        subtotal,
        shipping_cost: parsed.shippingCost,
        total,
        payment_status: "pending",
        order_status: "processing",
      })
      .select("id, order_number")
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = parsed.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName + (item.selectedLength ? ` (${item.selectedLength})` : ""),
      product_image: item.productImage || null,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.unitPrice * item.quantity,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) throw itemsError;

    // Build PayFast payment data
    const origin = req.headers.get("origin") || "https://beats-by-siba-boutique.lovable.app";
    const returnUrl = `${origin}/payment-success?order=${order.order_number}`;
    const cancelUrl = `${origin}/payment-cancel?order=${order.order_number}`;
    const notifyUrl = `${SUPABASE_URL}/functions/v1/payfast-notify`;

    // PayFast expects amount as "1234.00" (Rands with 2 decimals)
    const amountFormatted = total.toFixed(2);

    const paymentData: Record<string, string> = {
      merchant_id: MERCHANT_ID,
      merchant_key: MERCHANT_KEY,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      name_first: parsed.customerName.split(" ")[0] || parsed.customerName,
      name_last: parsed.customerName.split(" ").slice(1).join(" ") || "",
      email_address: parsed.customerEmail,
      m_payment_id: order.id,
      amount: amountFormatted,
      item_name: `Order ${order.order_number}`,
      custom_str1: order.order_number,
    };

    paymentData.signature = await generatePayFastSignature(paymentData, PASSPHRASE);

    // Sandbox URL
    const paymentUrl = "https://sandbox.payfast.co.za/eng/process";

    return new Response(
      JSON.stringify({ paymentUrl, paymentData, orderNumber: order.order_number, orderId: order.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PayFast payment error:", error);
    const message = error instanceof z.ZodError ? error.errors : (error as Error).message || "Payment creation failed";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
