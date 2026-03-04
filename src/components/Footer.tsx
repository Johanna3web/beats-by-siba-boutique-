import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { toast } from "sonner";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 3.76.92V6.69Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link to="/">
            <img src={logo} alt="Beats by Siba" className="h-20 w-auto brightness-0 invert mb-4 hover:opacity-80 transition-opacity cursor-pointer" />
          </Link>
          <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">
            Premium, high quality hair made to elevate your look. Quality is the standard, confidence is the result.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.tiktok.com/@beats.by.siba?_r=1&_t=ZS-93rBYe8tmhZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <TikTokIcon />
            </a>
            <button
              onClick={() => toast.info("Coming soon!")}
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <InstagramIcon />
            </button>
          </div>
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
            <span>📞 +27 624728033</span>
            <span>✉️ blessingmqikela8@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
        <p className="font-body text-xs text-primary-foreground/40 tracking-wider">
          © 2026 Beats by Siba – Hair Edition. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
