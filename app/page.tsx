"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, Check, Truck, RefreshCw, Shield, Sparkles, Heart, ChevronRight } from 'lucide-react';
import { brand, categories, type Category } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Merino Wool Turtleneck",
    category: "fashion",
    price: 128,
    originalPrice: 165,
    rating: 4.8,
    reviewCount: 214,
    image: "https://picsum.photos/seed/0bdb34741a06/800/600",
    badge: "Best Seller",
    description: "Ultra-soft 100% merino wool in a relaxed, modern silhouette.",
  },
  {
    id: 2,
    name: "Linen Wide-Leg Trousers",
    category: "fashion",
    price: 96,
    originalPrice: undefined,
    rating: 4.6,
    reviewCount: 138,
    image: "https://linenhandmadestudio.com/7340-large_default/linen-wide-leg-pants-oakland.jpg",
    badge: "New",
    description: "Breathable linen blend with a flattering wide-leg cut.",
  },
  {
    id: 3,
    name: "Ceramic Pour-Over Set",
    category: "home",
    price: 74,
    originalPrice: 95,
    rating: 4.9,
    reviewCount: 302,
    image: "https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg",
    badge: "Sale",
    description: "Hand-thrown ceramic dripper and carafe for the perfect brew.",
  },
  {
    id: 4,
    name: "Linen Throw Pillow Duo",
    category: "home",
    price: 58,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 89,
    image: "https://hacknerhome.com/cdn/shop/files/Spring_Linen_Duo_Pillow_Cover_Set_Front_Facing_Image_1_1200x1200.png?v=1752696870",
    badge: undefined,
    description: "Stone-washed linen covers in earthy, timeless tones.",
  },
  {
    id: 5,
    name: "Vitamin C Glow Serum",
    category: "beauty",
    price: 52,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 476,
    image: "https://content.farmasius.com/Product/1002167_400.webp",
    badge: "Best Seller",
    description: "15% stabilised vitamin C for radiant, even-toned skin.",
  },
  {
    id: 6,
    name: "Minimalist Leather Watch",
    category: "accessories",
    price: 195,
    originalPrice: 240,
    rating: 4.9,
    reviewCount: 167,
    image: "https://urbandesigner.co/cdn/shop/files/Minimalist_stainless_steel_in_silver_natural_wooden_watch_with_Premium_Leather_band_030.jpg?v=1726166723",
    badge: "Sale",
    description: "Swiss quartz movement in a slim 38mm stainless case.",
  },
  {
    id: 7,
    name: "Structured Canvas Tote",
    category: "accessories",
    price: 68,
    originalPrice: undefined,
    rating: 4.5,
    reviewCount: 93,
    image: "https://picsum.photos/seed/6e084ba340f9/800/600",
    badge: "New",
    description: "Heavy-duty canvas with vegetable-tanned leather handles.",
  },
  {
    id: 8,
    name: "Soy Wax Candle Trio",
    category: "home",
    price: 44,
    originalPrice: undefined,
    rating: 4.7,
    reviewCount: 211,
    image: "http://shopbreezycove.com/cdn/shop/files/nontoxic-clean-burning-beach-candles-beachside-mini-candle-trio.jpg?v=1779059607",
    badge: undefined,
    description: "Hand-poured soy wax in cedarwood, amber, and vetiver.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sophia R.",
    location: "New York, NY",
    avatar: "https://images.squarespace-cdn.com/content/v1/55ecad93e4b097dd68b71341/1552508220117-2ENOH1V1WPO9B15U9QOK/18922208_10211298040064581_7261989867091406680_n.jpg",
    rating: 5,
    text: "The merino turtleneck is genuinely the softest thing I own. Arrived beautifully packaged and fits exactly as described. Lumière has become my go-to for elevated basics.",
    product: "Merino Wool Turtleneck",
  },
  {
    id: 2,
    name: "James T.",
    location: "London, UK",
    avatar: "https://s3.amazonaws.com/arc-authors/cmg/8adde958-cd42-477c-9467-0ee150778a71.png",
    rating: 5,
    text: "Ordered the ceramic pour-over set as a gift and it was a huge hit. The craftsmanship is exceptional and shipping was faster than expected. Will absolutely order again.",
    product: "Ceramic Pour-Over Set",
  },
  {
    id: 3,
    name: "Mia K.",
    location: "Sydney, AU",
    avatar: "https://m.media-amazon.com/images/M/MV5BZjA0MDgyYmItNzkzMC00OTM2LThlYzktMWMxZWU3ZGNkNDI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: 5,
    text: "The vitamin C serum has transformed my morning routine. My skin looks noticeably brighter after just three weeks. The packaging is minimal and gorgeous too.",
    product: "Vitamin C Glow Serum",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Shipping Over $75",
    description:
      "Complimentary tracked shipping on all orders above $75, delivered in 3 to 5 business days.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description:
      "Not in love? Return any item within 30 days for a full refund, no questions asked.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description:
      "Every product is sourced directly from verified makers and artisan studios worldwide.",
  },
  {
    icon: Heart,
    title: "Sustainably Curated",
    description:
      "We partner only with brands that meet our strict ethical and environmental standards.",
  },
];

