import wigMain from "@/assets/wig-straight-main.jpg";
import wigSide from "@/assets/wig-straight-side.jpg";
import wigDetails from "@/assets/wig-straight-details.jpg";
import wigLace from "@/assets/wig-straight-lace.jpg";

import wig13x4Main from "@/assets/wig-13x4-main.jpg";
import wig13x4Side from "@/assets/wig-13x4-side.jpg";
import wig13x4Cap from "@/assets/wig-13x4-cap.jpg";
import wig13x4Lace from "@/assets/wig-13x4-lace.jpg";

import wigBurmeseMain from "@/assets/wig-burmese-main.jpg";
import wigBurmeseSide from "@/assets/wig-burmese-side.jpg";
import wigBurmeseCap from "@/assets/wig-burmese-cap.jpg";
import wigBurmeseVideo from "@/assets/wig-burmese-video.mp4";

import wigBodywaveMain from "@/assets/wig-bodywave-main.jpg";
import wigBodywaveSide from "@/assets/wig-bodywave-side.jpg";
import wigBodywaveVideo from "@/assets/wig-bodywave-video.mp4";

import wigColourPlum from "@/assets/wig-colour-plum.jpg";
import wigColourOmbreDark from "@/assets/wig-colour-ombre-dark.jpg";
import wigColourOmbreBrown from "@/assets/wig-colour-ombre-brown.jpg";

import bundlesKinkyCurly from "@/assets/bundles-kinky-curly.jpg";
import bundlesDeepWave from "@/assets/bundles-deep-wave.jpg";

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
  video?: string;
  lengths?: LengthVariant[];
  features: string[];
}

