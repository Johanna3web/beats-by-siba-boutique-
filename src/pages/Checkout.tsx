import { useState } from "react";
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

const SHIPPING_COST = 150; // R150 flat rate

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingProvince: "",
    shippingPostalCode: "",
  });

  const grandTotal = total + SHIPPING_COST;

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
        shippingCost: SHIPPING_COST,
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

      // Create and submit a form to PayFast
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
                    className="w-full border border-border bg-background px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
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
                  <span>Shipping</span>
                  <span>R{SHIPPING_COST.toLocaleString()}</span>
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
