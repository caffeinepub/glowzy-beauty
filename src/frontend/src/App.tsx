import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Menu, ShoppingBag, Sparkles, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Radiant Glow Face Serum",
    category: "Skincare",
    description:
      "A luxurious dropper serum packed with vitamin C and hyaluronic acid for a luminous, hydrated complexion.",
    price: "$367",
    image: "/assets/uploads/IMG_20260319_142602-1.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Glowzy Complete Collection",
    category: "Bundle",
    description:
      "The ultimate Glowzy experience — our full collection beautifully curated for the ultimate glow transformation.",
    price: "$474",
    image: "/assets/uploads/IMG_20260319_142124-2.jpg",
    badge: "New",
  },
  {
    id: 3,
    name: "Golden Glow Serum Duo",
    category: "Skincare",
    description:
      "Our golden serum paired with a delicate rose-infused lotion for a perfectly balanced, radiant skin ritual.",
    price: "$249",
    image: "/assets/uploads/IMG_20260319_142201-3.jpg",
    badge: null,
  },
  {
    id: 4,
    name: "Shine Glow Lip Oil",
    category: "Lips",
    description:
      "A nourishing coral-pink lip oil that gives an irresistible glossy shine while deeply conditioning your lips.",
    price: "$189",
    image: "/assets/uploads/IMG_20260319_142241-4.jpg",
    badge: "Fan Fave",
  },
  {
    id: 5,
    name: "Glow Duo Set (Serum + Cream)",
    category: "Skincare",
    description:
      "The power duo your skin craves — a brightening serum and a rich face cream working in perfect harmony.",
    price: "$177",
    image: "/assets/uploads/IMG_20260319_142022-5.jpg",
    badge: null,
  },
  {
    id: 6,
    name: "Radiant Face Cream",
    category: "Skincare",
    description:
      "Rich in botanicals and peptides, this cream melts into skin for a plump, dewy, camera-ready finish.",
    price: "$350",
    image: "/assets/uploads/IMG_20260319_142046-6.jpg",
    badge: null,
  },
  {
    id: 7,
    name: "Perfect Glow Foundation",
    category: "Makeup",
    description:
      "Buildable medium-to-full coverage foundation available in two warm shades that melt into every skin tone beautifully.",
    price: "$133",
    image: "/assets/uploads/IMG_20260319_142542-7.jpg",
    badge: "New",
  },
];

