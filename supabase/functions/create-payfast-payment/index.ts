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

function generateSignature(data: Record<string, string>, passphrase: string): string {
  const params = Object.keys(data)
    .filter((key) => data[key] !== "" && key !== "signature")
    .sort()
    .map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
    .join("&");

  const withPassphrase = params + `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}`;

  const encoder = new TextEncoder();
  const dataBytes = encoder.encode(withPassphrase);
  const hashBuffer = new Uint8Array(
    // deno-lint-ignore no-explicit-any
    (globalThis as any).crypto
      ? new Uint8Array(0) // placeholder
      : new Uint8Array(0)
  );
  
  // Use Web Crypto API for MD5 alternative - PayFast uses MD5
  // Deno supports createHash
  const { createHash } = await_import_hash();
  const hash = createHash("md5");
  hash.update(withPassphrase);
  return hash.toString();
}

// We need a sync approach for MD5
function md5(input: string): string {
  // Simple MD5 implementation for Deno
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  
  function md5cycle(x: number[], k: number[]) {
    let a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);
  }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function add32(a: number, b: number) {
    return (a + b) & 0xffffffff;
  }

  const n = data.length;
  let state = [1732584193, -271733879, -1732584194, 271733878];
  let i;
  for (i = 64; i <= n; i += 64) {
    const block: number[] = [];
    for (let j = 0; j < 64; j += 4) {
      block.push(data[i - 64 + j] | (data[i - 64 + j + 1] << 8) | (data[i - 64 + j + 2] << 16) | (data[i - 64 + j + 3] << 24));
    }
    md5cycle(state, block);
  }
  const tail: number[] = new Array(16).fill(0);
  for (let j = 0; j < n % 64; j++) {
    tail[j >> 2] |= data[j + i - 64 + (n % 64 === 0 ? 64 : 0)] << ((j % 4) << 3);
  }
  // Actually let me use a simpler approach
  return "";
}

// Let me use the Deno standard library instead
async function await_import_hash() {
  const { createHash } = await import("https://deno.land/std@0.177.0/hash/mod.ts");
  return { createHash };
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

    // Calculate totals
    const subtotal = parsed.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const total = subtotal + parsed.shippingCost;

    // Generate order number
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
    const returnUrl = `${req.headers.get("origin") || "https://beats-by-siba-boutique.lovable.app"}/payment-success?order=${order.order_number}`;
    const cancelUrl = `${req.headers.get("origin") || "https://beats-by-siba-boutique.lovable.app"}/payment-cancel?order=${order.order_number}`;
    const notifyUrl = `${SUPABASE_URL}/functions/v1/payfast-notify`;

    // PayFast amounts in cents → PayFast expects Rands with 2 decimals
    const amountInRands = (total / 100).toFixed(2);

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
      amount: amountInRands,
      item_name: `Order ${order.order_number}`,
      custom_str1: order.order_number,
    };

    // Generate signature
    const signatureString = Object.keys(paymentData)
      .filter((key) => paymentData[key] !== "")
      .sort()
      .map((key) => `${key}=${encodeURIComponent(paymentData[key]).replace(/%20/g, "+")}`)
      .join("&");

    const withPassphrase = signatureString + `&passphrase=${encodeURIComponent(PASSPHRASE).replace(/%20/g, "+")}`;
    
    // Use Deno's crypto for MD5
    const { createHash } = await import("https://deno.land/std@0.177.0/hash/mod.ts");
    const hash = createHash("md5");
    hash.update(withPassphrase);
    const signature = hash.toString();

    paymentData.signature = signature;

    // PayFast sandbox URL
    const pfHost = "sandbox.payfast.co.za";
    const paymentUrl = `https://${pfHost}/eng/process`;

    return new Response(
      JSON.stringify({
        paymentUrl,
        paymentData,
        orderNumber: order.order_number,
        orderId: order.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PayFast payment error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof z.ZodError ? error.errors : error.message || "Payment creation failed" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