const collections = [
  {
    id: "summer-edit",
    title: "The Summer Edit",
    subtitle: "Effortless warm-weather dressing",
    image: "https://caroletarr.com/_assets/v11/b2837007eb23f376a7735fcc1667a7bab970ee45.png",
    count: 42,
    accent: "bg-amber-50",
    textAccent: "text-amber-700",
  },
  {
    id: "home-sanctuary",
    title: "Home Sanctuary",
    subtitle: "Objects that make a house a home",
    image: "https://picsum.photos/seed/9ce01d50f119/800/600",
    count: 28,
    accent: "bg-stone-50",
    textAccent: "text-stone-700",
  },
  {
    id: "clean-beauty",
    title: "Clean Beauty",
    subtitle: "Skincare rooted in nature",
    image: "https://hips.hearstapps.com/hmg-prod/images/opr010123wellcleanbeauty-001-1671225725.jpg?crop=0.631xw:0.631xh;0.213xw,0.132xh&resize=768:*",
    count: 19,
    accent: "bg-rose-50",
    textAccent: "text-rose-700",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500">
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" },
  hover: { y: -4, boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 16px 32px -8px rgba(0,0,0,0.14)" },
};

const imageScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};

function ProductCard({ product }: { product: typeof products[0] }) {
  const [wished, setWished] = useState(false);
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 cursor-pointer"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px -4px rgba(0,0,0,0.08)" }}
    >
      <motion.div variants={cardHover} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <motion.img
            variants={imageScale}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                product.badge === "Sale"
                  ? "bg-rose-500 text-white"
                  : product.badge === "New"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-white"
              }`}
            >
              {product.badge}
            </span>
          )}
          {/* Wishlist */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setWished((w) => !w)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                wished ? "fill-rose-500 text-rose-500" : "text-slate-400"
              }`}
            />
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <p className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-slate-900 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-1">
            {product.description}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-slate-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {discount && (
                <span className="text-xs font-semibold text-rose-500">
                  -{discount}%
                </span>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 pt-16">
        {/* Subtle mesh glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-indigo-100/60 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-50/80 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                Summer 2025 Collection
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 text-balance leading-[1.05]"
            >
              Shop with
              <br />
              <span className="text-indigo-600">intention.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-slate-600 leading-relaxed max-w-md text-pretty"
            >
              Lumière curates premium fashion, home goods, and beauty essentials
              from independent makers who care about craft as much as you do.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-[0_2px_8px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#collections"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#collections")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl border border-black/8 shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                View Collections
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {["Free shipping over $75", "30-day returns", "4.9 ★ rated"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="flex items-center gap-1.5 text-xs text-slate-500 font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-indigo-500" />
                    {badge}
                  </span>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Right image grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative grid grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-4 pt-8">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.12)] border border-black/5">
                <img
                  src="https://picsum.photos/seed/0bdb34741a06/800/600"
                  alt="Merino Wool Turtleneck"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.12)] border border-black/5">
                <img
                  src="https://m.media-amazon.com/images/I/7159+ELcEOL._AC_UF894,1000_QL80_.jpg"
                  alt="Ceramic Pour-Over Set"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden aspect-square shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.12)] border border-black/5">
                <img
                  src="https://content.farmasius.com/Product/1002167_400.webp"
                  alt="Vitamin C Glow Serum"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.12)] border border-black/5">
                <img
                  src="https://urbandesigner.co/cdn/shop/files/Minimalist_stainless_steel_in_silver_natural_wooden_watch_with_Premium_Leather_band_030.jpg?v=1726166723"
                  alt="Minimalist Leather Watch"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_6px_rgba(0,0,0,0.04),0_16px_32px_-8px_rgba(0,0,0,0.14)] border border-black/5 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">4.9 / 5.0</p>
                <p className="text-xs text-slate-500">12,400+ reviews</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-black/5 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {valueProps.map((vp) => {
            const Icon = vp.icon;
            return (
              <motion.div
                key={vp.title}
                variants={fadeInUp}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">
                    {vp.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {vp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <section id="products" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2"
              >
                Curated for you
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 text-balance"
              >
                Featured Products
              </motion.h2>
            </div>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat: Category) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    activeCategory === cat.id
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-black/8 hover:border-indigo-200 hover:text-indigo-700"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(filtered ?? []).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-12 text-center"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl border border-black/8 shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              View All Products
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── Collections ──────────────────────────────────────────────────── */}
      <section id="collections" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2"
            >
              Explore
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
            >
              Shop by Collection
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {collections.map((col, i) => (
              <motion.div
                key={col.id}
                variants={i === 1 ? scaleIn : i === 0 ? slideInLeft : slideInRight}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                  i === 1 ? "md:row-span-1 md:scale-[1.02]" : ""
                }`}
                style={{
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.12)",
                }}
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${col.accent} ${col.textAccent}`}
                    >
                      {col.count} pieces
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {col.title}
                    </h3>
                    <p className="text-sm text-white/80 mb-4">{col.subtitle}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5 transition-all duration-200">
                      Shop Collection
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About / Brand Story ──────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <img
                src="https://s3-media0.fl.yelpcdn.com/bphoto/UfEQwIDlNzPg9-HPVJL8bQ/348s.jpg"
                alt="Lumière artisan studio"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              className="absolute -right-6 -bottom-6 bg-indigo-600 rounded-2xl p-5 shadow-[0_8px_32px_rgba(99,102,241,0.4)] border border-indigo-500/50"
            >
              <p className="text-3xl font-bold text-white">200+</p>
              <p className="text-sm text-indigo-200 mt-0.5">
                Independent makers
              </p>
            </motion.div>
          </motion.div>

          {/* Copy side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-indigo-400 uppercase tracking-widest"
            >
              Our story
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold tracking-tight text-balance"
            >
              Craft over convenience. Always.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 leading-relaxed text-pretty"
            >
              Lumière was founded on a simple belief: that the things we bring
              into our lives should be made with care, sourced with integrity,
              and built to last. We travel the world to find independent makers
              whose values align with ours.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 leading-relaxed text-pretty"
            >
              Every product in our catalogue has been personally reviewed by our
              team. We ask hard questions about materials, labour practices, and
              environmental impact before a single item goes live on the site.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col gap-3 pt-2">
              {[
                "Certified B-Corp partners only",
                "Carbon-neutral shipping on every order",
                "1% of revenue donated to reforestation",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-indigo-400" />
                  </div>
                  <span className="text-sm text-slate-300">{point}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeInUp}>
              <motion.a
                href="#products"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-[0_2px_8px_rgba(99,102,241,0.4)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeInUp}
              className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2"
            >
              Social proof
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
            >
              Loved by 12,000+ shoppers
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-2xl p-6 border border-black/5 flex flex-col gap-4"
                style={{
                  boxShadow:
                    "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)",
                }}
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border border-black/5 shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                  <span className="ml-auto text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">
                    {t.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section id="newsletter" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-700 overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
          >
            {/* Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-400/30 blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-800/40 blur-[80px]" />
            </div>

            <div className="relative">
              <motion.p
                variants={fadeInUp}
                className="text-xs font-semibold text-indigo-200 uppercase tracking-widest mb-3"
              >
                Stay in the loop
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 text-balance"
              >
                Get 10% off your first order
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-indigo-200 mb-8 max-w-md mx-auto text-pretty"
              >
                Join our community of 40,000 subscribers for early access to new
                arrivals, exclusive offers, and style inspiration.
              </motion.p>

              <motion.div variants={fadeInUp}>
                {subscribed ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white font-semibold"
                  >
                    <Check className="w-5 h-5" />
                    You&apos;re in! Check your inbox.
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-4 py-3 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all duration-200 text-sm"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white text-sm shrink-0"
                    >
                      Claim 10% Off
                    </motion.button>
                  </form>
                )}
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-xs text-indigo-300 mt-4"
              >
                No spam, ever. Unsubscribe at any time.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}