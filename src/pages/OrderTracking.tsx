import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

interface OrderData {
  order_number: string;
  order_status: OrderStatus;
  payment_status: string;
  tracking_number: string | null;
  created_at: string;
  customer_name: string;
  total: number;
}

const statusSteps: { key: OrderStatus; icon: typeof Package; label: string }[] = [
  { key: "processing", icon: Clock, label: "Processing" },
  { key: "shipped", icon: Truck, label: "Shipped" },
  { key: "delivered", icon: CheckCircle, label: "Delivered" },
];

const getStepIndex = (status: OrderStatus) => {
  if (status === "cancelled") return -1;
  return statusSteps.findIndex((s) => s.key === status);
};

const OrderTracking = () => {
  const [trackingInput, setTrackingInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackingInput.trim();
    if (!query) return;

    setLoading(true);
    setOrder(null);
    setNotFound(false);

    try {
      // Search by order number or tracking number
      const { data, error } = await supabase
        .from("orders")
        .select("order_number, order_status, payment_status, tracking_number, created_at, customer_name, total")
        .or(`order_number.eq.${query},tracking_number.eq.${query}`)
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setOrder(data as OrderData);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error("Order tracking error:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const activeStep = order ? getStepIndex(order.order_status) : -1;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-3">Order Status</p>
            <h1 className="font-heading text-5xl">Track Your Order</h1>
            <p className="font-body text-sm text-muted-foreground mt-4">
              Enter your order number (e.g. BBS-000001) or tracking number to check your delivery status.
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex gap-3 mb-16">
            <input
              type="text"
              placeholder="Enter order or tracking number"
              value={trackingInput}
              onChange={(e) => { setTrackingInput(e.target.value); setNotFound(false); }}
              required
              className="flex-1 border border-border bg-transparent px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-foreground transition-colors disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {loading && (
            <div className="text-center">
              <p className="font-body text-sm text-muted-foreground">Searching...</p>
            </div>
          )}

          {notFound && (
            <div className="bg-cream p-8 text-center">
              <p className="font-heading text-2xl mb-3">Order Not Found</p>
              <p className="font-body text-sm text-muted-foreground">
                We couldn't find an order with that number. Please double-check and try again, or contact us at{" "}
                <a href="mailto:blessingmqikela8@gmail.com" className="text-gold underline">blessingmqikela8@gmail.com</a>.
              </p>
            </div>
          )}

          {order && (
            <div className="bg-cream p-8">
              <div className="text-center mb-8">
                <p className="font-heading text-2xl mb-2">{order.order_number}</p>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                  Placed on {new Date(order.created_at).toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <p className="font-body text-sm mt-1">
                  Total: <span className="text-gold font-semibold">R{order.total.toLocaleString()}</span>
                </p>
                {order.tracking_number && (
                  <p className="font-body text-xs text-muted-foreground mt-2">
                    Tracking: <span className="text-foreground">{order.tracking_number}</span>
                  </p>
                )}
              </div>

              {order.order_status === "cancelled" ? (
                <div className="text-center">
                  <p className="font-body text-sm text-destructive font-semibold uppercase tracking-wider">Order Cancelled</p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {statusSteps.map((s, i) => {
                    const isActive = i <= activeStep;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`flex items-center gap-2 ${isActive ? "text-gold" : "text-muted-foreground"}`}>
                          <s.icon className="w-5 h-5" />
                          <span className="font-body text-xs uppercase tracking-wider">{s.label}</span>
                        </div>
                        {i < statusSteps.length - 1 && (
                          <div className={`w-8 h-px hidden sm:block ${i < activeStep ? "bg-gold" : "bg-border"}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderTracking;
