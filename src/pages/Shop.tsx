import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const [active, setActive] = useState(initialCat);

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-3">Collections</p>
            <h1 className="font-heading text-5xl">Shop</h1>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`font-body text-xs uppercase tracking-[0.2em] px-6 py-3 border transition-colors ${
                  active === c.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
