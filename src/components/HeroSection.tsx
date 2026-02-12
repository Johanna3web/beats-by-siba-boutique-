import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "@/assets/model1.jpeg";

const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Beats by Siba" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
    </div>
    <div className="relative z-10 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl"
      >
        <p className="font-body text-xs uppercase tracking-[0.3em] text-champagne mb-4">
          Premium Hair Collection
        </p>
        <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground leading-[1.1] mb-6">
          Luxury You Can <span className="italic">See & Feel</span>
        </h1>
        <p className="font-body text-sm text-primary-foreground/80 leading-relaxed mb-8 max-w-md">
          Carefully sourced for softness, longevity, and a flawless natural finish. 
          Quality is the standard — confidence is the result.
        </p>
        <Link
          to="/shop"
          className="inline-block px-10 py-4 bg-gold text-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-champagne transition-colors"
        >
          Shop Now
        </Link>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
