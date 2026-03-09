import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-24 container mx-auto px-4 text-center max-w-lg">
        <XCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
        <h1 className="font-heading text-4xl mb-4">Payment Cancelled</h1>
        <p className="font-body text-sm text-muted-foreground mb-8">
          Your payment was cancelled. No charges have been made. Your cart items are still available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/cart"
            className="px-8 py-3 border border-border font-body text-xs uppercase tracking-[0.2em] hover:border-foreground transition-colors"
          >
            Return to Cart
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-foreground transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentCancel;
