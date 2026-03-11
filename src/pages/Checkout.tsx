import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SA_PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

const SHIPPING_URBAN = 180;
const SHIPPING_RURAL = 250;

// Major urban postal code ranges in South Africa
const URBAN_POSTAL_CODES = new Set([
  // Johannesburg / Gauteng
  ...Array.from({length: 100}, (_, i) => String(2000 + i)),
  ...Array.from({length: 100}, (_, i) => String(1600 + i)),
  ...Array.from({length: 50}, (_, i) => String(1400 + i)),
  // Pretoria
  ...Array.from({length: 100}, (_, i) => String(0001 + i).padStart(4, '0')),
  ...Array.from({length: 50}, (_, i) => String(0100 + i).padStart(4, '0')),
  // Cape Town / Western Cape
  ...Array.from({length: 100}, (_, i) => String(7400 + i)),
  ...Array.from({length: 100}, (_, i) => String(7500 + i)),
  ...Array.from({length: 100}, (_, i) => String(7600 + i)),
  ...Array.from({length: 100}, (_, i) => String(7700 + i)),
  ...Array.from({length: 100}, (_, i) => String(7800 + i)),
  ...Array.from({length: 100}, (_, i) => String(7900 + i)),
  ...Array.from({length: 100}, (_, i) => String(8000 + i)),
  // Durban / KZN
  ...Array.from({length: 100}, (_, i) => String(4000 + i)),
  ...Array.from({length: 100}, (_, i) => String(3600 + i)),
  ...Array.from({length: 100}, (_, i) => String(3900 + i)),
  // Port Elizabeth / Gqeberha
  ...Array.from({length: 100}, (_, i) => String(6000 + i)),
  ...Array.from({length: 50}, (_, i) => String(6200 + i)),
  // East London
  ...Array.from({length: 50}, (_, i) => String(5200 + i)),
  // Bloemfontein
  ...Array.from({length: 50}, (_, i) => String(9300 + i)),
  // Nelspruit
  ...Array.from({length: 30}, (_, i) => String(1200 + i)),
  // Polokwane
  ...Array.from({length: 30}, (_, i) => String(0699 + i).padStart(4, '0')),
  // Specific known urban codes
  "7441", "7784", "7945", "8001", "8005", "7925", "7130", "7140",
  "7441", "7580", "7550", "7560", "7570", "7100", "7110", "7120",
  "2193", "2090", "2091", "2092", "2094", "2195", "2196", "2197",
  "2001", "2010", "2017", "2018", "2019", "2021", "2024", "2025",
  "0002", "0007", "0028", "0040", "0044", "0050", "0081", "0082",
  "4001", "4052", "4060", "4091", "3615", "3629", "3610",
]);

