import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
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

function md5(input: string): string {
  function safeAdd(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function strToUtf8Arr(str: string): number[] {
    const arr: number[] = [];
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode < 128) {
        arr.push(charCode);
      } else if (charCode < 2048) {
        arr.push((charCode >> 6) | 192, (charCode & 63) | 128);
      } else {
        arr.push((charCode >> 12) | 224, ((charCode >> 6) & 63) | 128, (charCode & 63) | 128);
      }
    }
    return arr;
  }
  const utf8 = strToUtf8Arr(input);
  const length8 = utf8.length;
  const nblocks = ((length8 + 8) >> 6) + 1;
  const blocks: number[] = new Array(nblocks * 16).fill(0);
  for (let i = 0; i < length8; i++) {
    blocks[i >> 2] |= utf8[i] << ((i % 4) * 8);
  }
  blocks[length8 >> 2] |= 0x80 << ((length8 % 4) * 8);
  blocks[nblocks * 16 - 2] = length8 * 8;
  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  for (let i = 0; i < blocks.length; i += 16) {
    const aa = a, bb = b, cc = c, dd = d;
    a = md5ff(a,b,c,d,blocks[i],7,-680876936); d = md5ff(d,a,b,c,blocks[i+1],12,-389564586);
    c = md5ff(c,d,a,b,blocks[i+2],17,606105819); b = md5ff(b,c,d,a,blocks[i+3],22,-1044525330);
    a = md5ff(a,b,c,d,blocks[i+4],7,-176418897); d = md5ff(d,a,b,c,blocks[i+5],12,1200080426);
    c = md5ff(c,d,a,b,blocks[i+6],17,-1473231341); b = md5ff(b,c,d,a,blocks[i+7],22,-45705983);
    a = md5ff(a,b,c,d,blocks[i+8],7,1770035416); d = md5ff(d,a,b,c,blocks[i+9],12,-1958414417);
    c = md5ff(c,d,a,b,blocks[i+10],17,-42063); b = md5ff(b,c,d,a,blocks[i+11],22,-1990404162);
    a = md5ff(a,b,c,d,blocks[i+12],7,1804603682); d = md5ff(d,a,b,c,blocks[i+13],12,-40341101);
    c = md5ff(c,d,a,b,blocks[i+14],17,-1502002290); b = md5ff(b,c,d,a,blocks[i+15],22,1236535329);
    a = md5gg(a,b,c,d,blocks[i+1],5,-165796510); d = md5gg(d,a,b,c,blocks[i+6],9,-1069501632);
    c = md5gg(c,d,a,b,blocks[i+11],14,643717713); b = md5gg(b,c,d,a,blocks[i],20,-373897302);
    a = md5gg(a,b,c,d,blocks[i+5],5,-701558691); d = md5gg(d,a,b,c,blocks[i+10],9,38016083);
    c = md5gg(c,d,a,b,blocks[i+15],14,-660478335); b = md5gg(b,c,d,a,blocks[i+4],20,-405537848);
    a = md5gg(a,b,c,d,blocks[i+9],5,568446438); d = md5gg(d,a,b,c,blocks[i+14],9,-1019803690);
    c = md5gg(c,d,a,b,blocks[i+3],14,-187363961); b = md5gg(b,c,d,a,blocks[i+8],20,1163531501);
    a = md5gg(a,b,c,d,blocks[i+13],5,-1444681467); d = md5gg(d,a,b,c,blocks[i+2],9,-51403784);
    c = md5gg(c,d,a,b,blocks[i+7],14,1735328473); b = md5gg(b,c,d,a,blocks[i+12],20,-1926607734);
    a = md5hh(a,b,c,d,blocks[i+5],4,-378558); d = md5hh(d,a,b,c,blocks[i+8],11,-2022574463);
    c = md5hh(c,d,a,b,blocks[i+11],16,1839030562); b = md5hh(b,c,d,a,blocks[i+14],23,-35309556);
    a = md5hh(a,b,c,d,blocks[i+1],4,-1530992060); d = md5hh(d,a,b,c,blocks[i+4],11,1272893353);
    c = md5hh(c,d,a,b,blocks[i+7],16,-155497632); b = md5hh(b,c,d,a,blocks[i+10],23,-1094730640);
    a = md5hh(a,b,c,d,blocks[i+13],4,681279174); d = md5hh(d,a,b,c,blocks[i],11,-358537222);
    c = md5hh(c,d,a,b,blocks[i+3],16,-722521979); b = md5hh(b,c,d,a,blocks[i+6],23,76029189);
    a = md5hh(a,b,c,d,blocks[i+9],4,-640364487); d = md5hh(d,a,b,c,blocks[i+12],11,-421815835);
    c = md5hh(c,d,a,b,blocks[i+15],16,530742520); b = md5hh(b,c,d,a,blocks[i+2],23,-995338651);
    a = md5ii(a,b,c,d,blocks[i],6,-198630844); d = md5ii(d,a,b,c,blocks[i+7],10,1126891415);
    c = md5ii(c,d,a,b,blocks[i+14],15,-1416354905); b = md5ii(b,c,d,a,blocks[i+5],21,-57434055);
    a = md5ii(a,b,c,d,blocks[i+12],6,1700485571); d = md5ii(d,a,b,c,blocks[i+3],10,-1894986606);
    c = md5ii(c,d,a,b,blocks[i+10],15,-1051523); b = md5ii(b,c,d,a,blocks[i+1],21,-2054922799);
    a = md5ii(a,b,c,d,blocks[i+8],6,1873313359); d = md5ii(d,a,b,c,blocks[i+15],10,-30611744);
    c = md5ii(c,d,a,b,blocks[i+6],15,-1560198380); b = md5ii(b,c,d,a,blocks[i+13],21,1309151649);
    a = md5ii(a,b,c,d,blocks[i+4],6,-145523070); d = md5ii(d,a,b,c,blocks[i+11],10,-1120210379);
    c = md5ii(c,d,a,b,blocks[i+2],15,718787259); b = md5ii(b,c,d,a,blocks[i+9],21,-343485551);
    a = safeAdd(a,aa); b = safeAdd(b,bb); c = safeAdd(c,cc); d = safeAdd(d,dd);
  }
  return [a,b,c,d].map(n => {
    let h = '';
    for (let j = 0; j < 4; j++) h += ('0'+((n>>(j*8))&0xff).toString(16)).slice(-2);
    return h;
  }).join('');
}

