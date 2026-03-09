import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-24 container mx-auto px-4 text-center max-w-lg">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="font-heading text-4xl mb-4">Payment Successful!</h1>
        <p className="font-body text-sm text-muted-foreground mb-2">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        {orderNumber && (
          <p className="font-body text-sm mb-8">
            Order number: <span className="font-semibold text-gold">{orderNumber}</span>
          </p>
        )}
        <p className="font-body text-xs text-muted-foreground mb-8">
          A confirmation email will be sent to you shortly. You can track your order using the order number above.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={orderNumber ? `/track-order?order=${orderNumber}` : "/track-order"}
            className="px-8 py-3 border border-border font-body text-xs uppercase tracking-[0.2em] hover:border-foreground transition-colors"
          >
            Track Order
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

export default PaymentSuccess;