function detectAreaType(postalCode: string): "urban" | "rural" | null {
  if (!postalCode || postalCode.length < 4) return null;
  const code = postalCode.trim().padStart(4, '0');
  return URBAN_POSTAL_CODES.has(code) ? "urban" : "rural";
}

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [areaType, setAreaType] = useState<"urban" | "rural">("urban");
  const [areaDetected, setAreaDetected] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingProvince: "",
    shippingPostalCode: "",
  });

  const shippingCost = areaType === "urban" ? SHIPPING_URBAN : SHIPPING_RURAL;
  const grandTotal = total + shippingCost;

  // Auto-detect area type when postal code changes
  useEffect(() => {
    if (form.shippingPostalCode.length === 4) {
      const detected = detectAreaType(form.shippingPostalCode);
      if (detected) {
        setAreaType(detected);
        setAreaDetected(true);
      } else {
        setAreaDetected(false);
      }
    } else {
      setAreaDetected(false);
    }
  }, [form.shippingPostalCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      const payload = {
        ...form,
        shippingCost,
        items: items.map((item) => {
          const unitPrice = item.selectedLength
            ? item.product.lengths?.find((l) => l.length === item.selectedLength)?.price ?? item.product.price
            : item.product.price;
          return {
            productId: item.product.id,
            productName: item.product.name,
            productImage: item.product.image,
            quantity: item.quantity,
            unitPrice,
            selectedLength: item.selectedLength,
          };
        }),
      };

      const { data, error } = await supabase.functions.invoke("create-payfast-payment", {
        body: payload,
      });

      if (error) throw error;
      if (!data?.paymentUrl || !data?.paymentData) throw new Error("Invalid payment response");

      const pfForm = document.createElement("form");
      pfForm.method = "POST";
      pfForm.action = data.paymentUrl;

      Object.entries(data.paymentData as Record<string, string>).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        pfForm.appendChild(input);
      });

      document.body.appendChild(pfForm);
      clearCart();
      pfForm.submit();
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="font-heading text-5xl text-center mb-12">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Shipping Form */}
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-heading text-2xl mb-2">Shipping Details</h2>

              <div>
                <label className="font-body text-xs uppercase tracking-[0.15em] block mb-1">Full Name *</label>
                <input
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <label className="font-body text-xs uppercase tracking-[0.15em] block mb-1">Email *</label>
                <input
                  name="customerEmail"
                  type="email"
                  value={form.customerEmail}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <label className="font-body text-xs uppercase tracking-[0.15em] block mb-1">Phone</label>
                <input
                  name="customerPhone"
                  type="tel"
                  value={form.customerPhone}
                  onChange={handleChange}
                  maxLength={20}
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div>
                <label className="font-body text-xs uppercase tracking-[0.15em] block mb-1">Street Address *</label>
                <input
                  name="shippingAddress"
                  value={form.shippingAddress}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] block mb-1">City *</label>
                  <input
                    name="shippingCity"
                    value={form.shippingCity}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div>
                  <label className="font-body text-xs uppercase tracking-[0.15em] block mb-1">Postal Code *</label>
                  <input
                    name="shippingPostalCode"
                    value={form.shippingPostalCode}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    placeholder="e.g. 8001"
                    className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                  {areaDetected && (
                    <p className={`text-xs mt-1 font-body ${areaType === "urban" ? "text-green-600" : "text-orange-500"}`}>
                      {areaType === "urban" ? "✓ Urban area detected — R180 shipping" : "✓ Rural area detected — R250 shipping"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="font-body text-xs uppercase tracking-[0.15em] block mb-1">Province *</label>
                <select
                  name="shippingProvince"
                  value={form.shippingProvince}
                  onChange={handleChange}
                  required
                  className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                >
                  <option value="">Select Province</option>
                  {SA_PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-body text-xs uppercase tracking-[0.15em] block mb-2">Area Type *</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => { setAreaType("urban"); setAreaDetected(false); }}
                    className={`flex-1 py-3 border font-body text-xs uppercase tracking-[0.15em] transition-colors ${
                      areaType === "urban"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    Urban — R{SHIPPING_URBAN}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAreaType("rural"); setAreaDetected(false); }}
                    className={`flex-1 py-3 border font-body text-xs uppercase tracking-[0.15em] transition-colors ${
                      areaType === "rural"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    Rural — R{SHIPPING_RURAL}
                  </button>
                </div>
                {areaDetected && (
                  <p className="text-xs mt-2 font-body text-muted-foreground">
                    Auto-detected from postal code. You can override above if needed.
                  </p>
                )}
              </div>
            </form>

            {/* Order Summary */}
            <div>
              <h2 className="font-heading text-2xl mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => {
                  const itemPrice = item.selectedLength
                    ? item.product.lengths?.find((l) => l.length === item.selectedLength)?.price ?? item.product.price
                    : item.product.price;
                  return (
                    <div key={`${item.product.id}-${item.selectedLength}`} className="flex gap-4 border-b border-border pb-4">
                      <div className="w-16 h-20 flex-shrink-0 bg-secondary overflow-hidden">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-sm font-medium">{item.product.name}</p>
                        {item.selectedLength && (
                          <p className="font-body text-xs text-muted-foreground">Length: {item.selectedLength}</p>
                        )}
                        <p className="font-body text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-body text-sm font-semibold">R{(itemPrice * item.quantity).toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between font-body text-sm">
                  <span>Subtotal</span>
                  <span>R{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span>Shipping ({areaType})</span>
                  <span>R{shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-heading text-2xl pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-gold">R{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full mt-8 py-4 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-foreground transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : `Pay R${grandTotal.toLocaleString()} with PayFast`}
              </button>

              <p className="font-body text-[10px] text-muted-foreground text-center mt-4">
                You will be redirected to PayFast to complete your payment securely.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;