import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Package, Truck, CheckCircle } from "lucide-react";

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-3">Order Status</p>
            <h1 className="font-heading text-5xl">Track Your Order</h1>
            <p className="font-body text-sm text-muted-foreground mt-4">
              Enter your order number or tracking number to check your delivery status.
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex gap-3 mb-16">
            <input
              type="text"
              placeholder="Enter order or tracking number"
              value={trackingNumber}
              onChange={(e) => { setTrackingNumber(e.target.value); setSearched(false); }}
              required
              className="flex-1 border border-border bg-transparent px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-foreground transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {searched && (
            <div className="bg-cream p-8 text-center">
              <p className="font-heading text-2xl mb-3">Order Tracking</p>
              <p className="font-body text-sm text-muted-foreground mb-8">
                Live order tracking will be available once the store is connected to a payment and shipping provider. 
                For now, please contact us at <a href="mailto:johannasegoapa@gmail.com" className="text-gold underline">johannasegoapa@gmail.com</a> with your order details.
              </p>
              
              {/* Placeholder status steps */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {[
                  { icon: Package, label: "Processing" },
                  { icon: Truck, label: "Shipped" },
                  { icon: CheckCircle, label: "Delivered" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground">
                    <s.icon className="w-5 h-5" />
                    <span className="font-body text-xs uppercase tracking-wider">{s.label}</span>
                    {i < 2 && <div className="w-8 h-px bg-border hidden sm:block" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderTracking;
