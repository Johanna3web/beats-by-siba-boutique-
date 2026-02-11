import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact", {
        body: form,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-3">Get in Touch</p>
            <h1 className="font-heading text-5xl">Contact Us</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <div className="space-y-8">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Have a question about your order, need product advice, or just want to say hello? We'd love to hear from you.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="font-body text-sm">+27 624728033</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gold" />
                  <a href="mailto:blessingmqikela8@gmail.com" className="font-body text-sm hover:text-gold transition-colors">
                    blessingmqikela8@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="font-heading text-2xl mb-4">Shipping & Returns</h3>
                <div className="font-body text-sm text-muted-foreground space-y-3 leading-relaxed">
                  <p>Orders are processed within 1–2 business days. Standard shipping is free within South Africa; international shipping fees apply.</p>
                  <p>Delivery: 3–7 business days locally, 7–21 days internationally.</p>
                  <p>We accept returns/exchanges within 14 days if the product is unopened and in original condition. Custom orders are final sale.</p>
                  <p>Refunds are processed within 5–7 business days after receiving the returned item. Shipping costs are non-refundable except for damaged or incorrect items.</p>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="bg-cream p-12 text-center">
                  <p className="font-heading text-3xl mb-4">Thank You!</p>
                  <p className="font-body text-sm text-muted-foreground">We've received your message and will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-[0.15em] block mb-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-border bg-transparent px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-primary-foreground font-body text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-foreground transition-colors disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
