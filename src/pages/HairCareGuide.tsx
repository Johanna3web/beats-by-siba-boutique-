import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Straight Hair Care",
    tips: [
      "Wash with sulfate-free shampoo every 7–10 days to maintain silkiness.",
      "Apply a lightweight conditioner from mid-length to tips. Avoid the roots.",
      "Use a heat protectant spray before flat ironing or blow drying.",
      "Store on a wig stand or in a silk/satin bag to prevent tangling.",
      "Brush gently with a wide-tooth comb starting from the ends.",
    ],
  },
  {
    title: "Body Wave / Loose Wave Care",
    tips: [
      "Finger-detangle before washing to minimise shedding.",
      "Wash gently in a downward motion — never bunch or scrub.",
      "Apply a leave-in conditioner and scrunch to revive the wave pattern.",
      "Air dry whenever possible to maintain the natural wave texture.",
      "Sleep on a satin pillowcase or wrap hair in a satin scarf at night.",
    ],
  },
  {
    title: "Curly / Deep Wave Care",
    tips: [
      "Co-wash (conditioner-only wash) between shampoo days to retain moisture.",
      "Use a curl-defining cream or mousse while hair is still damp.",
      "Detangle gently with fingers or a wide-tooth comb when saturated with conditioner.",
      "Avoid brushing when dry to prevent frizz and disrupting the curl pattern.",
      "Deep condition every 2 weeks to keep curls soft, bouncy, and defined.",
    ],
  },
  {
    title: "Wig Care & Longevity",
    tips: [
      "Remove your wig at night and store it on a mannequin head or wig stand.",
      "Wash every 6–8 wears or when product build-up is noticeable.",
      "Let the wig air dry on a stand — avoid wringing or twisting.",
      "Use a wig-specific detangling spray for daily styling.",
      "Avoid sleeping, showering, or swimming while wearing your wig.",
    ],
  },
  {
    title: "General Tips for All Hair Types",
    tips: [
      "Always use sulfate-free and alcohol-free products.",
      "Keep heat styling to a minimum — 150–180°C is ideal.",
      "Apply natural oils (argan, coconut, or jojoba) to the ends for moisture.",
      "Wrap or braid hair before bed to prevent tangling.",
      "Schedule regular trims to keep ends healthy and fresh.",
    ],
  },
];

const HairCareGuide = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-28 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-gold mb-3">Expert Advice</p>
          <h1 className="font-heading text-5xl">Hair Care Guide</h1>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
            Proper care ensures your premium hair lasts longer and looks flawless every day. Follow these expert tips for each hair type.
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-heading text-3xl mb-6">{s.title}</h2>
              <ul className="space-y-3">
                {s.tips.map((t, i) => (
                  <li key={i} className="flex gap-3 font-body text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-gold flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default HairCareGuide;
