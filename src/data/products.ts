export interface Product {
  id: string;
  name: string;
  category: "wigs" | "bundles" | "closures" | "frontals";
  price: number;
  image: string;
  description: string;
  lengths?: string[];
  features: string[];
}

export const products: Product[] = [
  {
    id: "body-wave-wig",
    name: "Body Wave Lace Front Wig",
    category: "wigs",
    price: 2899,
    image: "/assets/wig-bodywave.jpg",
    description: "Luxurious body wave wig with a natural-looking lace front. Pre-plucked hairline with baby hairs for the most seamless, undetectable finish.",
    lengths: ["14\"", "16\"", "18\"", "20\"", "22\"", "24\"", "26\""],
    features: ["100% Human Hair", "HD Lace Front", "Pre-plucked Hairline", "150% Density", "Can Be Dyed & Styled"],
  },
  {
    id: "deep-wave-wig",
    name: "Deep Wave Curly Wig",
    category: "wigs",
    price: 3199,
    image: "/assets/wig-deepwave.webp",
    description: "Gorgeous deep wave texture that holds its curl pattern beautifully. Perfect for a voluminous, glamorous look that lasts.",
    lengths: ["16\"", "18\"", "20\"", "22\"", "24\"", "26\"", "28\""],
    features: ["100% Human Hair", "13x4 Lace Front", "Bleached Knots", "180% Density", "Tangle-Free"],
  },
  {
    id: "blonde-bob-wig",
    name: "613 Blonde Straight Bob Wig",
    category: "wigs",
    price: 2499,
    image: "/assets/wig-blonde.jpg",
    description: "A chic platinum blonde bob that makes a statement. Silky straight texture with a flawless lace front for a natural look.",
    lengths: ["10\"", "12\"", "14\"", "16\""],
    features: ["100% Human Hair", "613 Blonde", "Bob Cut", "150% Density", "Heat Friendly"],
  },
  {
    id: "curly-headband-wig",
    name: "Curly Headband Wig",
    category: "wigs",
    price: 1899,
    image: "/assets/wig-curly-headband.jpg",
    description: "Easy-to-wear curly headband wig — no glue, no lace, no fuss. Simply slip on and go for instant gorgeous curls.",
    lengths: ["12\"", "14\"", "16\"", "18\""],
    features: ["100% Human Hair", "Glueless", "Headband Included", "Beginner Friendly", "Natural Density"],
  },
  {
    id: "kinky-curly-wig",
    name: "Kinky Curly Lace Front Wig",
    category: "wigs",
    price: 3499,
    image: "/assets/wig-kinky-curly.webp",
    description: "Bold, voluminous kinky curly texture for a fierce, natural look. Premium quality hair that blends seamlessly with your own.",
    lengths: ["18\"", "20\"", "22\"", "24\"", "26\""],
    features: ["100% Human Hair", "13x6 Lace Front", "Pre-plucked", "200% Density", "Natural Texture"],
  },
  {
    id: "straight-bundles",
    name: "Straight Hair Bundles",
    category: "bundles",
    price: 1299,
    image: "/assets/model2.jpeg",
    description: "Silky straight bundles crafted from premium virgin hair. Minimal shedding and easy to maintain for a sleek everyday look.",
    lengths: ["12\"", "14\"", "16\"", "18\"", "20\"", "22\"", "24\""],
    features: ["100% Virgin Hair", "Double Weft", "No Shedding", "Can Be Dyed", "3 Bundles per Pack"],
  },
  {
    id: "honey-blonde-bundles",
    name: "Honey Blonde Bundles",
    category: "bundles",
    price: 1599,
    image: "/assets/model3.jpeg",
    description: "Warm honey blonde bundles that add a sun-kissed glow. Perfect for creating dimensional, luxurious styles.",
    lengths: ["14\"", "16\"", "18\"", "20\"", "22\""],
    features: ["100% Human Hair", "Pre-Colored", "Soft Texture", "Minimal Maintenance", "3 Bundles per Pack"],
  },
  {
    id: "hd-lace-closure",
    name: "HD Lace Closure 5x5",
    category: "closures",
    price: 999,
    image: "/assets/model4.jpeg",
    description: "Invisible HD lace closure that melts into any skin tone. Create a flawless, natural-looking part with ease.",
    lengths: ["12\"", "14\"", "16\"", "18\""],
    features: ["HD Invisible Lace", "5x5 Size", "Pre-plucked", "Bleached Knots", "Natural Hairline"],
  },
  {
    id: "frontal-13x4",
    name: "13x4 Lace Frontal",
    category: "frontals",
    price: 1499,
    image: "/assets/model1.jpeg",
    description: "Full coverage 13x4 lace frontal for versatile styling. Part anywhere and style with complete freedom.",
    lengths: ["14\"", "16\"", "18\"", "20\""],
    features: ["Swiss Lace", "13x4 Coverage", "Pre-plucked", "Baby Hairs", "Ear to Ear"],
  },
];

export const categories = [
  { id: "all", label: "All Products" },
  { id: "wigs", label: "Wigs" },
  { id: "bundles", label: "Bundles" },
  { id: "closures", label: "Closures" },
  { id: "frontals", label: "Frontals" },
];
