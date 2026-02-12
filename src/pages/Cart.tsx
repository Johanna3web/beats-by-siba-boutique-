import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-24 container mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl mb-6">Your Cart</h1>
          <p className="font-body text-sm text-muted-foreground mb-8">Your cart is empty.</p>
          <Link
            to="/shop"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-foreground transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-5xl text-center mb-12">Your Cart</h1>

          <div className="space-y-6 mb-12">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-6 border-b border-border pb-6">
                <Link to={`/product/${item.product.id}`} className="w-24 h-32 flex-shrink-0 bg-secondary overflow-hidden">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading text-xl">{item.product.name}</h3>
                      {item.selectedLength && (
                        <p className="font-body text-xs text-muted-foreground mt-1">Length: {item.selectedLength}</p>
                      )}
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 border border-border">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-secondary">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 hover:bg-secondary">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-body text-sm font-semibold">R{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex justify-between items-center mb-8">
              <span className="font-heading text-2xl">Total</span>
              <span className="font-heading text-3xl text-gold">R{total.toLocaleString()}</span>
            </div>
            <p className="font-body text-xs text-muted-foreground text-center mb-6">
              Checkout with live payments will be available once PayFast is connected.
            </p>
            <button
              className="w-full py-4 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-foreground transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
