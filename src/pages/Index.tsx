import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import model1 from "@/assets/model1.jpeg";
import model2 from "@/assets/model2.jpeg";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />

    {/* Brand message */}
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-6">Our Promise</p>
          <p className="font-heading text-2xl md:text-3xl leading-relaxed italic text-foreground/80">
            "Beats by Siba Hair Edition is all about premium, high quality hair made to elevate your look. Our collections are carefully sourced for softness, longevity, and a flawless natural finish. Whether you're going for everyday beauty or full glam, our hair delivers luxury you can see and feel."
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-8" />
        </motion.div>
      </div>
    </section>

    <FeaturedProducts />

    {/* Categories */}
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-3">Collections</p>
          <h2 className="font-heading text-4xl md:text-5xl">Shop by Category</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Wigs", img: model1, cat: "wigs" },
            { label: "Bundles", img: model2, cat: "bundles" },
          ].map((c) => (
            <Link key={c.cat} to={`/shop?cat=${c.cat}`} className="group relative aspect-[4/3] overflow-hidden">
              <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/30 transition-colors flex items-center justify-center">
                <span className="font-heading text-4xl text-primary-foreground">{c.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Index;
