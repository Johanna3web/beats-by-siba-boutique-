import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <img src={logo} alt="Beats by Siba" className="h-16 w-auto brightness-0 invert mb-4" />
          <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
            Premium, high quality hair made to elevate your look. Quality is the standard, confidence is the result.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg mb-4">Shop</h4>
          <div className="flex flex-col gap-2 font-body text-sm text-primary-foreground/60">
            <Link to="/shop?cat=wigs" className="hover:text-primary-foreground transition-colors">Wigs</Link>
            <Link to="/shop?cat=bundles" className="hover:text-primary-foreground transition-colors">Bundles</Link>
            <Link to="/shop?cat=closures" className="hover:text-primary-foreground transition-colors">Closures</Link>
            <Link to="/shop?cat=frontals" className="hover:text-primary-foreground transition-colors">Frontals</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg mb-4">Help</h4>
          <div className="flex flex-col gap-2 font-body text-sm text-primary-foreground/60">
            <Link to="/faq" className="hover:text-primary-foreground transition-colors">FAQs</Link>
            <Link to="/hair-care" className="hover:text-primary-foreground transition-colors">Hair Care Guide</Link>
            <Link to="/track-order" className="hover:text-primary-foreground transition-colors">Track Your Order</Link>
            <Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact Us</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg mb-4">Contact</h4>
          <div className="flex flex-col gap-2 font-body text-sm text-primary-foreground/60">
            <span>📞 064 709 9067</span>
            <span>✉️ johannasegoapa@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center font-body text-xs text-primary-foreground/40 tracking-wider">
        © 2026 Beats by Siba – Hair Edition. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