export const products: Product[] = [
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
  {
    id: "burmese-curls-13x4-hd-lace-wig",
    name: "Burmese Curls Premium Selection 13x4 HD Lace Wig",
    category: "wigs",
    price: 4450,
    image: wigBurmeseMain,
    images: [wigBurmeseMain, wigBurmeseSide, wigBurmeseCap],
    video: wigBurmeseVideo,
    description:
      "Luxurious Burmese curls with a full 13x4 HD lace frontal for a voluminous, natural curly look. Pre-bleached knots and pre-plucked hairline for an undetectable, flawless finish. The soft, bouncy curls hold their pattern beautifully and can be restyled with ease.",
    lengths: [
      { length: '10"', price: 4450 },
      { length: '12"', price: 4530 },
      { length: '14"', price: 4950 },
      { length: '16"', price: 5430 },
      { length: '18"', price: 5700 },
      { length: '20"', price: 6000 },
      { length: '22"', price: 6850 },
      { length: '24"', price: 7050 },
      { length: '26"', price: 7450 },
      { length: '28"', price: 7750 },
      { length: '30"', price: 8000 },
    ],
    features: [
      "100% Human Hair",
      "13x4 HD Lace Frontal",
      "Burmese Curl Pattern",
      "Pre-bleached Knots",
      "Pre-plucked Hairline",
      "Adjustable Band",
      "Can Be Dyed & Styled",
    ],
  },
  {
    id: "premium-5x5-hd-lace-bodywave-wig",
    name: "Premium Selection 5x5 HD Lace Bodywave Wig",
    category: "wigs",
    price: 3750,
    image: wigBodywaveMain,
    images: [wigBodywaveMain, wigBodywaveSide],
    video: wigBodywaveVideo,
    description:
      "Gorgeous body wave wig with an invisible 5x5 HD lace closure that melts seamlessly into any skin tone. Features soft, flowing waves with incredible volume and movement. Pre-plucked hairline with baby hairs for a flawless, undetectable finish that looks completely natural.",
    lengths: [
      { length: '10"', price: 3750 },
      { length: '12"', price: 3980 },
      { length: '14"', price: 4250 },
      { length: '16"', price: 4600 },
      { length: '18"', price: 4880 },
      { length: '20"', price: 5720 },
      { length: '22"', price: 5950 },
      { length: '24"', price: 6680 },
      { length: '26"', price: 6850 },
      { length: '28"', price: 7650 },
      { length: '30"', price: 7980 },
    ],
    features: [
      "100% Human Hair",
      "5x5 HD Lace Closure",
      "Body Wave Pattern",
      "Swiss HD Lace",
      "Pre-plucked Hairline",
      "Adjustable Band",
      "Can Be Dyed & Styled",
    ],
  },
  {
    id: "premium-5x5-hd-lace-colour-wig",
    name: "Premium Selection 5x5 HD Lace Colour Wig",
    category: "wigs",
    price: 3750,
    image: wigColourPlum,
    images: [wigColourPlum, wigColourOmbreDark, wigColourOmbreBrown],
    description:
      "Turn heads with our stunning colour collection — available in rich plum, black-to-brown ombre, and dark brown ombre. Each wig features an invisible 5x5 HD lace closure that melts seamlessly into any skin tone. Pre-plucked hairline with baby hairs for a flawless, undetectable finish with a bold, glamorous colour payoff.",
    lengths: [
      { length: '10"', price: 3750 },
      { length: '12"', price: 3980 },
      { length: '14"', price: 4250 },
      { length: '16"', price: 4600 },
      { length: '18"', price: 4880 },
      { length: '20"', price: 5720 },
      { length: '22"', price: 5950 },
      { length: '24"', price: 6680 },
      { length: '26"', price: 6850 },
      { length: '28"', price: 7650 },
      { length: '30"', price: 7980 },
    ],
    features: [
      "100% Human Hair",
      "5x5 HD Lace Closure",
      "Available in 3 Colours",
      "Plum | Black-Brown Ombre | Dark Brown Ombre",
      "Swiss HD Lace",
      "Pre-plucked Hairline",
      "Adjustable Band",
      "Can Be Restyled",
    ],
  },
  {
    id: "premium-5x5-hd-lace-bodywave-wig",
    name: "Premium Selection 5x5 HD Lace Bodywave Wig",
    category: "wigs",
    price: 3750,
    image: wigBodywaveMain,
    images: [wigBodywaveMain, wigBodywaveSide],
    video: wigBodywaveVideo,
    description:
      "Gorgeous body wave wig with an invisible 5x5 HD lace closure that melts seamlessly into any skin tone. Features soft, flowing waves with incredible volume and movement. Pre-plucked hairline with baby hairs for a flawless, undetectable finish that looks completely natural.",
    lengths: [
      { length: '10"', price: 3750 },
      { length: '12"', price: 3980 },
      { length: '14"', price: 4250 },
      { length: '16"', price: 4600 },
      { length: '18"', price: 4880 },
      { length: '20"', price: 5720 },
      { length: '22"', price: 5950 },
      { length: '24"', price: 6680 },
      { length: '26"', price: 6850 },
      { length: '28"', price: 7650 },
      { length: '30"', price: 7980 },
    ],
    features: [
      "100% Human Hair",
      "5x5 HD Lace Closure",
      "Body Wave Pattern",
      "Swiss HD Lace",
      "Pre-plucked Hairline",
      "Adjustable Band",
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
  {
    id: "burmese-curls-13x4-hd-lace-wig",
    name: "Burmese Curls Premium Selection 13x4 HD Lace Wig",
    category: "wigs",
    price: 4450,
    image: wigBurmeseMain,
    images: [wigBurmeseMain, wigBurmeseSide, wigBurmeseCap],
    video: wigBurmeseVideo,
    description:
      "Luxurious Burmese curls with a full 13x4 HD lace frontal for a voluminous, natural curly look. Pre-bleached knots and pre-plucked hairline for an undetectable, flawless finish. The soft, bouncy curls hold their pattern beautifully and can be restyled with ease.",
    lengths: [
      { length: '10"', price: 4450 },
      { length: '12"', price: 4530 },
      { length: '14"', price: 4950 },
      { length: '16"', price: 5430 },
      { length: '18"', price: 5700 },
      { length: '20"', price: 6000 },
      { length: '22"', price: 6850 },
      { length: '24"', price: 7050 },
      { length: '26"', price: 7450 },
      { length: '28"', price: 7750 },
      { length: '30"', price: 8000 },
    ],
    features: [
      "100% Human Hair",
      "13x4 HD Lace Frontal",
      "Burmese Curl Pattern",
      "Pre-bleached Knots",
      "Pre-plucked Hairline",
      "Adjustable Band",
      "Can Be Dyed & Styled",
    ],
  },
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
    id: "kinky-curly-bundles",
    name: "Kinky Curly Raw Hair Bundles",
    category: "bundles",
    price: 850,
    image: bundlesKinkyCurly,
    images: [bundlesKinkyCurly, bundlesDeepWave],
    description:
      "Premium raw kinky curly hair bundles with a tight, defined curl pattern. 100% unprocessed human hair that blends seamlessly with natural African hair textures. Each bundle weighs approximately 100g and can be dyed, bleached, and styled to perfection.",
    lengths: [
      { length: '10"', price: 850 },
      { length: '12"', price: 1050 },
      { length: '14"', price: 1250 },
      { length: '16"', price: 1450 },
      { length: '18"', price: 1700 },
      { length: '20"', price: 1950 },
      { length: '22"', price: 2200 },
      { length: '24"', price: 2500 },
      { length: '26"', price: 2800 },
      { length: '28"', price: 3100 },
    ],
    features: [
      "100% Raw Human Hair",
      "Kinky Curly Pattern",
      "Unprocessed & Virgin",
      "~100g Per Bundle",
      "Can Be Dyed & Bleached",
      "Minimal Shedding",
      "Long Lasting",
    ],
  },
  {
    id: "deep-wave-bundles",
    name: "Deep Wave Raw Hair Bundles",
    category: "bundles",
    price: 800,
    image: bundlesDeepWave,
    images: [bundlesDeepWave, bundlesKinkyCurly],
    description:
      "Luxurious deep wave hair bundles crafted from 100% raw, unprocessed human hair. Features a gorgeous, bouncy wave pattern that holds beautifully even after washing. Perfect for sew-ins, quick weaves, or crochet installations.",
    lengths: [
      { length: '10"', price: 800 },
      { length: '12"', price: 1000 },
      { length: '14"', price: 1200 },
      { length: '16"', price: 1400 },
      { length: '18"', price: 1650 },
      { length: '20"', price: 1900 },
      { length: '22"', price: 2150 },
      { length: '24"', price: 2450 },
      { length: '26"', price: 2750 },
      { length: '28"', price: 3050 },
    ],
    features: [
      "100% Raw Human Hair",
      "Deep Wave Pattern",
      "Unprocessed & Virgin",
      "~100g Per Bundle",
      "Can Be Dyed & Bleached",
      "Tangle-Free",
      "Long Lasting",
    ],
  },
];

export const categories = [
  { id: "all", label: "All Products" },
  { id: "wigs", label: "Wigs" },
  { id: "bundles", label: "Bundles" },
];