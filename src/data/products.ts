import wigMain from "@/assets/wig-straight-main.jpg";
import wigSide from "@/assets/wig-straight-side.jpg";
import wigDetails from "@/assets/wig-straight-details.jpg";
import wigLace from "@/assets/wig-straight-lace.jpg";

import wig13x4Main from "@/assets/wig-13x4-main.jpg";
import wig13x4Side from "@/assets/wig-13x4-side.jpg";
import wig13x4Cap from "@/assets/wig-13x4-cap.jpg";
import wig13x4Lace from "@/assets/wig-13x4-lace.jpg";

export interface LengthVariant {
  length: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: "wigs" | "bundles" | "closures" | "frontals";
  price: number;
  images: string[];
  image: string;
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
  {
    id: "premium-13x4-hd-lace-wig",
    name: "Premium Selection 13x4 HD Lace Wig",
    category: "wigs",
    price: 4300,
    image: wig13x4Main,
    images: [wig13x4Main, wig13x4Side, wig13x4Cap, wig13x4Lace],
    description:
      "Stunning straight wig with a full 13x4 HD lace frontal for maximum versatility and a seamless, natural-looking hairline. Pre-bleached knots and pre-plucked for an undetectable finish right out of the box. Perfect for any parting style — side, middle, or swept back.",
    lengths: [
      { length: '10"', price: 4300 },
      { length: '12"', price: 4480 },
      { length: '14"', price: 4700 },
      { length: '16"', price: 5280 },
      { length: '18"', price: 5550 },
      { length: '20"', price: 5850 },
      { length: '22"', price: 6700 },
      { length: '24"', price: 6900 },
      { length: '26"', price: 7300 },
      { length: '28"', price: 7600 },
      { length: '30"', price: 7850 },
    ],
    features: [
      "100% Human Hair",
      "13x4 HD Lace Frontal",
      "Pre-bleached Knots",
      "Pre-plucked Hairline",
      "Adjustable Band",
      "Versatile Parting",
      "Can Be Dyed & Styled",
    ],
  },
];

export const categories = [
  { id: "all", label: "All Products" },
  { id: "wigs", label: "Wigs" },
];
