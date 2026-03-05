import wigMain from "@/assets/wig-straight-main.jpg";
import wigSide from "@/assets/wig-straight-side.jpg";
import wigDetails from "@/assets/wig-straight-details.jpg";
import wigLace from "@/assets/wig-straight-lace.jpg";

export interface LengthVariant {
  length: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: "wigs" | "bundles" | "closures" | "frontals";
  price: number; // base price (smallest length)
  images: string[];
  image: string; // main image for cards
  description: string;
  lengths?: LengthVariant[];
  features: string[];
}

export const products: Product[] = [
  {
    id: "premium-5x5-hd-lace-wig",
    name: "Premium Selection 5x5 HD Lace Wig",
    category: "wigs",
    price: 3620,
    image: wigMain,
    images: [wigMain, wigSide, wigDetails, wigLace],
    description:
      "Ultra-luxurious straight wig with an invisible 5x5 HD lace closure that melts seamlessly into any skin tone. Pre-plucked hairline with baby hairs for a flawless, undetectable finish. Features an adjustable band for a perfect, snug fit every time.",
    lengths: [
      { length: '10"', price: 3620 },
      { length: '12"', price: 3900 },
      { length: '14"', price: 4100 },
      { length: '16"', price: 4480 },
      { length: '18"', price: 4700 },
      { length: '20"', price: 5520 },
      { length: '22"', price: 5800 },
      { length: '24"', price: 6520 },
      { length: '26"', price: 6700 },
      { length: '28"', price: 7450 },
      { length: '30"', price: 7800 },
    ],
    features: [
      "100% Human Hair",
      "5x5 HD Lace Closure",
      "Swiss HD Lace",
      "Pre-plucked Hairline",
      "Adjustable Band",
      "Perfect Fit",
      "Can Be Dyed & Styled",
    ],
  },
];

export const categories = [
  { id: "all", label: "All Products" },
  { id: "wigs", label: "Wigs" },
];