const categoryColors: Record<string, string> = {
  Skincare: "bg-secondary text-secondary-foreground",
  Lips: "bg-primary/10 text-primary",
  Makeup: "bg-accent/20 text-accent-foreground",
  Bundle: "bg-primary/15 text-primary",
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const navLinks = [
  { label: "Home", href: "#home", ocid: "nav.mobile.home.link" },
  { label: "Products", href: "#products", ocid: "nav.mobile.products.link" },
  { label: "About", href: "#about", ocid: "nav.mobile.about.link" },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const handleAddToCart = (id: number) => {
    setCartCount((c) => c + 1);
    setAddedIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 1500);
  };

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    window.location.hash = href.replace("#", "");
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ── Navigation */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a
              href="#home"
              className="flex items-center gap-2"
              data-ocid="nav.link"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-serif text-2xl font-bold tracking-wide gold-text">
                Glowzy
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                data-ocid="nav.home.link"
              >
                Home
              </a>
              <a
                href="#products"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                data-ocid="nav.products.link"
              >
                Products
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                data-ocid="nav.about.link"
              >
                About
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                data-ocid="nav.cart.button"
              >
                <ShoppingBag className="w-5 h-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                data-ocid="nav.mobile_menu.button"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-border bg-background"
            >
              <nav className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleMobileNav(link.href)}
                    className="py-3 text-sm font-medium text-left hover:text-primary transition-colors"
                    data-ocid={link.ocid}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero */}
      <section
        id="home"
        className="relative overflow-hidden hero-gradient pb-20 md:pb-0"
      >
        <div
          className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.15 20), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.14 65), transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-sm font-medium text-primary mb-6 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Clean Beauty · Cruelty Free</span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] mb-4">
                <span className="gold-text">Glowzy</span>
              </h1>
              <p className="font-serif text-2xl md:text-3xl text-foreground/85 italic mb-4">
                Your Glow, Your Story
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                Discover luxurious skincare and beauty essentials crafted for
                the modern woman. Radiate confidence with every drop.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow rounded-full px-8 font-semibold tracking-wide"
                  asChild
                  data-ocid="hero.shop_now.button"
                >
                  <a href="#products">Shop Now</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-primary/30 text-primary hover:bg-primary/5"
                  asChild
                  data-ocid="hero.learn_more.button"
                >
                  <a href="#about">Our Story</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="relative hidden md:block"
            >
              <div className="relative h-[480px]">
                <img
                  src="/assets/uploads/IMG_20260319_142124-2.jpg"
                  alt="Glowzy Complete Collection"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-glow-lg"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-glow flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src="/assets/uploads/IMG_20260319_142241-4.jpg"
                      alt="Lip Oil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Latest Drop</p>
                    <p className="text-sm font-semibold text-foreground">
                      Shine Glow Lip Oil
                    </p>
                    <p className="text-sm font-bold text-primary">$189</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar */}
      <section className="bg-primary/5 border-y border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-muted-foreground font-medium">
            {[
              "✨ Dermatologist Tested",
              "🌿 100% Natural Ingredients",
              "🐰 Cruelty Free",
              "♻️ Eco Packaging",
            ].map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products */}
      <section id="products" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              Our Collection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Curated for Your <span className="italic">Glow</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Each product is lovingly formulated to enhance your natural
              radiance — because you deserve to glow every single day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                data-ocid={`products.item.${i + 1}`}
              >
                <Card className="overflow-hidden border-border bg-card card-hover group h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-glow">
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs font-medium rounded-full ${categoryColors[product.category] ?? ""}`}
                      >
                        {product.category}
                      </Badge>
                      <span className="font-serif text-lg font-bold text-primary">
                        {product.price}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                      {product.description}
                    </p>
                    <Button
                      className="w-full min-h-[44px] rounded-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] font-semibold transition-all"
                      onClick={() => handleAddToCart(product.id)}
                      data-ocid={`products.add_to_cart.button.${i + 1}`}
                    >
                      {addedIds.has(product.id) ? (
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> Added!
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" /> Add to Cart
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About */}
      <section id="about" className="py-20 md:py-28 glow-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative"
            >
              <div
                className="absolute -inset-4 rounded-3xl opacity-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 50%, oklch(0.75 0.12 20), transparent 70%)",
                }}
              />
              <div className="relative grid grid-cols-2 gap-4">
                <img
                  src="/assets/uploads/IMG_20260319_142046-6.jpg"
                  alt="Radiant Face Cream"
                  className="rounded-2xl w-full aspect-square object-cover shadow-glow-lg"
                />
                <img
                  src="/assets/uploads/IMG_20260319_142201-3.jpg"
                  alt="Golden Glow Serum"
                  className="rounded-2xl w-full aspect-square object-cover shadow-glow-lg mt-10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
                Our Story
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Born from a <span className="italic">Passion</span> for Beauty
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Glowzy was born from a simple belief: every woman deserves to
                feel radiant, confident, and beautifully herself. We started
                with a small collection of clean, thoughtfully formulated
                skincare products — and grew into the brand we always dreamed of
                creating.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Each formula is crafted with love, using only the finest natural
                ingredients sourced from around the world. From our golden
                serums to our iconic lip oils, every product is designed to
                enhance what you already have and make your skin-care ritual
                feel like a moment of luxury.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Because glow isn't just about your skin — it's a feeling. And
                we're here to help you find yours.
              </p>
              <div className="flex gap-8">
                {[
                  { num: "7+", label: "Products" },
                  { num: "5K+", label: "Happy Customers" },
                  { num: "100%", label: "Natural" },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <p className="font-serif text-3xl font-bold gold-text">
                      {num}
                    </p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <Sparkles className="w-5 h-5 opacity-70" />
                <span
                  className="font-serif text-2xl font-bold tracking-wide"
                  style={{ color: "oklch(0.82 0.14 65)" }}
                >
                  Glowzy
                </span>
              </div>
              <p className="text-sm opacity-60 italic font-serif">
                Your Glow, Your Story
              </p>
            </div>
            <nav className="flex gap-6 text-sm opacity-70">
              <a href="#home" className="hover:opacity-100 transition-opacity">
                Home
              </a>
              <a
                href="#products"
                className="hover:opacity-100 transition-opacity"
              >
                Products
              </a>
              <a href="#about" className="hover:opacity-100 transition-opacity">
                About
              </a>
            </nav>
            <div className="text-center md:text-right">
              <p className="text-xs opacity-50 mb-1">
                &copy; {new Date().getFullYear()} Glowzy. All rights reserved.
              </p>
              <p className="text-xs opacity-40">
                Built with ♥ using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  className="underline hover:opacity-70 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