function generatePayFastSignature(data: Record<string, string>, passphrase: string): string {
  const paramString = Object.keys(data)
    .filter((key) => data[key] !== "" && key !== "signature")
    .sort()
    .map((key) => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
    .join("&");
  const withPassphrase = paramString + `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}`;
  return md5(withPassphrase);
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

    const subtotal = parsed.items.reduce((sum: number, item: {unitPrice: number; quantity: number}) => sum + item.unitPrice * item.quantity, 0);
    const total = subtotal + parsed.shippingCost;

    const { data: orderNumber } = await supabase.rpc("generate_order_number");

    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const anonClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data } = await anonClient.auth.getUser();
      userId = data?.user?.id ?? null;
    }

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

    const orderItems = parsed.items.map((item: {productId: string; productName: string; selectedLength?: string; productImage?: string; quantity: number; unitPrice: number}) => ({
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

    const origin = req.headers.get("origin") || "https://beats-by-siba-boutique.vercel.app";
    const returnUrl = `${origin}/payment-success?order=${order.order_number}`;
    const cancelUrl = `${origin}/payment-cancel?order=${order.order_number}`;
    const notifyUrl = `${SUPABASE_URL}/functions/v1/payfast-notify`;

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

    paymentData.signature = generatePayFastSignature(paymentData, PASSPHRASE);

    const paymentUrl = "https://www.payfast.co.za/eng/process";

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