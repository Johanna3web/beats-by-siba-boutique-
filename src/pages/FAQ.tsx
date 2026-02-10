import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What type of hair do you sell?", a: "We sell 100% premium human hair including wigs, bundles, closures, and frontals in various textures — straight, body wave, deep wave, curly, and more." },
  { q: "Is the hair 100% human hair?", a: "Yes! All of our hair is 100% unprocessed virgin human hair, sourced from the finest suppliers to ensure premium quality, softness, and longevity." },
  { q: "How long does the hair last?", a: "With proper care, our hair can last 12 months to 2 years or more. We provide a detailed Hair Care Guide to help you maintain your investment." },
  { q: "Can the hair be dyed, bleached, or heat styled?", a: "Absolutely. Our virgin human hair can be dyed, bleached, curled, straightened, and styled just like your natural hair. We recommend professional colouring for the best results." },
  { q: "How should I care for my hair to maintain quality?", a: "Use sulfate-free shampoo and conditioner, minimise heat styling, sleep on a satin pillowcase, and deep condition regularly. Visit our Hair Care Guide for detailed instructions." },
  { q: "How long does shipping take?", a: "Orders are processed within 1–2 business days. Standard delivery within South Africa takes 3–7 business days. International shipping takes 7–21 business days depending on destination." },
  { q: "Do you offer returns or exchanges?", a: "We accept returns or exchanges within 14 days of delivery if the product is unopened and in its original condition. Custom or personalised orders are final sale. Contact us at johannasegoapa@gmail.com to initiate a return." },
  { q: "How can I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can also visit our Track Your Order page and enter your order number or tracking number to see live delivery status." },
];

const FAQ = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-3">Need Help?</p>
          <h1 className="font-heading text-5xl">FAQs</h1>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border px-6">
              <AccordionTrigger className="font-body text-sm font-medium text-left py-5 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="font-body text-sm text-muted-foreground pb-5 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
    <Footer />
  </div>
);

export default FAQ;
