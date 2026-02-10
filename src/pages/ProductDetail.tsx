import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { ChevronLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedLength, setSelectedLength] = useState<string>("");

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-24 container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-gold underline">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <Link to="/shop" className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground mb-8">
            <ChevronLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-[3/4] overflow-hidden bg-secondary">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-gold mb-2">{product.category}</p>
              <h1 className="font-heading text-4xl md:text-5xl mb-4">{product.name}</h1>
              <p className="font-heading text-3xl text-gold mb-6">R{product.price.toLocaleString()}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {product.lengths && (
                <div className="mb-8">
                  <p className="font-body text-xs uppercase tracking-[0.15em] mb-3">Length</p>
                  <div className="flex flex-wrap gap-2">
                    {product.lengths.map((l) => (
                      <button
                        key={l}
                        onClick={() => setSelectedLength(l)}
                        className={`px-4 py-2 border font-body text-xs transition-colors ${
                          selectedLength === l
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-foreground"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => addItem(product, selectedLength)}
                className="w-full py-4 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-foreground transition-colors mb-8"
              >
                Add to Cart
              </button>

              <div>
                <p className="font-body text-xs uppercase tracking-[0.15em] mb-3">Features</p>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="font-body text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
