import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import model1 from "@/assets/model1.jpeg";

const About = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src={model1} alt="About Beats by Siba" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/60" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative font-heading text-5xl md:text-7xl text-primary-foreground"
        >
          Our Story
        </motion.h1>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold">Beats by Siba – Hair Edition</p>
            
            <p className="font-heading text-2xl leading-relaxed italic">
              "Hair Edition is all about premium, high quality hair made to elevate your look. Our collections are carefully sourced for softness, longevity, and a flawless natural finish."
            </p>

            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              At Beats by Siba, we believe every woman deserves to feel extraordinary. Born from a deep passion for beauty and self-expression, Hair Edition was created to bring premium quality hair to women who refuse to settle for anything less than the best.
            </p>

            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Every strand in our collection is meticulously sourced and quality-tested to ensure softness that lasts, a natural finish that blends seamlessly, and durability that keeps you looking flawless day after day. Whether you prefer sleek and straight, bold and curly, or something in between — we have the perfect match for your unique style.
            </p>

            <p className="font-heading text-2xl leading-relaxed italic">
              "Whether you're going for everyday beauty or full glam, our hair delivers luxury you can see and feel. At Beats by Siba, quality is the standard and confidence is the result."
            </p>

            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              We don't just sell hair — we deliver confidence. When you wear Beats by Siba, you're wearing a promise of excellence. Our commitment to quality means you can style, heat, colour, and live freely knowing your hair will keep up with every moment.
            </p>

            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Welcome to the Hair Edition. Welcome to your most confident self.
            </p>

            <div className="w-16 h-px bg-gold" />
          </motion.div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
);

export default About;
